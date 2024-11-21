import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export interface Reminder {
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
export interface ReminderCardProps {
  schedule: Reminder;
  updateActivePetSchedule: (schedule_id: string, is_active: boolean) => Promise<void>;
}

const ReminderCard: React.FC<ReminderCardProps> = ({ schedule, updateActivePetSchedule }) => {

  // Separate reminder_datetime into date and time
  const reminderDateTime = new Date(schedule.reminder_datetime);
  // const timeString = reminderDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const timeString = reminderDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateString = reminderDateTime.toLocaleDateString();
  // const endDateString = schedule.end_date ? new Date(schedule.end_date).toLocaleDateString() : '';

  // Initialize switch state based on schedule.is_active
  const [isEnabled, setIsEnabled] = useState(schedule.is_active);


  const toggleSwitch = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    try {
      await updateActivePetSchedule(schedule.id, newState); // Call the function with the schedule ID and new state
    } catch (error) {
      console.log('Error toggling schedule:', error);
      // Optionally revert the switch state if the update fails
      setIsEnabled(previousState => !previousState);
    }
  };

  // const toggleSwitch = () => {
  //   setIsEnabled(previousState => !previousState);
  //   // Here you would typically handle the state change, e.g., send to API
  // };

  // Build the end date string if applicable
  let endDateString = '';
  if (schedule.end_date && schedule.end_date !== '0001-01-01T00:00:00Z' && schedule.end_type !== false) {
    const endDate = new Date(schedule.end_date);
    if (!isNaN(endDate.getTime())) {
      endDateString = endDate.toLocaleDateString();
    }
  }

  // Build the date display string
  let dateDisplay = dateString;
  if (endDateString) {
    dateDisplay += ` - ${endDateString}`;
  }

  // Build the repeat info string
  let repeatInfo = '';
  if (schedule.event_repeat !== 'NONE') {
    repeatInfo = `, ${schedule.event_repeat}`;
  }

  return (
    <View style={styles.container}>
      {/* View trai */}
      <View style={styles.leftContainer}>
        {/* Trai tren */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{timeString}</Text>
          <Text style={styles.date}>{dateDisplay}{repeatInfo}</Text>
        </View>
        {/* Trai duoi */}
        <View>
          <Text style={styles.title}>{schedule.title}</Text>
          <Text style={styles.note}>{schedule.notes}</Text>
        </View>
      </View>
      {/* Bottom view phai nut turn on turn off */}
      <View style={styles.switchContainer}>
        <Switch
          value={isEnabled} onValueChange={toggleSwitch}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3, // For Android shadow
  },
  leftContainer: {
    flexDirection: 'column',
    gap: 4,
    // borderWidth:1,
    // borderColor:'#000000',
  },
  time: {
    fontSize: 28,
    fontWeight: '700'
  },
  date: {
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  },
  switchContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    // borderWidth:1,
    // borderColor:'#000000',
  },
  timeContainer: {
    flexDirection: 'column',
    // marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    fontWeight: 400,
    color: '#666'
  }
})
export default ReminderCard

function updateActivePetSchedule(id: string) {
  throw new Error('Function not implemented.');
}
