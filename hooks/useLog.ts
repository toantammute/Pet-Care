import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';

interface Log {
    log_id: string,
    petid: string,
    title: string,
    notes: string,
    date_time: string,
}


const useLog = () =>{
    const {userInfo} = useContext(AuthContext);
    const [logs, setLogs] = useState();
    const [logLoading, setLogLoading] = useState(false);

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
            // const logsData = response.data;
            // logsData.forEach(log => {
            //     console.log("Log Date:", log.log_id);
            //   });
            // console.log("Logs",response.data);
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
        console.log("Day la data ", data);
        console.log(`${API_URL}/pet/logs`);
        try {
            const response = await axios.post(`${API_URL}/pet/logs`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setLogs(response.data);
            console.log(response.data);
            setLogLoading(false);
        } catch (error) {
            console.log('Error creating log:', error);
            setLogLoading(false);
        }
        finally {
            setLogLoading(false);
        }
    }

    return {
        logs,
        logLoading,
        getLogsbyPet,
        createPetLog
    }
}
export default useLog;