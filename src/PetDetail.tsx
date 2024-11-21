import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import PetInfoCard from '../components/pet/PetInfoCard'
import usePets from '../hooks/usePets'
import { PetCardProps } from '../components/pet/PetCard';
import { useRoute } from '@react-navigation/native';
import usePetSchedule from '../hooks/usePetSchedule';
import PetPlanCard from '../components/pet/PetPlanCard';
import Icon from 'react-native-vector-icons/Feather'
import useLog from '../hooks/useLog';
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
    const route = useRoute();
    const { petid } = route.params as { petid: string };
    const { petidSchedule } = route.params as { petidSchedule: string };
    const { isLoading, petDetails, getPetDetails } = usePets();
    const { getPetScheduleOverview, scheduleLoading, petScheduleOverview } = usePetSchedule();
    const { getLogsbyPet, logLoading, logs } = useLog();


    // const renderItem = ({ item }: { item: any }) => (
    //     <PetPlanCard schedule={item} />
    // );
    const renderItem = ({ item }: { item: any }) => (
        <PetPlanCard log={item} />
    );

    

    console.log(petid);
    React.useEffect(() => {
        getPetDetails(petid);
        getPetScheduleOverview(petid, 3, 1);
        getLogsbyPet(petid, 3, 1);
    }, [petid]);

    if (isLoading || !petDetails || scheduleLoading || logLoading ) {
        return <SplashScreen/>
    }
    const pet = petDetails as PetDetails;

    return (
        <ScrollView style={styles.container}>

            <PetInfoCard pet={petDetails} />
            {/* <View style={styles.plansCard}>
                <View style={styles.plansHeader}>
                    <Text style={styles.plansTitle}>Plans With {pet.name}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                <View>
                <FlatList
                    scrollEnabled={false}
                    data={petScheduleOverview}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={{padding:10, textAlign:'center', fontSize:16}}>No log dairy available</Text>} // Handle empty list case
                />
                </View>
                <View style={styles.footerContainer}>
                    <Text style={{textAlign:'center'}}>See all</Text>
                </View>
            </View> */}
            <View style={styles.plansCard}>
                <View style={styles.plansHeader}>
                    <Text style={styles.plansTitle}>{pet.name} 's daily log</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Icon name="plus" size={20} color="#000" />
                    </TouchableOpacity>
                </View>
                <View>
                <FlatList
                    scrollEnabled={false}
                    data={logs}
                    keyExtractor={(item) => item.log_id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{height:5}} />}
                    ListEmptyComponent={<Text style={{padding:10, textAlign:'center', fontSize:16}}>No log dairy available</Text>} // Handle empty list case
                />
                </View>
                <View style={styles.footerContainer}>
                    <Text style={{textAlign:'center'}}>See all</Text>
                </View>
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
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    plansHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignContent: 'center',
    },
});
export default PetDetail

