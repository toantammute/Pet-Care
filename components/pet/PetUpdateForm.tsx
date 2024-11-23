import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import usePets from '../../hooks/usePets';

const PetUpdateForm = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<{ PetDetail: undefined }>>();
  const route = useRoute();
  const { petid } = route.params as { petid: string };
  const { updatePet } = usePets();

  const [petData, setPetData] = useState({
      name: '',
      type: '',
      breed: '',
      age: '',
      weight: '',
      gender: '',
      healthnotes: '',
      birth_date: '',
      microchip_number: '',
  });
  
  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setPetData({ ...petData, birth_date: formattedDate });
    }
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await updatePet(petid, { ...petData, age: parseInt(petData.age), weight: parseFloat(petData.weight) });
      Alert.alert('Success', 'Pet details updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update pet details. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Update Pet Profile</Text>
        <Text style={styles.subtitle}>Update details about your pet</Text>
      </View>

      <View style={styles.form}>
        {/* Name */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="pets" size={20} color="#6366f1" />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={petData.name}
            onChangeText={(text) => setPetData({ ...petData, name: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Type */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="category" size={20} color="#8b5cf6" />
          <TextInput
            style={styles.input}
            placeholder="Type (e.g., Dog, Cat)"
            value={petData.type}
            onChangeText={(text) => setPetData({ ...petData, type: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Breed */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="style" size={20} color="#ec4899" />
          <TextInput
            style={styles.input}
            placeholder="Breed"
            value={petData.breed}
            onChangeText={(text) => setPetData({ ...petData, breed: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Age */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="hourglass-empty" size={20} color="#14b8a6" />
          <TextInput
            style={styles.input}
            placeholder="Age (years)"
            value={petData.age}
            onChangeText={(text) => setPetData({ ...petData, age: text })}
            keyboardType="numeric"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Weight */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="fitness-center" size={20} color="#f97316" />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={petData.weight}
            onChangeText={(text) => setPetData({ ...petData, weight: text })}
            keyboardType="decimal-pad"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Gender */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="wc" size={20} color="#6366f1" />
          <TextInput
            style={styles.input}
            placeholder="Gender (e.g., Male, Female)"
            value={petData.gender}
            onChangeText={(text) => setPetData({ ...petData, gender: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Health Notes */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="healing" size={20} color="#8b5cf6" />
          <TextInput
            style={styles.input}
            placeholder="Health Notes"
            value={petData.healthnotes}
            onChangeText={(text) => setPetData({ ...petData, healthnotes: text })}
            multiline
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Birth Date */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="calendar-today" size={20} color="#ec4899" />
           <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Birth Date (YYYY-MM-DD)"
            value={petData.birth_date}
            editable={false}
            placeholderTextColor="#9ca3af"
          />
        </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(petData.birth_date || Date.now())}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Microchip Number */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="confirmation-number" size={20} color="#14b8a6" />
          <TextInput
            style={styles.input}
            placeholder="Microchip Number"
            value={petData.microchip_number}
            onChangeText={(text) => setPetData({ ...petData, microchip_number: text })}
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Update Pet Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f3f4f6',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
    elevation: 2,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  button: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
    
export default PetUpdateForm