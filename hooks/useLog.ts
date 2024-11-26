import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { AuthContext } from '../context/AuthContext';
import { useFocusEffect, useRoute } from "@react-navigation/native";

interface Log {
    log_id: string,
    pet_id: string,
    title: string,
    notes: string,
    date_time: string,
}


const useLog = () =>{
    const route = useRoute();
    const { petid } = route.params as { petid: string };

    const {userInfo} = useContext(AuthContext);
    const [logs, setLogs] = useState<Log[]>([]);
    const [logLoading, setLogLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused, fetching logs');
            getLogsbyPet(petid, 9999, 1);
        },[])
    );

    const getLogsbyPet = async (petid: any, pageSize: any, pageNum: any) => {
        setLogLoading(true);
        try {
            const response = await axios.get(`${API_URL}/pet/logs/${petid}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
                params: {
                    page: pageNum,
                    pageSize
                }
            });
            console.log(response.data);
            setLogs(response.data);
            setLogLoading(false);
        } catch (error) {
            console.log('Error fetching logs:', error);
            setLogLoading(false);
        } finally {
            setLogLoading(false);
        }
    };

    const createPetLog = async (data: any) => {
        setLogLoading(true);
        // console.log("Day la data ", data);
        // console.log(`${API_URL}/pet/logs`);
        try {
            const response = await axios.post(`${API_URL}/pet/logs`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setLogs(response.data);
            // console.log(response.data);
            setLogLoading(false);
        } catch (error) {
            console.log('Error creating log:', error);
            setLogLoading(false);
        }
        finally {
            setLogLoading(false);
        }
    }
    const updatePetLog = async (log_id: any, data: any) => {    
        setLogLoading(true);
        try {
            const response = await axios.put(`${API_URL}/pet/logs/${log_id}`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            // setLogs(response.data);
            // console.log(response.data);
            setLogLoading(false);
        } catch (error) {
            console.log('Error updating log:', error);
            setLogLoading(false);
        } finally {
            setLogLoading(false);
        }
    }
    const deletePetLog = async (log_id: any) => {
        setLogLoading(true);
        try {
            const response = await axios.delete(`${API_URL}/pet/logs/${log_id}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            // setLogs(response.data);
            // console.log(response.data);
            setLogLoading(false);
        } catch (error) {
            console.log('Error deleting log:', error);
            setLogLoading(false);
        } finally {
            setLogLoading(false);
        }
    }

    return {
        logs,
        logLoading,
        getLogsbyPet,
        createPetLog,
        deletePetLog, 
        updatePetLog
    }
}
export default useLog;