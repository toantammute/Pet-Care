import ReminderCard from "./ReminderCard";
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export interface PetReminder {
    pet_id: string,
    pet_name: string,
    schedules: [],
}

export interface PetReminderCardProps {
    pet_schedule: PetReminder;
    updateActivePetSchedule: (schedule_id: any) => Promise<void>;
}

const PetReminderCard: React.FC<PetReminderCardProps> = ({ pet_schedule }) => {

    const renderItem = ({ item }: { item: any }) => (
        <ReminderCard schedule={item} />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.petName}>{pet_schedule.pet_name}</Text>
            <FlatList
                scrollEnabled={false}
                data={pet_schedule.schedules}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{height:8}} />}
                ListEmptyComponent={<Text>No reminder.</Text>} />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 4,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom: 10,
        marginTop: 10,
    },
    petName: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 20,
        fontWeight: '700',
        color: '#000000',
    },
    reminderContainer: {
        flexDirection: 'column',
        gap: 12,
        padding: 5,
    }

});
export default PetReminderCard;