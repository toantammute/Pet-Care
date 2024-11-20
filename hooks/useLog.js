import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';

const useLog = () =>{
    const {userInfo} = useContext(AuthContext);
    const [logs, setLogs] = useState();
    const [logLoading, setLogLoading] = useState(false);

    const getLogsbyPet = async (petid, pageSize, pageNum) => {
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
    return {
        logs,
        logLoading,
        getLogsbyPet
    }
}
export default useLog;