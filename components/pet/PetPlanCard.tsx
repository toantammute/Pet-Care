import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Swipeable } from 'react-native-gesture-handler';

export interface PetPlan {
  log_id: string;
  pet_id: string;
  date_time: string;
  title: string;
  notes: string;
}
//  Logs [{"date_time": "2024-11-20T06:57:18Z", "log_id": 9, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:10Z", "log_id": 8, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:06Z", "log_id": 7, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:55:03Z", "log_id": 6, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}, {"date_time": "2024-11-20T06:54:58Z", "log_id": 5, "notes": "Đưa Bê Đê đi dạo chợ mua cá", "pet_id": 3, "title": "Bê Đê đi chợ"}]
export interface LogCardProps {
  log: PetPlan;             // Define the type of the pet prop
  deletePetLog: (log_id: string) => Promise<void>;
  refreshLogs: () => Promise<void>;
}

const PetPlanCard: React.FC<LogCardProps> = ({ log, deletePetLog, refreshLogs }) => {
  // Convert the date_time string to a Date object
  const date = new Date(`${log.date_time}`);
  // console.log(date.toLocaleString());


  // Format the date and time separately
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  // const formattedTime = date.toLocaleTimeString('en-GB', {
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   hour12: false
  // });
  const handleDelete = async (log_id: string) => {
    try {
      await deletePetLog(log.log_id);
      await refreshLogs();
    } catch (error) {
      console.log('Error deleting log:', error);
    }
  }
  const renderRightActions = () => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(log.log_id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.content}>
          <Text style={styles.title}>{log.title}</Text>
          <Text style={styles.notes}>{log.notes}</Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.time}>{formattedTime}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>

  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    // alignItems: 'center', // Center content horizontally
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003366',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
  },
  dateTimeContainer: {
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    flexDirection: 'column', // Stack time and date vertically
  },
  time: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4A55A2',
  },
  date: {
    fontSize: 14,
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 80,
    margin: 5,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    padding: 10,
  },
})
export default PetPlanCard

function deletePetLog(log_id: string) {
  throw new Error('Function not implemented.');
}
