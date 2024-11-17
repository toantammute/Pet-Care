import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CreateReminderScreen from '../CreateReminderScreen';
import { RootStackParamList } from '../../types';

const ReminderScreen: React.FC = () => {
  
  // const navigation = useNavigation();
  const navigation = useNavigation<NavigationProp<{ Reminders: undefined }>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      {/* List of reminders will go here */}
      <Button
        title="Create Reminder"
        onPress={() => navigation.navigate('Reminders')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ReminderScreen;