import { API_URL } from "@env";
import axios from "axios";
import React, {useEffect, useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext";


const usePets = () => {
    const {userInfo} = useContext(AuthContext);
    const [pets, setPets] = useState([]);
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
            response.data.forEach(pet => console.log(pet.name));
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Get pets error:", error.response.data);
        }
        finally {
            setIsLoading(false);
        }
    };

    useEffect(() =>{
        getPets();
    },[]);

    return {
        pets,
        isLoading,
        getPets,
    };
};

export default usePets;