import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';
import { Alert } from 'react-native';

interface Cart{
    cart_id: string,
    id: string,
    product_id: string,
    product_name: string,
    quantity: number,
    total_price: number
}
interface Order{
    id: string,
    user_id: string,
    total_amount: number,
    payment_status: string,
    order_date: string,
    shipping_address: string,
    cart_items: Cart[]
}
interface CheckoutResponse{
    order_id: string,
    order_date: string,
    total_amount: number,
    payment_status: string
}
interface CartItem{
    id: string,
    cart_id: string,
    product_id: string,
    product_name: string,
    quantity: number,
    unit_price: number,
    total_price: number
}
interface CheckoutDetail{
    id: string,
    user_id: string,
    total_amount: number,
    payment_status: string,
    order_date: string,
    shipping_address: string,
    cart_items: CartItem[]
}

const useCart = () => {
    const { userInfo } = useContext(AuthContext);
    const [cart, setCart] = useState<Cart[]>([]);
    const [checkoutRes, setCheckoutRes] = useState<CheckoutResponse>();
    const [cartLoading, setcartLoading] = useState(false);
    const [CheckoutDetail, setCheckoutDetail] = useState<CheckoutDetail>();
    const [error, setError] = useState('');

    const getCart = async () => {
        setcartLoading(true);
        try {
            const res = await axios.get(`${API_URL}/cart/`,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            setcartLoading(false);
            setCart(res.data.data);
            console.log(res.data);
        } catch (error) {
            setcartLoading(false);
            console.log(error);
        }
        
    }

    const addToCart = async (product_id: string, quantity: number) => {
        setcartLoading(true);
        try {
            const res = await axios.post(`${API_URL}/cart/`,{
                product_id,
                quantity
            },{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            setcartLoading(false);
            console.log(res.data);
            Alert.alert('Success', 'Product added to cart');
        } catch (error) {
            setcartLoading(false);
            console.log(error);
        }
        
    }

    const deleteItem = async (id: string) => {
        setcartLoading(true);
        try {
            const res = await axios.delete(`${API_URL}/cart/product/${id}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            setcartLoading(false);
            console.log(res.data);
            Alert.alert('Success', 'Product removed from cart');
        } catch (error) {
            setcartLoading(false);
            console.log(error);
        }
    }
    const checkout = async (shipping_address:String, notes: String) => {
        setcartLoading(true);
        try {
            const res = await axios.post(`${API_URL}/cart/order/`,{
                shipping_address,
                notes,
            },{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            setCheckoutRes(res.data.data);
            setcartLoading(false);
            console.log(res.data.data.order_id);
            Alert.alert('Success', 'Order placed successfully');
            return res.data.data;
        } catch (error) {
            setcartLoading(false);
            console.log(error);
        }

    }
    const getCheckoutDetail = async (order_id: string) => {
        setcartLoading(true);
        try {
            const res = await axios.get(`${API_URL}/cart/order/${order_id}`,{
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`
                }
            });
            setCheckoutDetail(res.data.data);
            setcartLoading(false);
            console.log(res.data);
        } catch (error) {
            setcartLoading(false);
            console.log(error);
        }
    }
    return { cart, cartLoading, checkoutRes,CheckoutDetail, getCart, addToCart, deleteItem,checkout, getCheckoutDetail }
}
export default useCart
