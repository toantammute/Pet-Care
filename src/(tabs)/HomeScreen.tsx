import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useCallback, useContext, useEffect } from "react";
import { StyleSheet, SafeAreaView, Text,TextInput, View, Button, TouchableOpacity } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/home/Header";
import { NavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types";
import usePetSchedule from "../../hooks/usePetSchedule";
import { createNotification } from "../../services/Notification";

interface Schedule {
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


const HomeScreen = () =>{
  const {isLoading, Logout, userInfo} = useContext(AuthContext);
  const { getSchedulesOfUser, scheduleLoading, schedules, petSchedules, updateActivePetSchedule } = usePetSchedule();
  
  const navigation = useNavigation<any>();

  useFocusEffect(
    useCallback(() => {
      console.log('Screen focused, fetching schedule');
      getSchedulesOfUser();
    }, [])
  )
  useEffect(() => {
    const createNotifications = async () => {
      const activeSchedules = schedules ?? [];
      for (const schedule of activeSchedules) {
        if (schedule.is_active) {
          await createNotification(schedule, updateActivePetSchedule);
        }
      }
    };

    createNotifications();
  }, [schedules]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  welcome:{
    fontSize: 20,
    marginBottom: 8,
  },
});

export default HomeScreen;