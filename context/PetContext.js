import React, {useEffect, useContext} from "react";
import { createContext, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const PetContext = createContext();

export const PetProvider = ({ children }) => {
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
            console.log(pets);
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

    return (
        <PetContext.Provider value={{
            pets,
            isLoading,
            getPets,
        }}>
            {children}
        </PetContext.Provider>
    );
};

