import { API_URL } from '@env';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';


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
      console.log(response.data);
      // const data = await response.data.json();
      // setUser(data); // Assuming response contains the user data
      // console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching user:', error);
      setIsLoading(false);
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
  };
};

export default useUser;
