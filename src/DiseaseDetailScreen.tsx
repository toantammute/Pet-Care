import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import diseaseImage from '../assets/images/blog-dog-flu-civ.jpg'

interface Medicine {
  medicine_id: number;
  medicine_name: string;
  usage: string;
  dosage: string;
  frequency: string;
  duration: string;
  side_effects: string;
}

interface TreatmentPhase {
  phase_id: number;
  phase_number: number;
  phase_name: string;
  duration: string;
  phase_description: string;
  phase_notes: string;
  medicines: Medicine[];
}

interface Disease {
  disease_id: number;
  disease_name: string;
  description: string;
  symptoms: string[];
  treatment_phases: TreatmentPhase[];
}

const DiseaseDetailScreen = () => {
  const route = useRoute();
  const { disease_id } = route.params as { disease_id: string };
  const [diseaseData, setDiseaseData] = useState<Disease | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { userInfo } = useContext(AuthContext);

  const fetchDiseaseData = async () => {
    try {
      const response = await axios.get(`http://172.22.79.164:8088/api/v1/disease/treatment/${disease_id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
        },
      });
      setDiseaseData(response.data.data[0]);
    } catch (error) {
      console.error('Error fetching disease data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiseaseData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (!diseaseData) {
    return <Text style={styles.errorText}>No data found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={diseaseImage} // Use the imported image
          style={styles.image}
          resizeMode="cover" />
      </View>
      <Text style={styles.header}>{diseaseData.disease_name}</Text>
      <Text style={styles.description}>{diseaseData.description}</Text>
      <View style={styles.symptomsContainer}>
        <Text style={styles.subHeader}>Symptoms:</Text>
        <View style={styles.symptomsList}>
          {diseaseData.symptoms.map((symptom, index) => (
            <Text key={index} style={styles.symptomText}>- {symptom}</Text>
          ))}
        </View>
      </View>

      <Text style={styles.subHeader}>Treatment Phases:</Text>
      {diseaseData.treatment_phases.map((phase) => (
        <View key={phase.phase_id} style={styles.phaseContainer}>
          <Text style={styles.phaseName}>{phase.phase_name}</Text>
          <Text style={styles.phaseDuration}>({phase.duration})</Text>
          <Text style={styles.phaseDescription}>{phase.phase_description}</Text>
          <Text style={styles.medicineSubHeader}>Medicines:</Text>
          {phase.medicines.map((medicine) => (
            <View key={medicine.medicine_id} style={styles.medicineContainer}>
              <Text style={styles.medicineName}>{medicine.medicine_name}</Text>
              <Text style={styles.medicineText}>Usage: {medicine.usage}</Text>
              <Text style={styles.medicineText}>Dosage: {medicine.dosage}</Text>
              <Text style={styles.medicineText}>Frequency: {medicine.frequency}</Text>
              <Text style={styles.medicineText}>Duration: {medicine.duration}</Text>
              <Text style={styles.medicineText}>Side Effects: {medicine.side_effects}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 12,
  },
  symptomContainer: {
    marginBottom: 4, // Add spacing between symptoms
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  imgContainer:{
    marginTop: 10,
    alignItems: 'center',
    // marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  symptomsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align items to the start
    marginBottom: 16,
  },
  medicineText:{
    fontSize: 16,
    color: '#555',
    // marginLeft: 8,
    marginBottom: 4,
  },

  symptomsList: {
    flex: 2, // Allow the list to take up available space
    marginLeft: 16, // Space between header and list
  },

  symptomText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
    marginBottom: 4, // Add spacing between symptoms
  },
  description: {
    textAlign: 'justify',
    fontSize: 18,
    marginBottom: 16,
    // fontWeight: '400',
    color: '#333',
  },
  image: {
    width: 350,
    height: 200, // Adjust height as needed
    borderRadius: 8, // Optional: Add rounded corners
    marginBottom: 15,
    // alignItems: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    flex: 1,
  },
  medicineSubHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 8,
    flex: 1,
  },
  phaseContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    // gap: 20,
  },
  phaseName: {
    fontSize: 18,
    textAlign:'center',
    fontWeight: 'bold',
  },
  phaseDuration: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  phaseDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  medicineContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: '#666',
    marginTop: 20,
  },
});

export default DiseaseDetailScreen;