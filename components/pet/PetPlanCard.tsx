import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export interface PetPlan {
  log_id:string;
  pet_id: string;
  date_time: string;
  title: string;
  notes: string;
}
//  Logs [{"date_time": "2024-11-20T06:57:18Z", "log_id": 9, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:10Z", "log_id": 8, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:06Z", "log_id": 7, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:03Z", "log_id": 6, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:54:58Z", "log_id": 5, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}]
export interface ScheduleCardProps {
  log: PetPlan;             // Define the type of the pet prop
}

const PetPlanCard: React.FC<ScheduleCardProps> =({log})=> {
  return (
    <TouchableOpacity style={[styles.planItem, { backgroundColor: '#F8F9FA' }]}>
      <View style={styles.planContent}>
        <Text style={styles.planevent_time}>{log.title}</Text>
        <Text style={styles.planactivity_type}>{log.date_time}</Text>
      </View>
      <Text style={styles.planDate}>{log.notes}</Text>
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
    // marginBottom: 12,
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