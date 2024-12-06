import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { API_URL } from '@env';

interface Product {
    product_id: string,
    name: string,
    price: number,
    stock: number,
    data_image: string,
}

const useProduct = () => {
    const { userInfo } = useContext(AuthContext);
    const [products, setProducts] = useState<Product[]>([]);
    const [productLoading, setProductLoading] = useState(false);

    const getProducts = async () => {
        setProductLoading(true);
        try {
            const response = await axios.get(`${API_URL}/products`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            console.log(response.data);
            setProducts(response.data);
            setProductLoading(false);
        } catch (error) {
            console.log('Error fetching products:', error);
            setProductLoading(false);
        } finally {
            setProductLoading(false);
        }
    };

    // const createProduct = async (data: any) => {
    //     setProductLoading(true);
    //     try {
    //         const response = await axios.post(`${API_URL}/products`, data, {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.access_token}`,
    //             }
    //         });
    //         console.log(response.data);
    //         setProductLoading(false);
    //     } catch (error) {
    //         console.log('Error creating product:', error);
    //         setProductLoading(false);
    //     } finally {
    //         setProductLoading(false);
    //     }
    // };

    // const updateProduct = async (data: any) => {
    //     setProductLoading(true);
    //     try {
    //         const response = await axios.put(`${API_URL}/products/${data.product_id}`, data, {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.access_token}`,
    //             }
    //         });
    //         console.log(response.data);
    //         setProductLoading(false);
    //     } catch (error) {
    //         console.log('Error updating product:', error);
    //         setProductLoading(false);
    //     } finally {
    //         setProductLoading(false);
    //     }
    // };

    // const deleteProduct = async (product_id: string) => {
    //     setProductLoading(true);
    //     try {
    //         const response = await axios.delete(`${API_URL}/products/${product_id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${userInfo.access_token}`,
    //             }
    //         });
    //         console.log(response.data);
    //         setProductLoading(false);
    //     } catch (error) {
    //         console.log('Error deleting product:', error);
    //         setProductLoading(false);
    //     } finally {
    //         setProductLoading(false);
    //     }
    // };

    return { products, productLoading, getProducts };
}
export default useProduct