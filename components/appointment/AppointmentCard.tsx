import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Appointment {
    id: string,
    service_name: string,
    pet_name: string,
    notes: string,
    doctor_name: string,
    date: string,
    status: string,
}
interface AppointmentCardProps {
    appointment: Appointment;
}

// const AppointmentCard = () => {
    const AppointmentCard:React.FC<AppointmentCardProps> = ({appointment}) => {


    // Convert the date_time string to a Date object
    const date = new Date(appointment.date);
    console.log(date.toLocaleString());


    // Format the date and time separately
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    // Determine status color
    let statusColor;
    switch (appointment.status) {
        case 'pending':
            statusColor = '#DAA520';
            break;
        case 'cancel':
            statusColor = 'red';
            break;
        case 'success':
            statusColor = 'green';
            break;
        default:
            statusColor = 'black'; // Default color
            break;
    }
    
    return (
        <View style={styles.card}>
        

            <Text style={styles.title}>{appointment.service_name}</Text>
            <View style={styles.rowContainer}>
                <Text style={styles.subtitle}>Pet: {appointment.pet_name}</Text>
                <Text style={styles.doctor}>Doctor: {appointment.doctor_name}</Text>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.timeText}>Time: {formattedTime}</Text>
                <Text style={styles.status}>
                    Status: <Text style={{ color: statusColor }}>{appointment.status}</Text>
                </Text>
            </View>

            {appointment.notes && (
                <Text style={styles.notes}>{appointment.notes}</Text>
            )}


        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginBottom:12, // Added margin for spacing between cards
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
    },
    notes: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 5, // Added margin for better spacing
    },
    doctor: {
        fontSize: 14,
    },
    timeText: {
        fontSize: 14,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
})
export default AppointmentCard;
