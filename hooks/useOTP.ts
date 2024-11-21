import { API_URL } from '@env';
import axios from 'axios';
import React from 'react'


interface VerifyOTPResponse {
    success: boolean;
    message: string;
    data?: any;
  }
  

const useOTP = () => {
    const verifyOTP = async (otp: string, username: string): Promise<VerifyOTPResponse> => {
        try {

            // convert the otp to integer 64
            const otpInt = parseInt(otp, 10);

            const response = await axios.post(`${API_URL}/user/verify_email`, {
            otp: otpInt,
            username,
            });

            return {
                success: true,
                message: 'OTP verified successfully',
                data: response.data,
                };
            } catch (error) {
                console.error('Error verifying OTP');
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

            return {
                success: true,
                message: 'OTP resent successfully',
                data: response.data,
            };
        } catch (error) {
            console.error('Error resending OTP');
            return {
                success: false,
                message: 'Failed to resend OTP',
            };
        }
    };
    return { verifyOTP, resendOTP };

}

export default useOTP