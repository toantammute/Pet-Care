import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ServiceCard from './ServiceCard'

interface ServiceType {
    id: string,
    type_name: string,
    services: []

}
interface ServiceTypeCardProps {
    serviceType: ServiceType;
}

const TypeService: React.FC<ServiceTypeCardProps> = ({ serviceType }) => {
    const renderItem = ({ item }: { item: any }) => (
        <ServiceCard service={item} />
    )
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{serviceType.type_name}</Text>
            <FlatList
                scrollEnabled={false}
                data={serviceType.services}
                keyExtractor={(item) => item.service_id} // Assuming service_id is unique
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={<Text style={styles.emptyText}>No services available.</Text>}
                contentContainerStyle={styles.listContent}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginVertical: 8,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    separator: {
        height: 8,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },

})
export default TypeService