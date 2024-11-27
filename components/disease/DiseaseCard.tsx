import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

interface Disease{
  disease_id: string;
  disease_name: string;
  description: string;
}

interface DiseaseCardProps{
  disease: Disease;
}

const DiseaseCard:React.FC<DiseaseCardProps> = ({disease}) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    console.log(disease.disease_id);
    navigation.navigate('DiseaseDetailScreen', {disease_id: disease.disease_id});
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.diseaseName}>{disease.disease_name}</Text>
      <AntDesign name="right" size={20} color="#666" />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  diseaseName:{
    fontSize: 16,
    fontWeight: '500',

  }
})
export default DiseaseCard;