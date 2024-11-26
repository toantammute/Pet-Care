import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import { Agenda, AgendaSchedule, DateData } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import useLog from "../hooks/useLog";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Swipeable } from 'react-native-gesture-handler';


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


const LogsScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const route = useRoute();
  const { petid } = route.params as { petid: string };

  const { getLogsbyPet, logLoading, logs, deletePetLog, updatePetLog } = useLog();
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching logs');
      getLogsbyPet(petid, null, null);
    }, [])
  );
  console.log("1", logs);

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

        logs.forEach(log => {
          // const logDate = new Date(log.date_time).toISOString().split('T')[0];
          const logDate = new Date(log.date_time).toLocaleDateString();
          // const logTime = new Date(log.date_time).toLocaleTimeString();
          if (logDate === localeStrTime) {
            newItems[strTime].push({
              log_id: log.log_id,
              pet_id: log.pet_id,
              title: log.title,
              time: new Date(log.date_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              date: logDate,
              date_time : log.date_time,
              notes: log.notes,
            });
          }
        });

      }

      setItems(newItems);
    }, 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getLogsbyPet(petid, null, null);
    await loadItems(new Date());
    setRefreshing(false);
  };
  

  const handleDelete = async (logId: number) => {
    await deletePetLog(logId);
    await getLogsbyPet(petid, null, null); // Reload the logs after deletion
  };

  const renderItem = (items: any) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(items.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
    const handleEdit = () => {
      navigation.navigate('CreateLogsScreen', {
        petid: items.pet_id,
        log_id: items.log_id,
        title: items.title,
        notes: items.notes,
        date_time: items.date_time,
      });
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={handleEdit} style={{ marginRight: 10, marginTop: 17 }}>
          <Card>
            <Card.Content>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.title}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{items.time}</Text>
              </View>
              <Text style={{ marginTop: 10, fontSize: 16 }}>{items.notes}</Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </Swipeable>

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
        onPress={() => navigation.navigate('CreateLogsScreen', { petid })}>
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
    marginTop:10,
    width: 80,
    height: '90%',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
export default LogsScreen;