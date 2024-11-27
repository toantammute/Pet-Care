import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface Service {
    service_id: string,
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
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(service.price);
    return (
        <View style={styles.card}>
            <View style={styles.titleContainer}>
                <Text style={styles.name}>{service.name}</Text>
                <Text style={styles.price}>{formattedPrice}</Text>
            </View>

            <Text style={styles.description}>{service.description}</Text>

        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        elevation: 2, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        gap:10,
        // backgroundColor: '#f9f9f9',
    },
    titleContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginVertical: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A55A2',
    },

})
export default ServiceCard