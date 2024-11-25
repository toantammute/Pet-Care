import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import useAppointment from '../hooks/useAppointment';
import { useNavigation } from '@react-navigation/native';

const AppointmentScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View>
      <Text>AppointmentScreen</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CreateAppointmentScreen')}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({

})
export default AppointmentScreen;