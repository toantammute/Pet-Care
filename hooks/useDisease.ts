import React, { useContext } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

interface Disease {
    disease_id: number;
    disease_name: string;
    description: string;
    symptoms: string[];
    treatment_phases: TreatmentPhase[];
}

interface TreatmentPhase {
    phase_id: number;
    phase_number: number;
    phase_name: string;
    duration: string;
    phase_description: string;
    phase_notes: string;
    medicines: Medicine[];
}

interface Medicine {
    medicine_id: number;
    medicine_name: string;
    usage: string;
    dosage: string;
    frequency: string;
    duration: string;
    side_effects: string;
}

const useDisease = () => {
    const [diseases, setDiseases] = React.useState<Disease[]>([]);
    const [diseaseLoading, setDiseaseLoading] = React.useState(false);
    const {userInfo} = useContext(AuthContext);
    const [disease, setDisease] = React.useState<Disease | null>(null);
    const [treatmentPhases, setTreatmentPhases] = React.useState<TreatmentPhase[]>([]);
    const [medicines, setMedicines] = React.useState<Medicine[]>([]);
    const [treatmentPhase, setTreatmentPhase] = React.useState<TreatmentPhase | null>(null);
    const [medicine, setMedicine] = React.useState<Medicine | null>(null);

    const getDiseases = async () => {
        console.log(`${API_URL}/disease/`)
        setDiseaseLoading(true);
        try {
            const response = await axios.get(`${API_URL}/disease/`,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log('Diseases:', response.data.data);
            setDiseases(response.data.data);
            setDiseaseLoading(false);
        } catch (error) {
            console.log('Error fetching diseases:', error);
            setDiseaseLoading(false);
        } finally {
            setDiseaseLoading(false);
        }
    };
    const getTreatmentbyDisease = async (disease_id: string) => {
        console.log(`${API_URL}/disease/treatment/${disease_id}`)
        setDiseaseLoading(true);
        try {
            const response = await axios.get(`${API_URL}/disease/treatment/${disease_id}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log('Diseases:', response.data.data);
            // const diseaseData = response.data.data;
            // setDisease(diseaseData);
            // setTreatmentPhases(diseaseData.treatment_phases);
            // setMedicines(diseaseData.treatment_phases[0].medicines);
            setDiseaseLoading(false);
        } catch (error) {
            console.log('Error fetching diseases:', error);
            setDiseaseLoading(false);
        } finally {
            setDiseaseLoading(false);
        }
    }

    return { diseases, diseaseLoading, getDiseases,getTreatmentbyDisease };
}
export default useDisease;