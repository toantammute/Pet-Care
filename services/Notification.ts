import notifee, { RepeatFrequency, TimestampTrigger, TimeUnit, TriggerType } from '@notifee/react-native';

interface Schedule {
    id: string;
    title: string;
    reminder_datetime: string;
    event_repeat: string;
    notes: string;
}

export const createNotification = async (schedule: Schedule): Promise<void> => {
    try {
        console.log('Creating notification:', schedule);
        // Request permission to display notifications
        await notifee.requestPermission();
        console.log('Permission granted');

        //Create a channel (required on Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // const date = new Date(2024, 10, 22, 16, 56, 0); // Note: Month is 0-indexed (10 is November)

        const date = new Date(schedule.reminder_datetime);
        // Extract hours and minutes
    

        console.log('Notification date:', date);
        const timestamp = date.getTime();
        console.log('Notification timestamp:', timestamp);
        console.log('Notification repeat:', schedule.event_repeat);

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
            repeatFrequency: RepeatFrequency.DAILY,
        };

        await notifee.createTriggerNotification(
            {
                id: schedule.id.toString(),
                title: schedule.title,
                body: schedule.notes,
                android: {
                    channelId: channelId,
                    smallIcon: 'ic_launcher',
                    pressAction: {
                        id: 'default',
                    },
                },
            },
            trigger,
        );
        console.log('Notification created successfully:', schedule);

    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

export const updateNotification = async (schedule: Schedule): Promise<void> => {
    try {
        // Cancel the existing notification
        await notifee.cancelNotification(schedule.id.toString());

        // Create a new notification with updated details
        await createNotification(schedule);
    } catch (error) {
        console.error('Error updating notification:', error);
    }
}

export const cancelNotification = async (scheduleId: string): Promise<void> => {
    try {
        await notifee.cancelNotification(scheduleId.toString());
    } catch (error) {
        console.error('Error canceling notification:', error);
    }
};