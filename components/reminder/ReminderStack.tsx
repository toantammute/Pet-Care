import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReminderScreen from '../../src/(tabs)/ReminderScreen'
import CreateReminderScreen from '../../src/CreateReminderScreen';
import { RootStackParamList } from '../../types';
import NotificationScreen from '../../src/NotificationScreen';

const Stack = createNativeStackNavigator();

const ReminderStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="CreateReminder" component={CreateReminderScreen} options={{title:'Create Reminder'}} />
      
    </Stack.Navigator>
  );
};

export default ReminderStack;