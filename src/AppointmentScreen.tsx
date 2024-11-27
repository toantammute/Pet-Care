// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import React, { useCallback, useMemo, useState } from 'react'
// import useAppointment from '../hooks/useAppointment';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import SplashScreen from './SplashScreen';
// import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
// import AppointmentCard from '../components/appointment/AppointmentCard';
// import App from '../App';

// interface Appointment {
//   id: string,
//   service_name: string,
//   pet_name: string,
//   notes: string,
//   doctor_name: string,
//   date: string,
//   status: string,
// }

// interface AppointmentSection {
//   date: string,
//   items: Appointment[],
// }

// const AppointmentScreen = () => {
//   const navigation = useNavigation<any>();

//   const { appointmentList, appointmentLoading, getAppointmentList } = useAppointment();
//   const [refreshing, setRefreshing] = useState(false);

//   useFocusEffect(
//     useCallback(() => {
//       console.log('Screen focused, fetching appointments');
//       getAppointmentList();
//     }, [])
//   )
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await getAppointmentList();
//     setRefreshing(false);
//   }

//   const sections: AppointmentSection[] = useMemo(() => {
//     if (!appointmentList) return [];

//     const sectionsMap: Record<string, Appointment[]> = appointmentList.reduce((acc, item) => {
//       const date = new Date(item.date).toLocaleDateString();
//       if (!acc[date]) {
//         acc[date] = [];
//       }
//       acc[date].push(item);
//       return acc;
//     }, {} as Record<string, Appointment[]>);

//     return Object.entries(sectionsMap)
//       .map(([date, items]) => ({
//         date,
//         items,
//       }))
//       .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//   }, [appointmentList]);

//   if (appointmentLoading) {
//     return <SplashScreen />
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />

//         }>
//         {
//           sections.map(section => (
//             <View key={section.date}>
//               <Text style={styles.dateHeader}>{section.date}</Text>
//               <View style={styles.appointmentCardContainer}>
//                 {
//                   section.items.map(item => (
//                     <AppointmentCard
//                       key={item.id}
//                       appointment={item}
//                     />
//                   ))
//                 }
//               </View>
//             </View>
//           ))
//         }
//       </ScrollView>


//       <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CreateAppointmentScreen')}>
//         <Text style={styles.createButtonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   dateHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     paddingHorizontal: 15,
//     color: '#333',
//   },
//   appointmentCardContainer: {
//     paddingHorizontal: 10,
//     // marginBottom: 20,  // Add bottom margin to create space between sections
//   },
//   createButton: {
//     position: 'absolute',
//     right: 20,
//     bottom: 20,
//     backgroundColor: '#007BFF',
//     borderRadius: 30,
//     width: 60,
//     height: 60,
//     alignItems: 'center',
//     justifyContent: 'center',
//     elevation: 5, // For Android shadow
//     shadowColor: '#000', // For iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   createButtonText: {
//     color: '#fff',
//     fontSize: 30,
//   },
// });
// export default AppointmentScreen;
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';
import useAppointment from '../hooks/useAppointment';


interface Log {
  log_id: string,
  pet_id: string,
  title: string,
  notes: string,
  date_time: string,
}

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


const AppointmentScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#B8860B';
      case 'cancel':
        return 'red';
      case 'success':
        return 'green';
      default:
        return 'gray';
    }
  };

  // const route = useRoute();
  // const { petid } = route.params as { petid: string };

  // const { getLogsbyPet, logLoading, logs, deletePetLog, updatePetLog } = useLog();
  const { getAppointmentList, appointmentList, appointmentLoading } = useAppointment();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching logs');
      getAppointmentList();
    }, [])
  );
  console.log("1", appointmentList);

  const [items, setItems] = React.useState<Record<string, any>>({});

  const loadItems = (day: any) => {
    if (!day) return; // Ensure day is defined

    setTimeout(() => {
      const newItems: Record<string, any[]> = {};

      for (let i = -25; i < 10; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        const localeStrTime = new Date(strTime).toLocaleDateString();

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }

        appointmentList.forEach(appointment => {
          // const logDate = new Date(log.date_time).toISOString().split('T')[0];
          const appointmentDate = new Date(appointment.date).toLocaleDateString();
          // const logTime = new Date(log.date_time).toLocaleTimeString();
          if (appointmentDate === localeStrTime) {
            newItems[strTime].push({
              appointment_id: appointment.id,
              pet_name: appointment.pet_name,
              service_name: appointment.service_name,
              notes: appointment.notes,
              doctor_name: appointment.doctor_name,
              time: new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: appointment.status,
            });
          }
        });

      }

      setItems(newItems);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getAppointmentList();
    await loadItems(new Date());
    setRefreshing(false);
  };


  // const handleDelete = async (logId: number) => {
  //   await deletePetLog(logId);
  //   await getLogsbyPet(petid, null, null); // Reload the logs after deletion
  // };

  const renderItem = (items: any) => {
    // const renderRightActions = () => (
    //   <TouchableOpacity
    //     style={styles.deleteButton}
    //     onPress={() => handleDelete(items.id)}
    //   >
    //     <Text style={styles.deleteButtonText}>Delete</Text>
    //   </TouchableOpacity>
    // );
    // const handleEdit = () => {
    //   navigation.navigate('CreateLogsScreen', {
    //     petid: items.pet_id,
    //     log_id: items.log_id,
    //     title: items.title,
    //     notes: items.notes,
    //     date_time: items.date_time,
    //   });
    // };

    return (
      // <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card style={{ backgroundColor: '#E8F7FE', borderRadius: 10, }}>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.service_name} for {items.pet_name}</Text>

            </View>
            <View>
              <View style={{flexDirection:'row', }}>
                <View style={{flex:1}}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.time}</Text>
                </View>
                <View style={{flex:2, marginTop:1}}>
                  <Text style={{ fontSize: 16, color: 'gray' }}>Doctor: {items.doctor_name}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, color: 'gray' }}>Notes: {items.notes}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, color: 'gray' }}>Status: </Text>
                <Text style={{ fontSize: 16, color: getStatusColor(items.status) }}>{items.status}</Text>
              </View>

            </View>


          </Card.Content>
        </Card>
      </TouchableOpacity>
      // </Swipeable>

    )
  };


  const today = new Date().toLocaleDateString('en-CA'); // Use toLocaleDateString with 'en-CA' for YYYY-MM-DD format
  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={today}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateAppointmentScreen')}>
        <Icon name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
};
const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ea', // Change to the color you want
    padding: 16,
    borderRadius: 30,
    elevation: 8, // Add shadow for Android
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 80,
    height: '90%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default AppointmentScreen;