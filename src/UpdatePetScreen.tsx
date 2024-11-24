import React from 'react'
import { View } from 'react-native'
import PetUpdateForm from '../components/pet/PetUpdateForm'

const UpdatePetScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <PetUpdateForm />
    </View>  )
}

export default UpdatePetScreen