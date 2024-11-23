import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';
import { Alert, Image, Platform } from 'react-native';


export interface PetData {
  name: string;
  type: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  healthnotes: string;
  birth_date: string;
  microchip_number: string;
//   image?: ImageFile; // Image is optional
}

export interface PetResponse {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  gender: string;
  healthnotes: string;
  birth_date: string;
  microchip_number: string;
  imageUrl?: string;
}
  
export type ImageFile = {
    uri: string;
    name: string;
    type: string;
};

const useCreatePet = () => {

    const { userInfo } = useContext(AuthContext); // Get user info from context (access token)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<PetResponse | null>(null);

    const createPet = async (petData: PetData, imageFile: ImageFile | null) => {
        setIsLoading(true);
        setError(null); // Reset error state
        try {
            const formData = new FormData();

            // Append the JSON data (pet info)
            formData.append('data', JSON.stringify({
                name: petData.name,
                type: petData.type,
                breed: petData.breed,
                age: parseInt(petData.age),
                weight: parseFloat(petData.weight),
                gender: petData.gender,
                healthnotes: petData.healthnotes,
                birth_date: petData.birth_date,
                microchip_number: petData.microchip_number,
            }));

            // Append the image file, if provided
            if (imageFile) {
                formData.append('image', {
                    uri: imageFile.uri.startsWith('file://') ? imageFile.uri : `file://${imageFile.uri}`, // Ensure proper URI format
                    name: imageFile.name,
                    type: imageFile.type,
                });
            }

            const response = await axios.post(`${API_URL}/pet/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${userInfo?.access_token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            console.log('Pet created:', response.data);
            setResponseData(response.data);
            setIsLoading(false);
            return response.data
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    }
    return {
        createPet,
        isLoading,
        error,
        responseData,
    };
}

export default useCreatePet;