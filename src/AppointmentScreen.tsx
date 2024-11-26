import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import useAppointment from '../hooks/useAppointment';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import AppointmentCard from '../components/appointment/AppointmentCard';
import App from '../App';

interface Appointment {
  id: string,
  service_name: string,
  pet_name: string,
  notes: string,
  doctor_name: string,
  date: string,
  status: string,
}

interface AppointmentSection {
  date: string,
  items: Appointment[],
}

const AppointmentScreen = () => {
  const navigation = useNavigation<any>();

  const { appointmentList, appointmentLoading, getAppointmentList } = useAppointment();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching appointments');
      getAppointmentList();
    }, [])
  )
  const onRefresh = async () => {
    setRefreshing(true);
    await getAppointmentList();
    setRefreshing(false);
  }

  const sections: AppointmentSection[] = useMemo(() => {
    if (!appointmentList) return [];

    const sectionsMap: Record<string, Appointment[]> = appointmentList.reduce((acc, item) => {
      const date = new Date(item.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {} as Record<string, Appointment[]>);

    return Object.entries(sectionsMap)
      .map(([date, items]) => ({
        date,
        items,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [appointmentList]);

  if (appointmentLoading) {
    return <SplashScreen />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

        }>
        {
          sections.map(section => (
            <View key={section.date}>
              <Text style={styles.dateHeader}>{section.date}</Text>
              <View style={styles.appointmentCardContainer}>
                {
                  section.items.map(item => (
                    <AppointmentCard
                      key={item.id}
                      appointment={item}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </ScrollView>


      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateAppointmentScreen')}>
        <Text style={styles.createButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  dateHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 15,
    color: '#333',
  },
  appointmentCardContainer: {
    paddingHorizontal: 10,
    // marginBottom: 20,  // Add bottom margin to create space between sections
  },
  createButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 30,
  },
});
export default AppointmentScreen;
