import { View, Text, Switch, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function ReminderCard() {
  interface Reminder {
    title: string,
    notes: string,
    event_time: string,
    is_active: boolean,
    frequency: string,
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      {/* View trai */}
      <View style={styles.leftContainer}>
        {/* Trai tren */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>04:20</Text>
          <Text style={styles.date}>18/11/2024 - 33/99/2070, DAILY</Text>
        </View>
        {/* Trai duoi */}
        <View>
          <Text style={styles.title}>Cho Bê Đê ăn hạt</Text>
          <Text style={styles.note}>Bê Đê ăn hạt cat eyes</Text>
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
    backgroundColor: '#ffffff',
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
    color:'#666'
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
  title:{
    fontSize: 18,
    fontWeight: '600',
  },
  note:{
    fontSize: 14,
    fontWeight: 400,
    color:'#666'
  }
})