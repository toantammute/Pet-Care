import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';

interface PaymentData {
    accountNo: string;
    accountName: string;
    acqId: string;
    amount: number;
    addInfo: string;
    format: string;
    template: string;
    order_id: number;
}
interface PaymentResponse {
    acpId: string;
    accountName: string;
    qrCode: string;
    qrDataURL: string;
}

const usePayment = () => {
    const { userInfo } = useContext(AuthContext);
    const [paymentRes, setPaymentRes] = useState<PaymentResponse>();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [error, setError] = useState('');

    const makePayment = async (data:PaymentData) => {
        setPaymentLoading(true);
        try {
            const res = await axios.post(`${API_URL}/vietqr/generate-qr`, data,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            // console.log('Payment response:', res.data.data);
            setPaymentRes(res.data.data);
            setPaymentLoading(false);
            return res.data.data;
        } catch (error) {
            // setError(error);
            setPaymentLoading(false);
        }
    }

    return { makePayment, paymentRes, paymentLoading, error };
}
export default usePayment;