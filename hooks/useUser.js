import {API_URL} from '@env';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from 'react';
const useUser = () => {
    
    const { userInfo } = useContext(AuthContext) ;  // Fallback value
    const [user, setUser] = useState<User | null>(null);  // Ensure initial state is null
    const [isLoading, setIsLoading] = useState(true);

    console.log(userInfo.access_token)

    const getUser = async () => {
      
    try {
      setIsLoading(true);
        const response = await axios.get(`${API_URL}/user/`, {
        headers: {
          Authorization: `Bearer ${userInfo.access_token}`, // Send the token for authentication
        },
        });
        const data = await response.json();
        setUser(data); // Assuming response contains the user data

    } catch (error) {
      console.error('Error fetching user:', error);
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
