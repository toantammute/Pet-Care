import ReminderCard from "./ReminderCard";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import usePets from "../../hooks/usePets";

export interface PetReminder {
    pet_id: string,
    pet_name: string,
    schedules: [],
}
interface PetDetails {
    petid: string,
    username: string,
    name: string,
    breed: string,
    type: string,
    data_image: string,
    age: string,
    weight: string
    birth_date: string,
    original_name: string,
    microchip_number: string,
}

export interface PetReminderCardProps {
    pet_schedule: PetReminder;
    updateActivePetSchedule: (schedule_id: any, is_active: any) => Promise<void>;
    deletePetSchedule: (schedule_id: any) => Promise<void>;
    refreshLogs: () => Promise<void>;
    // getPetDetails: (petid: string) => Promise<void>;
    // petDetails: PetDetails;
}

const PetReminderCard: React.FC<PetReminderCardProps> = ({ pet_schedule, updateActivePetSchedule, deletePetSchedule, refreshLogs }) => {
    console.log(pet_schedule.pet_id);
    const { getPetDetails, petDetails } = usePets();

    const renderItem = ({ item }: { item: any }) => (
        <ReminderCard schedule={item}
            updateActivePetSchedule={updateActivePetSchedule}
            deletePetSchedule={deletePetSchedule}
            refreshLogs={refreshLogs} />
    );
    useEffect(() => {
        getPetDetails(pet_schedule.pet_id);
        console.log("Image", pet_schedule.pet_id, petDetails?.data_image);
    }, []);

    const base64Image = petDetails?.data_image ? `data:image/jpeg;base64,${petDetails.data_image}` : null;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {base64Image && <Image source={{ uri: base64Image }} style={styles.image} />}
                <Text style={styles.petName}>{pet_schedule.pet_name}</Text>
            </View>
            <View style={styles.containCard}>
                <FlatList
                    scrollEnabled={false}
                    data={pet_schedule.schedules}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    ListEmptyComponent={<Text>No reminder.</Text>} />
            </View>


        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 10,
        // paddingLeft: 6,
        // paddingRight: 6,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom: 10,
        marginTop: 10,
        marginBottom: 6
    },
    containCard:{
        paddingLeft: 10,
        paddingRight:10,

    },
    card: {
        flexDirection: 'row', // Align items in a row
        padding: 8,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#E8F7FE',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    image: {
        width: 40, // Set the width of the image
        height: 40, // Set the height of the image
        borderRadius: 5, // Make it circular if you prefer
        marginRight: 10, // Space between image and text
    },
    petName: {
        paddingLeft: 8,
        paddingTop: 5,
        fontSize: 22,
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