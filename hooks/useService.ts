import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "@env";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';

interface Service {
    sêrvice_id: string,
    type_id: string,
    name: string,
    price: number,
    duration: number,
    description: string,
    isavailable: boolean
}
interface ServiceOverview {
    id: string,
    type_name: string,
    services: Service[]

}

const useService = () => {
    const { userInfo } = useContext(AuthContext);
    const [services, setServices] = useState<Service[]>([]);
    const [serviceLoading, setServiceLoading] = useState(false);
    const [serviceByType, setServiceByType] = useState<ServiceOverview[]>([]);

    const getServices = async () => {
        setServiceLoading(true);
        try {
            const response = await axios.get(`${API_URL}/service/list`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            const data = response.data;
            console.log("Service response:",data);
            if (data !== null) {
                const servicesTypeData = data.map((service: ServiceOverview) => {
                    return {
                        type_id: service.id,
                        type_name: service.type_name,
                        services: service.services,
                    };
                });
                setServiceByType(servicesTypeData);
                const allServices = data.flatMap((service: { services: any; }) => service.services);
                console.log("All Services:", allServices);
                setServices(allServices);
                setServiceLoading(false);
            }
            else {
                console.log("No services found.");
                setServices([]);
                setServiceLoading(false);
            }
            
        } catch (error) {
            console.log('Error fetching services:', error);
            setServiceLoading(false);
        } finally {
            setServiceLoading(false);
        }
    };

    return {
        services,
        serviceLoading,
        serviceByType,
        getServices
    };

}
export default useService;

