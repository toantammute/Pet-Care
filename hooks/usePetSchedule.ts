import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from '../context/AuthContext';

interface Schedule {
    id: string,
    pet_id: string,
    title: string,
    notes: string,
    reminder_datetime: string,
    is_active: boolean,
    event_repeat: string,
    end_type: boolean,
    end_date: string | null,
}

interface PetSchedule {
    pet_id: string;
    pet_name: string;
    schedules: Schedule[];
}

const usePetSchedule = () => {
    const { userInfo } = useContext(AuthContext);
    const [petSchedules, setPetSchedules] = useState<PetSchedule[]>([]);
    const [schedules, setSchedules] = useState<Schedule[]>([]);
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

            const data = response.data.data;
            console.log("Data:", data);
            if (data !== null) {
                // Log schedules of each pet and store them in petSchedules
                const petSchedulesData = data.map((pet: { pet_id: any; pet_name: any; schedules: any; }) => {
                    // console.log(`Schedules for ${pet.pet_name}:`, pet.schedules);
                    return {
                        pet_id: pet.pet_id,
                        pet_name: pet.pet_name,
                        schedules: pet.schedules,
                    };
                });

                setPetSchedules(petSchedulesData);

                // Flatten the schedules array and set it to the state
                const allSchedules = data.flatMap((pet: { schedules: any; }) => pet.schedules);
                console.log("All Schedules:", allSchedules);
                setSchedules(allSchedules);
            } else {
                console.log("No pets found.");
                setSchedules([]);
                setPetSchedules([]);

            }

            setScheduleLoading(false);
        } catch (error) {
            console.log('Error fetching schedules by User:', error);
            setScheduleLoading(false);
        }
    };
    const createPetSchedule = async (data: { petid: any; }) => {
        setScheduleLoading(true);
        console.log("Day la data ", data);
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

    const getPetScheduleOverview = async (petid: any, pageSize: any, pageNum: any) => {
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
            console.log('Error fetching pet schedule by Pet:', error);
            setScheduleLoading(false);
        } finally {
            setScheduleLoading(false);
        }

    };
    const updateActivePetSchedule = async (schedule_id: any, is_active: any) => {
        // console.log("Day la schedule_id", schedule_id);
        // console.log("Day la is_active", is_active);
        // console.log("Day la userInfo", userInfo.access_token);
        setScheduleLoading(true);
        axios.put(`${API_URL}/pet-schedule/active/${schedule_id}`, {
            is_active
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.access_token}`,
            }
        }).then(response => {
            setSchedules(response.data);
            console.log("Active", response.data);
            setScheduleLoading(false);
        }).catch(error => {
            console.log('Error updating schedule:', error.response.data);
            setScheduleLoading(false);
        });
    }
    return {
        schedules,
        petScheduleOverview,
        scheduleLoading,
        petSchedules,
        getSchedulesOfUser,
        getPetScheduleOverview,
        createPetSchedule,
        updateActivePetSchedule,
    };

};

export default usePetSchedule;