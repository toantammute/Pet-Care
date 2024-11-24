import notifee, { RepeatFrequency, TimestampTrigger, TimeUnit, TriggerType } from '@notifee/react-native';
import usePetSchedule from '../hooks/usePetSchedule';

interface Schedule {
    id: string;
    title: string;
    reminder_datetime: string; // ISO 8601 format
    event_repeat: string;
    notes: string;
    end_date: string | null;
    is_active: boolean;
}

//Lấy ngày hiện tại
const crtDate = new Date();

export const createNotification = async (
    schedule: Schedule,
    updateActivePetSchedule: (scheduleId: string, isActive: boolean) => Promise<void>
): Promise<void> => {
    // const { updateActivePetSchedule } = usePetSchedule();

    try {
        console.log('Creating notification1:', schedule);
        // Request permission to display notifications
        await notifee.requestPermission();
        console.log('Permission granted');

        //Create a channel (required on Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        const currentDate = new Date(); // Get current date

        // const date = new Date(2024, 10, 22, 16, 56, 0); // Note: Month is 0-indexed (10 is November)

        const date = new Date(schedule.reminder_datetime);
        const endDate = schedule.end_date ? new Date(schedule.end_date) : null;
        // Extract hours and minutes
        console.log('Date:', date);
        // console.log('ISOCurrent Date:', isoCurrentDate);
        console.log('Current Date:', currentDate);

        //Kiểm tra không lặp lại và ngày thông báo < ngày hiện tại
        if (schedule.event_repeat === 'NONE' && date < currentDate) {
            console.log('Notification date is in the past:', schedule);
            updateActivePetSchedule(schedule.id, false); // Call the update function with active set to false
            return; // Exit if no notification is needed
        }
        else if (schedule.event_repeat === 'NONE' && date >= currentDate) {
            console.log('Notification date is do not repeat and in the future:', schedule);
            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: date.getTime(),
                repeatFrequency: RepeatFrequency.NONE,
            };
            await notifee.createTriggerNotification(
                {
                    id: `SCHE${schedule.id.toString()}`,
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
        }
        else {

            if (endDate !== null && endDate < currentDate && schedule.end_date !== "0001-01-01T00:00:00Z") {
                console.log('End date is in the past:', schedule);
                updateActivePetSchedule(schedule.id, false); // Set schedule as inactive
                return;
            }
            else {
                if (date >= currentDate) {
                    console.log('Notification date is in the future:', schedule);
                    const trigger: TimestampTrigger = {
                        type: TriggerType.TIMESTAMP,
                        timestamp: date.getTime(),
                        repeatFrequency: RepeatFrequency[schedule.event_repeat as keyof typeof RepeatFrequency],
                    };
                    await notifee.createTriggerNotification(
                        {
                            id: `SCHE${schedule.id.toString()}`,
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
                }
                else {
                    if (schedule.event_repeat === 'DAILY') {
                        console.log('Notification date is in the past but have daily', schedule);
                        date.setDate(currentDate.getDate() + 1);
                        const trigger: TimestampTrigger = {
                            type: TriggerType.TIMESTAMP,
                            timestamp: date.getTime(),
                            repeatFrequency: RepeatFrequency.DAILY,
                        };
                        await notifee.createTriggerNotification(
                            {
                                id: `SCHE${schedule.id.toString()}`,
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
                    }
                    else if (schedule.event_repeat === 'WEEKLY') {
                        console.log('Notification date is in the past but have weekly', schedule);
                        while (date < currentDate) {
                            date.setDate(date.getDate() + 7);
                        }
                        console.log('Sau khi them 7 ngay:', date);
                        //Nếu sau khi thêm < enddate thì
                        if (endDate !== null && date > endDate) {
                            console.log("Không được vì lớn hơn EndDate");
                            updateActivePetSchedule(schedule.id, false); // Set schedule as inactive
                            return;
                        }
                        else {
                            const trigger: TimestampTrigger = {
                                type: TriggerType.TIMESTAMP,
                                timestamp: date.getTime(),
                                repeatFrequency: RepeatFrequency.WEEKLY,
                            };
                            await notifee.createTriggerNotification(
                                {
                                    id: `SCHE${schedule.id.toString()}`,
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
                        }

                    }
                }
            }
        };

    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

// export const updateNotification = async (schedule: Schedule): Promise<void> => {
//     try {
//         // Cancel the existing notification
//         await notifee.cancelNotification(schedule.id.toString());

//         // Create a new notification with updated details
//         await createNotification(schedule);
//     } catch (error) {
//         console.error('Error updating notification:', error);
//     }
// }

export const cancelNotification = async (schedule_id:String): Promise<void> => {
    try {
        await notifee.cancelNotification(`SCHE${schedule_id}`);
        console.log('Notification canceled successfully:', schedule_id);
    } catch (error) {
        console.error('Error canceling notification:', error);
    }
};