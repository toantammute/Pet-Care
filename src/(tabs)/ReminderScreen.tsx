import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CreateReminderScreen from '../CreateReminderScreen';
import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native'
import ReminderCard from '../../components/reminder/ReminderCard';

const ReminderScreen = () => {
  
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<{ Reminders: undefined }>>();

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Set the date and time for the notification
    const date = new Date(2024, 10, 18, 9, 15, 0); // Note: Month is 0-indexed (10 is November)

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };

    const notificationId = 'default';

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        id: notificationId,
        title: '09:15 DAILY',
        body: `This is a scheduled notification for 9:15 PM on November 18, 2024: ${notificationId}` ,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger,
    );
  }

  return (
    <View style={styles.container}>
      <ReminderCard />
  
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Reminders')}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      {/* <Button
        title="Create Reminder"
        onPress={() => navigation.navigate('Reminders')}
      /> */}
      {/* <Button
        title="Create Reminder"
        onPress={() => navigation.navigate('Reminders')}
      /> */}

      
      {/* <Text style={styles.title}>Reminders</Text>
      <Button
        title="Create Reminder"
        onPress={() => navigation.navigate('Reminders')}
      />
      <Button title="Create Trigger Notification" onPress={() => onDisplayNotification()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
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