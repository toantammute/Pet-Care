import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'

interface Vaccination {
  vaccination_id: string,
  pet_id: string,
  vaccine_name: string,
  date_administered: string,
  next_due_date: string,
  vaccine_provider: string,
  batch_number: string,
  notes: string,
}
interface VaccinationCardProps {
  vaccination: Vaccination;
}

const VaccinationCard: React.FC<VaccinationCardProps> = ({ vaccination }) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('VaccinationDetailScreen', { vaccination_id: vaccination.vaccination_id });
  };

  // Convert the date string to a Date object
  const administeredDate = new Date(vaccination.date_administered);

  // Format the date and time separately
  const formattedAdministeredDate = administeredDate.toLocaleDateString();
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{vaccination.vaccine_name}</Text>

      </View>
      <View>
        <Text style={styles.time}>{formattedAdministeredDate}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 3, // Adds shadow on Android
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  time: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4A55A2',
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    // alignItems: 'center', // Center content horizontally
    paddingRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: '#666',
  },
});
export default VaccinationCard;