import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native';
import usePetSchedule from '../../hooks/usePetSchedule';
import PetReminderCard from '../../components/reminder/PetReminderCard';
import { createNotification, updateNotification, cancelNotification } from '../../services/Notification';

interface Schedule {
  id: string,
  pet_id: string,
  title: string,
  notes: string,
  reminder_datetime: string,
  is_active: boolean,
  event_repeat: string,
  end_type: boolean,
  end_date: string | null,
}

const ReminderScreen = () => {
  const { getSchedulesOfUser, scheduleLoading, schedules, petSchedules, updateActivePetSchedule } = usePetSchedule();

  const renderItem = ({ item }: { item: any }) => (
    <PetReminderCard pet_schedule={item} updateActivePetSchedule={updateActivePetSchedule} />
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await getSchedulesOfUser(); // Fetch pets data
    setRefreshing(false);
  }

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching schedule');
      getSchedulesOfUser();
    }, [])
  )

  useEffect(() => {
    const createNotifications = async () => {
      const activeSchedules = schedules ?? [];
      for (const schedule of activeSchedules) {
        if (schedule.is_active) {
          await createNotification(schedule);
        }
      }
    };

    createNotifications();
  }, [schedules]);

  const navigation = useNavigation<NavigationProp<{ Reminders: undefined }>>();


  return (
    <View
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <FlatList
          scrollEnabled={false}
          data={petSchedules}
          keyExtractor={(item) => item.pet_id.toString()}
          renderItem={renderItem}
          // ItemSeparatorComponent={() => <View style={{height:5}} />}
          ListEmptyComponent={<Text>No reminder.</Text>} />


      </ScrollView>
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Reminders')}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 6,
    paddingRight: 6,

    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  createButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF', // Change color as needed
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30, // Position it at the bottom of the screen
    right: 30, // Position it to the right
    elevation: 5, // Add elevation for shadow effect

  },
  buttonText: {
    fontSize: 24,
    color: '#fff', // Text color
  },
});

export default ReminderScreen;