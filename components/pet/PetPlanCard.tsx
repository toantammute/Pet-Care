import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export interface PetPlan {
  id:string;
  pet_id: string;
  title: string;
  remider_datetime: string;
  event_repeat: string;
  end_type: string;
  end_date: string;
  notes: string;
}

export interface ScheduleCardProps {
  schedule: PetPlan;             // Define the type of the pet prop
}

const PetPlanCard: React.FC<ScheduleCardProps> =({schedule})=> {
  return (
    <TouchableOpacity style={[styles.planItem, { backgroundColor: '#F8F9FA' }]}>
      <View style={styles.planContent}>
        <Text style={styles.planevent_time}>{schedule.title}</Text>
        <Text style={styles.planactivity_type}>{schedule.event_repeat}</Text>
      </View>
      <Text style={styles.planDate}>{schedule.notes}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
  },
  planContent: {
    flex: 1,
  },
  planevent_time: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  planactivity_type: {
    fontSize: 14,
    color: '#666',
  },
  planDate: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A55A2',
    marginLeft: 12,
  },
})
export default PetPlanCard