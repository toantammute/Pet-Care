import React, {useEffect} from "react";
import { createContext, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { Alert, Platform } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    console.log(API_URL);

    const Register = async (email, password, full_name, username, image) => {
        try {
            setIsLoading(true);
            // Tạo FormData
            const formData = new FormData();

            // Thêm dữ liệu người dùng vào FormData
            formData.append('full_name', full_name);
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);

            // Thêm dữ liệu JSON nếu cần
            const userData = {
                username,
                password,
                full_name,
                email,
            };
            formData.append('data', JSON.stringify(userData));

            if (image) {
                formData.append('image', {
                    uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
                    type: 'image/jpeg',
                    name: 'image.jpg'
                });
            }

            console.log(formData);
            
            const response = await axios.post(`${API_URL}/user/create`, formData, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (!response.data?.data) {
                throw new Error('Invalid response data');
              }
          
              setIsLoading(false);
              Alert.alert('Success', 'Registration successful');
              return response.data.data;
        } catch (error) {
            console.log('Error details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config // This will show what was sent to server
              });
            throw error;
        }
    };

    const Login = async (username,password) => {
        setIsLoading(true);
        //Token device
        const deviceToken = await messaging().getToken();
        console.log(deviceToken);
        axios.post(`${API_URL}/user/login`, {
            username,
            password,
            token: deviceToken,
            device_type: 'android'
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
        const deviceToken = await messaging().getToken();
        axios.post(`${API_URL}/user/logout`,null,
            {
                params: {token: deviceToken},
                headers: {Authorization: `Bearer ${userInfo.access_token}`,},
            }
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