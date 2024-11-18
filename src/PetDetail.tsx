import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React from 'react'
import PetInfoCard from '../components/pet/PetInfoCard'
import usePets from '../hooks/usePets'
import { PetCardProps } from '../components/pet/PetCard';
import { useRoute } from '@react-navigation/native';
import usePetSchedule from '../hooks/usePetSchedule';
import PetPlanCard from '../components/pet/PetPlanCard';
import Icon from 'react-native-vector-icons/Feather'


const PetDetail = () => {
    const route = useRoute();
    const { petid } = route.params as { petid: string };
    const { petidSchedule } = route.params as { petidSchedule: string };
    const { isLoading, petDetails, getPetDetails } = usePets();
    const { getPetScheduleOverview, scheduleLoading, petScheduleOverview } = usePetSchedule();

    const renderItem = ({ item }: { item: any }) => (
        <PetPlanCard schedule={item} />
    );

    console.log(petid);
    React.useEffect(() => {
        getPetDetails(petid);
        getPetScheduleOverview(petid,5,1);
    }, [petid]);

    if (isLoading || !petDetails || scheduleLoading || !petScheduleOverview) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            {/* <ScrollView> */}
                <PetInfoCard pet={petDetails} />
                <View style={styles.plansCard}>
                    <View style={styles.plansHeader}>
                        <Text style={styles.plansTitle}>Plans With Sky</Text>
                        <TouchableOpacity style={styles.addButton}>
                            <Icon name="plus" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={petScheduleOverview}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                </View>

            {/* </ScrollView> */}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        padding: 10,
        gap: 10,
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
});
export default PetDetail