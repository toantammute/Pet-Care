import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import useService from '../hooks/useService'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TypeService from '../components/service/TypeService';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Service {
  service_id: string,
  type_id: string,
  name: string,
  price: number,
  duration: number,
  description: string,
  isavailable: boolean
}

const ServiceScreen = () => {
  const navigation = useNavigation<any>();
  const { services, serviceByType, serviceLoading, getServices } = useService();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await getServices();
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      getServices();
    }, [])
  )

  const renderItem = ({ item }: { item: any }) => (
    <TypeService serviceType={item} />
  )
  return (
    <View style={styles.container}>
            {serviceLoading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    data={serviceByType}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListEmptyComponent={<Text style={styles.emptyText}>No services available.</Text>}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    contentContainerStyle={styles.listContent}
                />
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddService')}>
                <Ionicons name="add" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
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
addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    padding: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
},
})
export default ServiceScreen