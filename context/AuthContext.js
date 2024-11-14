import React, {useEffect} from "react";
import { createContext, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const Register = async (email, password, full_name, username) => {
        setIsLoading(true);
        axios.post(`${API_URL}/user/create`, {
            full_name,
            username,
            password,
            email,
        })
        .then((response) => {
            
            const userInfo = response.data.data;
            // setUserInfo(userInfo);
            // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            console.log(userInfo);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Register error:", error.response.data);
            setIsLoading(false);
        });
    };

    const Login = async (email, password, full_name, username) => {
        setIsLoading(true);
        axios.post(`${API_URL}/user/login`, {
            username,
            password
        })
        .then(response => {
            const userInfo = response.data.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
            console.log(userInfo);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Login error:", error.response.data);
            setIsLoading(false);
        });
    };

    const Logout = async () => {
        setIsLoading(true);
        axios.post(`${API_URL}/user/logout`,
            {},
            {
                headers: {Authorization: `Bearer ${userInfo.access_token}`,},
            },
        ).then(res => {
            console.log(res.data);
            AsyncStorage.removeItem("userInfo");
            setUserInfo({});
            setIsLoading(false);
        }).catch(error => {
            console.error("Logout error:", error.response.data);
            setIsLoading(false);
        });
    };

    const isLoggedIn = async () => {
        try{
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem("userInfo");
            userInfo = JSON.parse(userInfo);
            if(userInfo){
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        }
        catch(error){
            setSplashLoading(false);
            console.log(`Is logged in error ${error}`);
        }
            
    };
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoading,
            userInfo,
            splashLoading,
            Register,
            Login,
            Logout,
            }}>
            {children}
        </AuthContext.Provider>
    )

}