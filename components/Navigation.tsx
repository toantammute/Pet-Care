import React, { useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../src/LoginScreen';
import RegisterScreen from '../src/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import SplashScreen from '../src/SplashScreen';
import TabLayout from '../src/(tabs)/_layout';
import NotificationScreen from '../src/NotificationScreen';
import PetScreen from '../src/(tabs)/PetScreen';
import AddPetScreen from '../src/NewPetScreen';
import PetDetail from '../src/PetDetail';
import OTPScreen from '../src/OTPScreen';
import CreateLogsScreen from '../src/CreateLogsScreen';
import LogsScreen from '../src/LogsScreen';
import CreateReminderScreen from '../src/CreateReminderScreen';
import CreateVaccinationScreen from '../src/CreateVaccinationScreen';
import AppointmentScreen from '../src/AppointmentScreen';
import ServiceScreen from '../src/ServiceScreen';
import DiseaseScreen from '../src/DiseaseScreen';
import AI_Chat from '../src/AI_Chat';
import UpdateUserScreen from '../src/UpdateUserScreen';
import UpdatePetScreen from '../src/UpdatePetScreen';
import CreateAppointmentScreen from '../src/CreateAppointmentScreen';
import DiseaseDetailScreen from '../src/DiseaseDetailScreen';
import VaccinationDetailScreen from '../src/VaccinationDetailScreen';

const Stack = createNativeStackNavigator();


const Navigation = () => {

  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ?
          (
            <>
              <Stack.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
            </>
          ) :
          userInfo.access_token ? (
            <>
              <>
                <Stack.Screen name='Tab' component={TabLayout} options={{ headerShown: false }} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="CreateReminder" component={CreateReminderScreen} />
                <Stack.Screen name="UpdatePetScreen" component={UpdatePetScreen} />
                <Stack.Screen name="PetDetail" component={PetDetail} options={{title:'Pet Detail'}} />
                <Stack.Screen name="AddPetScreen" component={AddPetScreen} />
                <Stack.Screen name="CreateLogsScreen" component={CreateLogsScreen} options={{title:`Insert Pet Daily's Log`}} />
                <Stack.Screen name="LogsScreen" component={LogsScreen} options={{title:`Pet's Log`}}/>
                <Stack.Screen name="CreateVaccinationScreen" component={CreateVaccinationScreen} options={{title:`Insert Vaccination`}}/>
                <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{title:`Appointments`}} />
                <Stack.Screen name="ServiceScreen" component={ServiceScreen} options={{title:`Services`}}/>
                <Stack.Screen name="DiseaseScreen" component={DiseaseScreen} options={{title:`Diseases`}}/>
                <Stack.Screen name="AI_Chat" component={AI_Chat} options={{title:`Chat with AI`}}/>
                <Stack.Screen name="UpdateUserScreen" component={UpdateUserScreen} options={{title:`Update User's Information`}}/>
                <Stack.Screen name="CreateAppointmentScreen" component={CreateAppointmentScreen} options={{title:`Create Appointment`}}/>
                <Stack.Screen name="DiseaseDetailScreen" component={DiseaseDetailScreen} options={{title:`Disease Detail`}}/>
                <Stack.Screen name="VaccinationDetailScreen" component={VaccinationDetailScreen} options={{title:`Vaccination Detail`}}/>
              </>
            </>
          ) : (
            <>
              <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
              <Stack.Screen name="OTPVerification" component={OTPScreen} options={{ headerShown: false }} />
            </>

          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
