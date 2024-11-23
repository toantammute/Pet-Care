import { API_URL } from '@env';
import axios from 'axios';
import React from 'react'
import { Alert } from 'react-native';


interface VerifyOTPResponse {
    success: boolean;
    message: string;
    data?: any;
  }
  
const useOTP = () => {
    const verifyOTP = async (secret_code: string, username: string): Promise<VerifyOTPResponse> => {
        try {
            const response = await axios.post(`${API_URL}/user/verify_email`, {
            secret_code,
            username,
            });
            
            return {
                success: true,
                message: 'OTP verified successfully',
                data: response.data,
                };
            } catch (error) {
                Alert.alert('Error', 'Invalid OTP');
            return {
                success: false,
                message: 'Failed to verify OTP',
            };
        }
    };

    // resend OTP
    const resendOTP = async (username: string): Promise<VerifyOTPResponse> => {
        try {
            const response = await axios.post(`${API_URL}/user/resend_otp`, {
            username,
            });
            Alert.alert('Success', 'OTP resent successfully');
            return {
                success: true,
                message: 'OTP resent successfully',
                data: response.data,
            };
        } catch (error) {
            Alert.alert('Error', 'Failed to resend OTP');
            return {
                success: false,
                message: 'Failed to resend OTP',
            };
        }
    };
    return { verifyOTP, resendOTP };

}

export default useOTP