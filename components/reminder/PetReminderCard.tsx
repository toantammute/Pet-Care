import ReminderCard from "./ReminderCard";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PetReminderCard = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.petName}>Bê Đê</Text>
            <View style={styles.reminderContainer}>
                <ReminderCard />
                <ReminderCard />
            </View>

        </View>

    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        gap: 4,
        paddingLeft: 6,
        paddingRight: 6,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        paddingBottom:10,
        marginTop:10,
    },
    petName:{
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