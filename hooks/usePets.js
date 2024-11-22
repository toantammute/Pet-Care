import { API_URL } from "@env";
import axios from "axios";
import React, {useEffect, useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext";


const usePets = () => {
    const {userInfo} = useContext(AuthContext);
    const [pets, setPets] = useState([]);
    const [petDetails, setPetDetails] = useState();
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
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error("Get pets error:", error.response.data);
        }
        finally {
            setIsLoading(false);
        }
    };
    const getPetDetails = async (petid) => {
        setIsLoading(true);
        try {
            
            const response = await axios.get(`${API_URL}/pet/${petid}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setIsLoading(false);
            setPetDetails(response.data);
        } catch (error) {
            setIsLoading(false);
            console.error("Get pet details error:", error.response.data);
        }
        finally {
            setIsLoading(false);
        }
    };

    // useEffect(() =>{
    //     getPets();
    // },[]);
    
    // useEffect(() =>{
    //     getPetDetails();
    // },[petid]);

    return {
        pets,
        petDetails,
        isLoading,
        getPets,
        getPetDetails
    };
};

export default usePets;