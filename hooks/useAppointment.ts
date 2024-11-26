import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { useContext, useState } from "react";
import { Alert } from "react-native";

interface Appointment {
    id: string,
    service_name: string,
    pet_name: string,
    notes: string,
    doctor_name: string,
    date: string,
    status: string,
}

const useAppointment = () =>{
    const {userInfo} = useContext(AuthContext);
    const [appointment, setAppointment] = useState<Appointment>();
    const [appointmentList, setAppointmentList] = useState<Appointment[]>([]);
    const [appointmentLoading, setAppointmentLoading] = useState(false);
    const [responseStatus, setResponseStatus] = useState<number>(0);

    const getAppointmentList = async () => {
        setAppointmentLoading(true);
        try {
            const response = await axios.get(`${API_URL}/appointment`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log('Get appointment response:', response.data.data);
            setAppointmentList(response.data.data);
            setAppointmentLoading(false);
        } catch (error) {
            console.log('Error fetching appointment:', error);
            setAppointmentLoading(false);
        } finally {
            setAppointmentLoading(false);
        }
    }

    const createAppointment = async (data: any) => {
        setAppointmentLoading(true);
        console.log("Day la data ", data);
        try {
            const response = await axios.post(`${API_URL}/appointment/create`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            // Alert.alert('Success', 'Appointment created successfully');
            // console.log('Create appointment response:', response.data);
            setAppointment(response.data.data);
            setResponseStatus(response.status);
            // console.log('Create appointment response:', responseStatus);
            setAppointmentLoading(false);
        } catch (error) {
            console.log('Error creating appointment:', error);
            setAppointmentLoading(false);
        }
        finally {
            setAppointmentLoading(false);
        }
    }
    return {
        createAppointment,
        getAppointmentList,
        responseStatus,
        appointment,
        appointmentList,
        appointmentLoading
    };
}
export default useAppointment;