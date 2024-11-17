import React, { useState } from 'react'
import { ScrollView, View } from 'react-native';
import { Alert } from 'react-native';
import useCreatePet, { PetData } from '../../hooks/useCreatePet';
import { Text } from 'react-native';
import AddPetForm from '../../components/pet/NewPet';



  const AddPetScreen: React.FC = () => {
    const { createPet, isLoading, error, responseData } = useCreatePet();

    const handleFormSubmit = async (data: any, imageFile: any) => {
        if (!imageFile) {
            Alert.alert('Error', 'Please select an image.');
            return;
        }

        try {
            await createPet(data, imageFile); // Gọi hàm createPet với dữ liệu form và ảnh
        } catch (err) {
            console.error('Error creating pet:', err);
        }
    };


    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Add New Pet</Text>

            <AddPetForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
                error={error}
            />
            
            {responseData && (
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 18, color: 'green' }}>Pet Created Successfully!</Text>
                    <Text>Name: {responseData.name}</Text>
                    <Text>Type: {responseData.type}</Text>
                    <Text>Breed: {responseData.breed}</Text>
                    Display more pet details as needed
            </View> )} 


        </ScrollView>
    );
  };

  export default AddPetScreen;