import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import PetInfoCard from '../components/pet/PetInfoCard'
import usePets from '../hooks/usePets'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import PetPlanCard from '../components/pet/PetPlanCard';
import VaccinationCard from '../components/vaccination/VaccinationCard';
import Icon from 'react-native-vector-icons/Feather'
import useLog from '../hooks/useLog';
import useVaccination from '../hooks/useVaccination';
import SplashScreen from './SplashScreen';

interface PetDetails {
    petid: string;
    username: string;
    name: string;
    type: string;
    breed: string;
    age: string;
    birth_date: string;
    weight: string;
    data_image: string;
    original_name: string;
    microchip_number: string;
}


const PetDetail = () => {
    const navigation = useNavigation<any>();

    const route = useRoute();
    const { petid } = route.params as { petid: string };
    // const { petidSchedule } = route.params as { petidSchedule: string };
    const { isLoading, petDetails, getPetDetails } = usePets();
    const { getLogsbyPet, logLoading, logs, deletePetLog } = useLog();
    const { getVaccinationsByPet, vaccinationLoading, vaccinations } = useVaccination();
    

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        await getPetDetails(petid); // Fetch pets data
        await getLogsbyPet(petid, 3, 1);
        await getVaccinationsByPet(petid);
        setRefreshing(false);
    }

    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused, fetching pet detail');
            getPetDetails(petid);
            getLogsbyPet(petid, 3, 1);
            getVaccinationsByPet(petid);
        }, [])
    );

    const renderItem = ({ item }: { item: any }) => (
        <PetPlanCard log={item} deletePetLog={deletePetLog} refreshLogs={onRefresh} />
    );
    const renderVaccinationItem = ({ item }: { item: any }) => (
        <VaccinationCard vaccination={item} />
    );

    if (isLoading || !petDetails  || logLoading ||vaccinationLoading) {
        return <SplashScreen />
    }
    const pet = petDetails as PetDetails;

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh} />
            }>

            <PetInfoCard pet={petDetails} />

            <View style={styles.plansCard}>
                <View style={styles.plansHeader}>
                    <Text style={styles.plansTitle}>{pet.name} 's daily log</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('CreateLogsScreen', { petid: pet.petid })}>
                        <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
 
                <FlatList
                    scrollEnabled={false}
                    data={logs}
                    keyExtractor={(item) => item.log_id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                    ListEmptyComponent={<Text style={{ padding: 10, textAlign: 'center', fontSize: 16 }}>No log dairy available</Text>} // Handle empty list case
                />

                <TouchableOpacity style={styles.footerContainer}
                onPress={() => navigation.navigate('LogsScreen', { petid: pet.petid })}>
                    <Text style={{ textAlign: 'center' }}>See all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.plansCard}>
                <View style={styles.plansHeader}>
                    <Text style={styles.plansTitle}>{pet.name} 's vaccination</Text>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => navigation.navigate('CreateVaccinationScreen', { petid: pet.petid })}>
                        <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                {/* <VaccinationCard vaccination={vaccinations[0]} /> */}
 
                <FlatList
                    scrollEnabled={false}
                    data={vaccinations}
                    keyExtractor={(item) => item.vaccination_id.toString()}
                    renderItem={renderVaccinationItem}
                    ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                    ListEmptyComponent={<Text style={{ padding: 10, textAlign: 'center', fontSize: 16 }}>No vaccination available</Text>} // Handle empty list case
                />

                <TouchableOpacity style={styles.footerContainer}
                onPress={() => navigation.navigate('LogsScreen', { petid: pet.petid })}>
                    <Text style={{ textAlign: 'center' }}>See all</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        padding: 10,
        gap: 10,
        marginBottom: 10,

    },
    plansCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 14,
    },
    plansHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    plansTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
    },
    addButton: {
        padding: 8,
    },
    footerContainer: {
        borderTopColor: '#E5E7EB',
        borderTopWidth: 1,
        paddingTop: 6,
        marginTop: 6,
    },
});
export default PetDetail

