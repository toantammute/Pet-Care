import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';

// export interface ScheduleData {
//     title: string,
//     notes: string,
//     reminder_datetime: string,
//     event_repeat: string,
//     end_type: string,
//     end_date: string,
// }

const usePetSchedule = () => {
    const { userInfo } = useContext(AuthContext);
    const [schedules, setSchedules] = useState();
    const [petScheduleOverview, setPetScheduleOverview] = useState();
    const [scheduleLoading, setScheduleLoading] = useState(false);

    const getSchedulesOfUser = async () => {
        setScheduleLoading(true);
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({

            }));
            const response = await axios.get(`${API_URL}/pet-schedule/`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });

            setSchedules(response.data);
            // console.log(response.data);
            setScheduleLoading(false);
        } catch (error) {
            console.log('Error fetching schedules:', error);
            setScheduleLoading(false);
        } finally {
            setScheduleLoading(false);
        }
    };
    const createPetSchedule = async (data) => {
        setScheduleLoading(true);
        console.log("Day la data ",data);
        console.log(`${API_URL}/pet-schedule/pet/${data.petid}`);
        try {
            const response = await axios.post(`${API_URL}/pet-schedule/pet/${data.petid}`, data, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                }
            });
            setSchedules(response.data);
            console.log(response.data);
            setScheduleLoading(false);
        } catch (error) {
            console.log('Error creating schedule:', error);
            setScheduleLoading(false);
        } finally {
            setScheduleLoading(false);
        }
    }

    const getPetScheduleOverview = async (petid, pageSize, pageNum) => {
        setScheduleLoading(true);
        try {
            const response = await axios.get(`${API_URL}/pet-schedule/pet/${petid}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
                params: {
                    page: pageNum,
                    pageSize
                },
            });
            setPetScheduleOverview(response.data.data);
            console.log(response.data.data);
            setScheduleLoading(false);            
        } catch (error) {
            console.log('Error fetching pet schedule:', error);
            setScheduleLoading(false);
        } finally {
            setScheduleLoading(false);
        }

    };
    return {
        schedules,
        petScheduleOverview,
        scheduleLoading,
        getSchedulesOfUser,
        getPetScheduleOverview,
        createPetSchedule,
    };

};

export default usePetSchedule;