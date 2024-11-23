import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface Disease{
  disease_id: string;
  disease_name: string;
  description: string;
}

interface DiseaseCardProps{
  disease: Disease;
}

const DiseaseCard:React.FC<DiseaseCardProps> = ({disease}) => {
  return (
    <TouchableOpacity style={styles.container}>
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
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  diseaseName:{
    fontSize: 16,
    fontWeight: '400',
  }
})
export default DiseaseCard;