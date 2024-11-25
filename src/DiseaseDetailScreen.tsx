// import { View, Text } from 'react-native'
// import React, { useCallback } from 'react'
// import { useFocusEffect, useRoute } from '@react-navigation/native';
// import useDisease from '../hooks/useDisease';

// export default function DiseaseDetailScreen() {
//   const route = useRoute();
//   const { disease_id } = route.params as { disease_id: string };
//   console.log(disease_id);
//   const { diseases, diseaseLoading, getTreatmentbyDisease } = useDisease();
//   useFocusEffect(
//     useCallback(() => {
//       getTreatmentbyDisease(disease_id);
//     }, [])
//   )
//   return (
//     <View>
//       <Text>DiseaseDetailScreen</Text>
//     </View>
//   )
// }

//------------------------------------------------------------------------------------------------


// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import { AuthContext } from '../context/AuthContext';

// interface Medicine {
//   medicine_id: number;
//   medicine_name: string;
//   usage: string;
//   dosage: string;
//   frequency: string;
//   duration: string;
//   side_effects: string;
// }

// interface TreatmentPhase {
//   phase_id: number;
//   phase_number: number;
//   phase_name: string;
//   duration: string;
//   phase_description: string;
//   phase_notes: string;
//   medicines: Medicine[];
// }

// interface Disease {
//   disease_id: number;
//   disease_name: string;
//   description: string;
//   symptoms: string[];
//   treatment_phases: TreatmentPhase[];
// }

// const DiseaseDetailScreen = () => {
//   const route = useRoute();
//   const { disease_id } = route.params as { disease_id: string };
//   const [diseaseData, setDiseaseData] = useState<Disease | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const { userInfo } = useContext(AuthContext);

//   const fetchDiseaseData = async () => {
//     try {
//       // const token = await AsyncStorage.getItem('userToken'); // Retrieve the token from AsyncStorage
//       const response = await axios.get(`http://172.22.79.164:8088/api/v1/disease/treatment/${disease_id}`, {
//         headers: {
//           Authorization: `Bearer ${userInfo.access_token}`, // Include the Bearer token in the headers
//         },
//       });
//       console.log('Disease data:', response.data.data);
//       setDiseaseData(response.data.data[0]); // Adjust based on your API response structure
//     } catch (error) {
//       console.error('Error fetching disease data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDiseaseData();
//   }, []);

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   if (!diseaseData) {
//     return <Text>No data found.</Text>;
//   }


//   return (
//     <View>
//       <Text>Disease Name: {diseaseData.disease_name}</Text>
//       <Text>Description: {diseaseData.description}</Text>
//       <Text>Symptoms:</Text>
//       {diseaseData.symptoms.map((symptom, index) => (
//         <Text key={index}>- {symptom}</Text>
//       ))}
//       <Text>Treatment Phases:</Text>
//       {diseaseData.treatment_phases.map((phase) => (
//         <View key={phase.phase_id}>
//           <Text>Phase Name: {phase.phase_name}</Text>
//           <Text>Duration: {phase.duration}</Text>
//           <Text>Description: {phase.phase_description}</Text>
//           <Text>Medicines:</Text>
//           {phase.medicines.map((medicine) => (
//             <View key={medicine.medicine_id}>
//               <Text>Medicine Name: {medicine.medicine_name}</Text>
//               <Text>Usage: {medicine.usage}</Text>
//               <Text>Dosage: {medicine.dosage}</Text>
//               <Text>Frequency: {medicine.frequency}</Text>
//               <Text>Duration: {medicine.duration}</Text>
//               <Text>Side Effects: {medicine.side_effects}</Text>
//             </View>
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// export default DiseaseDetailScreen;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

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
      <Text style={styles.header}>Disease Name: {diseaseData.disease_name}</Text>
      <Text style={styles.description}>Description: {diseaseData.description}</Text>
      <Text style={styles.subHeader}>Symptoms:</Text>
      {diseaseData.symptoms.map((symptom, index) => (
        <Text key={index} style={styles.symptomText}>- {symptom}</Text>
      ))}
      <Text style={styles.subHeader}>Treatment Phases:</Text>
      {diseaseData.treatment_phases.map((phase) => (
        <View key={phase.phase_id} style={styles.phaseContainer}>
          <Text style={styles.phaseName}>Phase Name: {phase.phase_name}</Text>
          <Text style={styles.phaseDuration}>Duration: {phase.duration}</Text>
          <Text style={styles.phaseDescription}>Description: {phase.phase_description}</Text>
          <Text style={styles.subHeader}>Medicines:</Text>
          {phase.medicines.map((medicine) => (
            <View key={medicine.medicine_id} style={styles.medicineContainer}>
              <Text style={styles.medicineName}>Medicine Name: {medicine.medicine_name}</Text>
              <Text>Usage: {medicine.usage}</Text>
              <Text>Dosage: {medicine.dosage}</Text>
              <Text>Frequency: {medicine.frequency}</Text>
              <Text>Duration: {medicine.duration}</Text>
              <Text>Side Effects: {medicine.side_effects}</Text>
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
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  symptomText: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  phaseContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  phaseName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  phaseDuration: {
    fontSize: 16,
    color: '#777',
  },
  phaseDescription: {
    fontSize: 16,
    marginBottom: 8,
  },
  medicineContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 5,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default DiseaseDetailScreen;