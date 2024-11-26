import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import useVaccination from '../hooks/useVaccination';
import SplashScreen from './SplashScreen';
import vaccinationImage from '../assets/images/image.png'
import Icon from 'react-native-vector-icons/Feather';

interface Vaccination {
  vaccination_id: string;
  pet_id: string;
  vaccine_name: string;
  date_administered: string;
  next_due_date: string;
  vaccine_provider: string;
  batch_number: string;
  notes: string;
}

// interface VaccinationDetailProps {
//   vaccination: Vaccination;
// }

const VaccinationDetailScreen = () => {
  const route = useRoute();
  const { vaccination_id } = route.params as { vaccination_id: string };

  const { vaccination, vaccinationLoading, getVaccinationDetail } = useVaccination();

  React.useEffect(() => {
    getVaccinationDetail(vaccination_id);
  }, []);

  if (vaccinationLoading) {
    return (
      <SplashScreen />
    );
  }

  const handleEditPress = () => {
    // Handle the edit button press
    console.log('Edit button pressed');
  };
  const administeredDate = vaccination ? new Date(vaccination.date_administered) : null;
  const formattedAdministeredDate = administeredDate ? administeredDate.toLocaleDateString() : null;

  const nextDueDate = vaccination && vaccination.next_due_date !== "0001-01-01T00:00:00Z" ? new Date(vaccination.next_due_date) : null;
  const formattedNextDueDate = nextDueDate ? nextDueDate.toLocaleDateString() : null;


  return (
    <ScrollView style={styles.screen}>
      {vaccination ? (
        <>
          <View style={styles.container}>
            <View>
            <Image
              source={vaccinationImage} // Use the imported image
              style={styles.image}
              resizeMode="cover" />
            <Text style={styles.title}>Vaccination Details</Text>
            </View>
           
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <Icon name="edit" size={18} color="white" />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
              <View style={styles.row}>
                <Text style={styles.label}>Vaccine Name:</Text>
                <Text style={styles.value}>phòng chống đại dịch covid chung tay ủng hộ</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date Administered:</Text>
                <Text style={styles.value}>{formattedAdministeredDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Next Due Date:</Text>
                <Text style={styles.value}>{formattedNextDueDate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Vaccine provider:</Text>
                <Text style={styles.value}>{vaccination.vaccine_provider}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Batch Number:</Text>
                <Text style={styles.value}>{vaccination.batch_number}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Note:</Text>
                <Text style={styles.value}>{vaccination.notes}</Text>
              </View>

            </View>


          </View>

          <TouchableOpacity style={styles.trashBtn}>
            <Icon style={styles.deleteIcon} name="trash" ></Icon>
          </TouchableOpacity>

        </>
      ) : (
        <Text>Can not get vaccination detail</Text>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    flexDirection: 'column',
    gap: 30,
    width: '100%',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    // paddingTop: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    gap: 20,
  },
  image: {
    width: 350,
    height: 200, // Adjust height as needed
    borderRadius: 8, // Optional: Add rounded corners
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },

  label: {
    flex: 1.8,
    fontWeight: 600,
    fontSize: 17,
  },
  value: {
    flex: 2,
    fontWeight: 400,
    fontSize: 17,
    flexWrap: 'wrap'
  },
  deleteIcon: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 12,
  },
  trashBtn: {
    padding: 10,
    width: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
  
  }
})
export default VaccinationDetailScreen