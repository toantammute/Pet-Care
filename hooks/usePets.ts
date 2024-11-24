import { API_URL } from "@env";
import axios, { formToJSON } from "axios";
import React, {useEffect, useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import { Alert } from "react-native";
import { ImageFile } from "./useCreatePet";


interface UpdatePetRequest {
    name?: string;
    type?: string;
    breed?: string;
    age?: number;
    weight?: number;
    gender?: string;
    healthnotes?: string;
    birth_date?: string;
    microchip_number?: string;
  }

const usePets = () => {
    const {userInfo} = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [petDetails, setPetDetails] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getPets = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/pet/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setPets(response.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                console.error("Get pets error:", error.response.data);
            } else {
                console.error("Get pets error:", error);
            }
        }
        finally {
            setIsLoading(false);
        }
    };
    const getPetDetails = async (petid: string) => {
        setIsLoading(true);
        try {
            
            const response = await axios.get(`${API_URL}/pet/${petid}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setIsLoading(false);
            setPetDetails(response.data);
        } catch (error) {
            setIsLoading(false);
            Alert.alert("Error", "Failed to fetch pet details. Please try again later.");
            if (axios.isAxiosError(error) && error.response) {
                console.error("Get pet details error:", error.response.data);
            } else {
                console.error("Get pet details error:", error);
            }
        }
        finally {
            setIsLoading(false);
        }
    };


    // update pet
    const updatePet = async (petId: string, updateData: UpdatePetRequest) => {
        setIsLoading(true);
        console.log("petId", petId);

        try {
            
            const response = await axios.put(`${API_URL}/pet/${petId}`, updateData, {
                headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                'Content-Type': 'application/json',
                },
            });
            setPetDetails(response.data);
            
            Alert.alert('Success', 'Pet details updated successfully!');
            setIsLoading(false);
        } catch (error) {
          Alert.alert("Error", "Failed to update pet details. Please try again later.");
          if (axios.isAxiosError(error) && error.response) {
            console.error("Update pet error:", error.response.data);
          } else {
            console.error("Update pet error:", error);
          }
        } finally {
          setIsLoading(false);
        }
    };

    // update pet
    const updatePetAvatar = async (petid: string, imageFile: ImageFile | null) => {
        setIsLoading(true);
        console.log("petId", petid);

        try {
            const formData = new FormData();

            if (imageFile) {
              formData.append('image', {
                  uri: imageFile.uri.startsWith('file://') ? imageFile.uri : `file://${imageFile.uri}`, // Ensure proper URI format
                  name: imageFile.name,
                  type: imageFile.type,
              });
            }
        
      
              await axios.put(`${API_URL}/pet/avatar/${petid}`, formData, {
              headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
                'Content-Type': 'multipart/form-data',
      
              },
            });
                  
            Alert.alert('Success', 'Avatar updated successfully!');
            setIsLoading(false);
        } catch (error) {
          Alert.alert("Error", "Failed to update avatar. Please try again later.");
          if (axios.isAxiosError(error) && error.response) {
            console.error("Update pet error:", error.response.data);
          } else {
            console.error("Update pet error:", error);
          }
        } finally {
          setIsLoading(false);
        }
      };

    return {
        pets,
        petDetails,
        isLoading,
        getPets,
        getPetDetails,
        updatePet,
        updatePetAvatar
    };
};

export default usePets;