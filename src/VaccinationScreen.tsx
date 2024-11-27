import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import useVaccination from "../hooks/useVaccination";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';


const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};


const VaccinationScreen: React.FC = () => {
    const navigation = useNavigation<any>();

    const route = useRoute();
    const { petid } = route.params as { petid: string };

    const { getVaccinationsByPet, vaccinations } = useVaccination();
    //   const { getLogsbyPet, logLoading, logs, deletePetLog, updatePetLog } = use();
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused, fetching logs');
            getVaccinationsByPet(petid, null, null);
        }, [])
    );
    console.log("1", vaccinations);

    const [items, setItems] = React.useState<Record<string, any>>({});

    const loadItems = (day: any) => {
        if (!day) return; // Ensure day is defined

        setTimeout(() => {
            const newItems: Record<string, any[]> = {};

            for (let i = -25; i < 10; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                const localeStrTime = new Date(strTime).toLocaleDateString();

                if (!newItems[strTime]) {
                    newItems[strTime] = [];
                }

                vaccinations.forEach(vaccination => {
                    // const logDate = new Date(log.date_time).toISOString().split('T')[0];
                    const vaccinationDate = new Date(vaccination.date_administered).toLocaleDateString();
                    // const logTime = new Date(log.date_time).toLocaleTimeString();
                    if (vaccinationDate === localeStrTime) {
                        newItems[strTime].push({
                            vaccination_id: vaccination.vaccination_id,
                            pet_id: vaccination.pet_id,
                            vaccine_name: vaccination.vaccine_name,
                            next_due_date: new Date(vaccination.next_due_date).toLocaleDateString(),
                        });
                    }
                });

            }

            setItems(newItems);
        }, 1000);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await getVaccinationsByPet(petid, null, null);
        await loadItems(new Date());
        setRefreshing(false);
    };


    const handleDelete = async (logId: number) => {
        // await deletePetLog(logId);
        await getVaccinationsByPet(petid, null, null); // Reload the logs after deletion
    };

    const renderItem = (items: any) => {
        const renderRightActions = () => (
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(items.id)}
            >
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
        );
        // const handleEdit = () => {
        //     navigation.navigate('CreateVaccinationScreen', {
        //         petid: items.pet_id,
        //         log_id: items.log_id,
        //         title: items.title,
        //         notes: items.notes,
        //         date_time: items.date_time,
        //     });
        // };
        const handlePress = () => {
            navigation.navigate('VaccinationDetailScreen', { vaccination_id: items.vaccination_id });
        };

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <TouchableOpacity onPress={handlePress} style={{ marginRight: 10, marginTop: 17 }}>
                    <Card style={{ backgroundColor: '#E8F7FE', borderRadius: 10, }}>
                        <Card.Content>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.vaccine_name}</Text>
                                {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.time}</Text> */}
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 16 }}>
                                {items.next_due_date !== "1/3/0001" ? `Next due date: ${items.next_due_date}` : "No next due date"}
                            </Text>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            </Swipeable>

        )
    };

    const today = new Date().toLocaleDateString('en-CA'); // Use toLocaleDateString with 'en-CA' for YYYY-MM-DD format
    return (
        <View style={{ flex: 1 }}>
            <Agenda
                items={items}
                loadItemsForMonth={loadItems}
                selected={today}
                renderItem={renderItem}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreateVaccinationScreen', { petid })}>
                <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ea', // Change to the color you want
        padding: 16,
        borderRadius: 30,
        elevation: 8, // Add shadow for Android
    },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 80,
        height: '90%',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
export default VaccinationScreen;