import React, { useEffect, useContext, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

interface Vaccination {
    vaccination_id: string,
    pet_id: string,
    vaccine_name: string,
    date_administered: string,
    next_due_date: string,
    vaccine_provider: string,
    batch_number: string,
    notes: string,
}

const useVaccination = () => {
    const { userInfo } = useContext(AuthContext);
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
    const [vaccinationLoading, setVaccinationLoading] = useState(false);
    const [vaccination, setVaccination] = useState<Vaccination | null>(null);

    // useEffect(() => {
    //     console.log('Fetching vaccinations');
    //     getVaccinations();
    // },[]);

    const getVaccinationsByPet = async (petid: any) => {
        setVaccinationLoading(true);
        try {
            const response = await axios.get(`${API_URL}/vaccination/pet/${petid}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log('Vaccinations:', response.data);
            setVaccinations(response.data);
            setVaccinationLoading(false);
        } catch (error) {
            console.log('Error fetching vaccinations:', error);
            setVaccinationLoading(false);
        } finally {
            setVaccinationLoading(false);
        }
    };

    const createVaccination = async (data: any): Promise<{
        error: any; success: boolean, message?: string
    }> => {
        setVaccinationLoading(true);
        try {
            const response = await axios.post(`${API_URL}/vaccination/create`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setVaccinations(response.data);
            console.log('Vaccination created:', response.data);
            setVaccinationLoading(false);
            return { error: null, success: true, message: 'Vaccination created successfully' };
        } catch (error) {
            console.log('Error creating vaccination:', error);
            setVaccinationLoading(false);
            return { error, success: false, message: 'Error creating vaccination' };
        } finally {
            setVaccinationLoading(false);
        }
    };
    const getVaccinationDetail = async (vaccination_id:String) => {
        setVaccinationLoading(true);
        try {
            const response = await axios.get(`${API_URL}/vaccination/${vaccination_id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log('Vaccination:', response.data);
            setVaccination(response.data);
            setVaccinationLoading(false);
        } catch (error) {
            console.log('Error fetching vaccination:', error);
            setVaccinationLoading(false);
        } finally {
            setVaccinationLoading(false);
        }
    }

    return {
        vaccinations,
        vaccinationLoading,
        vaccination,
        getVaccinationsByPet,
        createVaccination,
        getVaccinationDetail
    };
}
export default useVaccination;