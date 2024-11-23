import { API_URL } from '@env';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { ImageFile } from './useCreatePet';


interface UpdateData {
  username?: string;
  full_name?: string;
  email?: string;
  phone_number?: string;
  address?: string;
}

const useUser = () => {

  const { userInfo } = useContext(AuthContext);  // Fallback value
  const [user, setUser] = useState();  // Ensure initial state is null
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {    
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`, // Send the token for authentication
        }
      });

      setUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching user:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };


  const updateUser = async (updateData: UpdateData) => {
    setIsLoading(true);
    try {
      // Prepare the request payload
      const payload = {
        username: updateData.username,
        full_name: updateData.full_name,
        email: updateData.email,
        phone_number: updateData.phone_number,
        address: updateData.address,
      };

      const response = await axios.put(`${API_URL}/user/`, payload, {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      // Update local user state with the updated data
      setUser(response.data.data);
      console.log('User updated successfully:', response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating user:', error.response?.data || error.message);
      } else {
        console.error('Error updating user:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserAvater = async (imageFile: ImageFile) => {
    setIsLoading(true);
    try {

      const formData = new FormData();

      if (imageFile) {
        formData.append('image', {
            uri: imageFile.uri.startsWith('file://') ? imageFile.uri : `file://${imageFile.uri}`, // Ensure proper URI format
            name: imageFile.name,
            type: imageFile.type,
        });
      }
  

      const response = await axios.put(`${API_URL}/user/avatar`, formData, {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`,
          'Content-Type': 'application/json',
        },
      });

      // Update local user state with the updated data
      setUser(response.data.data);
      console.log('User updated successfully:', response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating user:', error.response?.data || error.message);
      } else {
        console.error('Error updating user:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return {
    user,
    isLoading,
    getUser,
    updateUser,
  };
};

export default useUser;
