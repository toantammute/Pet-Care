import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from "react";

interface Doctor{
    id: string,
    specialization: string,
    name: string,
    years_of_exp: string,
    education: string,
    certificate: string,
    bio: string
}
const useDoctors = () =>{
    const {userInfo} = useContext(AuthContext);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorsLoading, setDoctorsLoading] = useState(false);
    const getDoctors = async () => {
        setDoctorsLoading(true);
        try {
            const response = await axios.get(`${API_URL}/user/doctors`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            // console.log('Get doctors response:', response.data.data);
            setDoctors(response.data.data);
            setDoctorsLoading(false);
        } catch (error) {
            console.log('Error getting doctors:', error);
            setDoctorsLoading(false);
        }
        finally {
            setDoctorsLoading(false);
        }
    }
    return {getDoctors, doctors, doctorsLoading};
}
export default useDoctors;