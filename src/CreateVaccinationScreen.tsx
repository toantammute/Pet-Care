import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import useVaccination from '../hooks/useVaccination';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateVaccinationScreen = () => {
  const route = useRoute();
  const { petid } = route.params as { petid: string };

  const navigation = useNavigation<any>();

  const { createVaccination} = useVaccination();

  const [showAdministeredDate, setShowAdministeredDate] = useState(false);
  const [showNextDate, setShowNextDate] = useState(false);

  const [vaccineName, setVaccineName] = useState('');
  const [notes, setNotes] = useState('');
  const [provider, setProvider] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [administeredDate, setAdministeredDate] = useState<Date | null>(null);
  const [nextDate, setNextDate] = useState<Date | null>(null);

  const administeredDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || administeredDate;
      setAdministeredDate(currentDate);
    }
    setShowAdministeredDate(false);
  }

  const nextDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || nextDate;
      setNextDate(currentDate);
    }
    setShowNextDate(false);
  }

  const handleSubmit = async () => {
    if (!vaccineName.trim()) {
      Alert.alert('Validation Error', 'Vaccine name cannot be empty.');
      return;
    }
    if (!administeredDate) {
      Alert.alert('Validation Error', 'Administered date cannot be empty.');
      return;
    }
    const data = {
      pet_id: petid,
      vaccine_name: vaccineName,
      date_administered: administeredDate,
      notes,
      vaccine_provider: provider,
      batch_number: batchNumber,
      next_due_date: nextDate,
    }
    const result = await createVaccination(data);
    if (result.success) {
      Alert.alert('Success', 'Vaccination created successfully.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      Alert.alert('Error', `Failed to create vaccination: ${result.error}`);
    }
  }


  return (
    <View>
      <View style={styles.inputContainer}>
        <Text>Vaccine Name *</Text>
        <TextInput
          style={styles.inputText}
          value={vaccineName}
          onChangeText={(text) => setVaccineName(text)}
          placeholder='Vaccine Name'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Provider Name</Text>
        <TextInput
          style={styles.inputText}
          value={provider}
          onChangeText={(text) => setProvider(text)}
          placeholder='Provider Name'
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Batch Number</Text>
        <TextInput
          style={styles.inputText}
          value={batchNumber}
          onChangeText={(text) => setBatchNumber(text)}
          placeholder='Batch Number'
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowAdministeredDate(true)}>
              <Text>
                {`Administered Date *:`}
              </Text>
              <Text>
                {` ${administeredDate ? administeredDate.toLocaleDateString() : ''}`}
              </Text>
            </TouchableOpacity>

            {showAdministeredDate && (
              <DateTimePicker
                value={administeredDate || new Date()}
                mode='date'
                display='default'
                onChange={administeredDateChange}
              />
            )}
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateBox}>
            <TouchableOpacity style={{ flexDirection: 'column', gap: 5 }} onPress={() => setShowNextDate(true)}>
              <Text>
                {`Next Due Date:`}
              </Text>
              <Text>
                {` ${nextDate ? nextDate.toLocaleDateString() : ''}`}
              </Text>
            </TouchableOpacity>

            {showNextDate && (
              <DateTimePicker
                value={nextDate || new Date()}
                mode='date'
                display='default'
                onChange={nextDateChange}
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
        <TouchableOpacity
          onPress={handleSubmit}>
          <Text style={styles.saveBtn}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputText: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10
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
  inputNotes: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: 'auto',
    height: 100,
    textAlignVertical: 'top'
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
  saveBtn: {
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    width: 100,
    textAlign: 'center'
  },

  dateContainer: {
    padding: 10,
    // alignItems: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    gap: 30,
  },
})
export default CreateVaccinationScreen