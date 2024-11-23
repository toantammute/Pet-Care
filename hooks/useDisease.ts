import React, { useContext } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

interface Disease {
    disease_id: string,
    disease_name: string,
    description: string,
}

const useDisease = () => {
    const [diseases, setDiseases] = React.useState<Disease[]>([]);
    const [diseaseLoading, setDiseaseLoading] = React.useState(false);
    const {userInfo} = useContext(AuthContext);

    const getDiseases = async () => {
        console.log(`${API_URL}/dicease/`)
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

    return { diseases, diseaseLoading, getDiseases };
}
export default useDisease;