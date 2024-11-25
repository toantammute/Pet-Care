import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import useAppointment from '../hooks/useAppointment';
import usePet from '../hooks/usePets'
import useService from '../hooks/useService';
import useDoctors from '../hooks/useDoctors';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import notifee, { AndroidImportance, TimestampTrigger, TriggerType } from '@notifee/react-native';


interface Pet {
  petid: string;  // or string
  name: string;
  // other properties
}
interface Service {
  service_id: string;  // or string
  name: string;
  // other properties
}
interface Doctor {
  id: string;
  name: string;
}

const CreateAppointmentScreen = () => {
  const navigation = useNavigation<any>();


  const { createAppointment, responseStatus, appointment, appointmentList, appointmentLoading } = useAppointment();

  const createNotification = async (appointment: any) => {
    // Create a channel (required for Android)
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    
    const appointmentDateTime = new Date(appointment.date);
    const formattedDateTime = appointmentDateTime.toLocaleString(); // Convert to locale string

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: appointmentDateTime.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Appointment Reminder',
        body: `You have an appointment with Dr. ${appointment.doctor_name} for ${appointment.pet_name} on ${formattedDateTime} for ${appointment.service_name}.`,
        android: {
          channelId: 'default',
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        },
      },
      trigger,
    );
  };


  useEffect(() => {
    if (responseStatus === 200 && appointment) {
      console.log('Create appointment response:', appointment);
      Alert.alert('Success', 'Appointment created successfully.', [
        {
          text: 'OK', onPress: () => {
            createNotification(appointment);
            navigation.goBack()
          }
        },
      ]);
    } else if (responseStatus) {
      Alert.alert('Error', 'Failed to create appointment.');
    }
  }, [responseStatus, appointment]);

  const [petChoose, setPetChoose] = useState<string | null>(null);
  const [petFocus, setPetFocus] = useState(false);
  const { pets, isLoading, getPets } = usePet() as { pets: Pet[], isLoading: boolean, getPets: () => void };
  const petData = pets?.map((pet) => ({ label: pet.name, value: pet.petid }));
  const renderLabelPet = () => {
    if (petChoose || petFocus) {
      return (
        <Text style={[styles.label, petFocus && { color: 'blue' }]}>
          For Pet
        </Text>
      );
    }
    return null;
  }

  const [doctorChoose, setDoctorChoose] = useState<string | null>(null);
  const [doctorFocus, setDoctorFocus] = useState(false);
  const { doctors, getDoctors, doctorsLoading } = useDoctors() as { doctors: Doctor[], doctorsLoading: boolean, getDoctors: () => void };
  const doctorData = doctors?.map((doctor) => ({ label: doctor.name, value: doctor.id }));
  const renderLabelDoctor = () => {
    if (doctorChoose || doctorFocus) {
      return (
        <Text style={[styles.label, doctorFocus && { color: 'blue' }]}>
          Doctor
        </Text>
      );
    }
  }
  const [serviceChoose, setServiceChoose] = useState<string | null>(null);
  const [serviceFocus, setServiceFocus] = useState(false);
  const { services, serviceLoading, getServicesList } = useService() as { services: Service[], serviceLoading: boolean, getServicesList: () => void };
  const serviceData = services?.map((service) => ({ label: service.name, value: service.service_id }));
  const renderLabelService = () => {
    if (serviceChoose || serviceFocus) {
      return (
        <Text style={[styles.label, serviceFocus && { color: 'blue' }]}>
          Service
        </Text>
      );
    }
  }

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [notes, setNotes] = useState('');

  useEffect(() => {
    getPets();
    getDoctors();
    getServicesList();
  }, []);

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    }
    setShowDatePicker(false);
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (event.type === 'set') {
      const currentTime = selectedTime || time;
      setTime(currentTime);
    }
    setShowTimePicker(false);
  };

  const formatDateTime = (date: Date | null, time: Date | null): string | null => {
    if (!date || !time) return null;
    const utcDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );
    return utcDate.toISOString();
  };
  // const formatDateTime = (date: Date | null, time: Date | null): string | null => {
  //   if (!date || !time) return null;
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(time.getHours()).padStart(2, '0');
  //   const minutes = String(time.getMinutes()).padStart(2, '0');
  //   const seconds = String(time.getSeconds()).padStart(2, '0');
  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };

  const appointmentData = formatDateTime(date, time);
  const handleSubmit = async () => {
    if (!petChoose || !serviceChoose || !doctorChoose || !date || !time) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }
    const data = {
      pet_id: petChoose,
      service_id: serviceChoose,
      doctor_id: doctorChoose?.toString(),
      date: appointmentData,
      notes: notes,
    }
    await createAppointment(data);

  }


  return (
    <View style={styles.container}>
      <View style={styles.multiContainer}>
        {renderLabelPet()}
        <Dropdown
          style={[styles.dropdown, petFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={petData}
          search
          maxHeight={300}
          labelField='label'
          valueField="value"
          placeholder={!petFocus ? 'For pet' : '...'}
          searchPlaceholder="Search..."
          value={petChoose}
          onFocus={() => setPetFocus(true)}
          onBlur={() => setPetFocus(false)}
          onChange={item => {
            setPetChoose(item.value);
            setPetFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={petFocus ? 'blue' : 'black'}
              name="event-repeat"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.multiContainer}>
        {renderLabelService()}
        <Dropdown
          style={[styles.dropdown, serviceFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={serviceData}
          search
          maxHeight={300}
          labelField='label'
          valueField="value"
          placeholder={!serviceFocus ? 'Service' : '...'}
          searchPlaceholder="Search..."
          value={serviceChoose}
          onFocus={() => setServiceFocus(true)}
          onBlur={() => setServiceFocus(false)}
          onChange={item => {
            setServiceChoose(item.value);
            setServiceFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={serviceFocus ? 'blue' : 'black'}
              name="event-repeat"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.multiContainer}>
        {renderLabelDoctor()}
        <Dropdown
          style={[styles.dropdown, doctorFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={doctorData}
          search
          maxHeight={300}
          labelField='label'
          valueField="value"
          placeholder={!doctorFocus ? 'Doctor' : '...'}
          searchPlaceholder="Search..."
          value={doctorChoose}
          onFocus={() => setDoctorFocus(true)}
          onBlur={() => setDoctorFocus(false)}
          onChange={item => {
            setDoctorChoose(item.value);
            setDoctorFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={doctorFocus ? 'blue' : 'black'}
              name="event-repeat"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowDatePicker(true)}>
              <Text>
                {`Date:`}
              </Text>
              <Text>
                {` ${date ? date.toLocaleDateString() : ''}`}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={date || new Date()}
                mode='date'
                display='default'
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
        </View>


        <View style={styles.dateContainer}>
          <View style={styles.timeBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowTimePicker(true)}>
              <Text>
                {`Time:`}
              </Text>
              <Text>
                {`${time ? time.toLocaleTimeString() : ''}`}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={time || new Date()}
                mode='time'
                display='default'
                onChange={onTimeChange}
              />
            )}
          </View>
        </View>

      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputNotes}
          editable
          multiline
          numberOfLines={10}
          maxLength={200}
          placeholder='Notes'
          value={notes}
          onChangeText={(text) => setNotes(text)}
        />
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  saveBtn: {
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    width: 100,
    textAlign: 'center'
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10
  },
  inputNotes: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
    height: 100,
    textAlignVertical: 'top'
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,

  },
  multiContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,

  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label: {
    // position: 'absolute',
    width: 70,
    backgroundColor: '#F2f2f2',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  dateBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 160,
  },
  timeBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 5,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 160,
    height: 'auto',
    alignSelf: 'baseline'
  },
  dateContainer: {
    padding: 10,
    // alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    // paddingHorizontal: 8,
  },
  icon: {
    marginRight: 20,
    marginLeft: 10,
  },

})
export default CreateAppointmentScreen;