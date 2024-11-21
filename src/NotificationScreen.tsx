import { View, Text, Button } from 'react-native'
import React from 'react'
import notifee, { RepeatFrequency, TimestampTrigger, TriggerType } from '@notifee/react-native'

const NotificationScreen = () => {
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Set the date and time for the notification
    const date = new Date(2024, 10, 18, 8, 20, 0); // Note: Month is 0-indexed (10 is November)

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // fire at 6:15 PM on November 17, 2024
      repeatFrequency: RepeatFrequency.DAILY,
    };

    // Create a trigger notification
    await notifee.createTriggerNotification(
      {
        title: '8:20 PM DAILY',
        body: 'This is a scheduled notification for 8:20 PM on November 18, 2024',
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
    <View>
      <Button title="Create Trigger Notification" onPress={() => onDisplayNotification()} />
    </View>
  );
}
export default NotificationScreen;