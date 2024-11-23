import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Service {
    sêrvice_id: string,
    type_id: string,
    name: string,
    price: number,
    duration: number,
    description: string,
    isavailable: boolean
}

interface ServiceCardProps {
    service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.name}>{service.name}</Text>
                <Text style={styles.price}>{service.price} VNĐ</Text>
            </View>

            <Text style={styles.description}>{service.description}</Text>

        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        // margin: 8,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    titleContainer:{
        width: '100%',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        gap: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007BFF',
    },

})
export default ServiceCard