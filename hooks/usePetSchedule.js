import React from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

const usePetSchedule = () => {
    const { userInfo } = useContext(AuthContext);
    const [schedules, setSchedules] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const getSchedulesOfUser = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/pet-schedule/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });

            setSchedules(response.data.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log('Error fetching schedules:', error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }


};

export default usePetSchedule;