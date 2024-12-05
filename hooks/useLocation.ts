import { API_URL } from "@env";
import axios from "axios";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { AuthContext } from '../context/AuthContext';

interface Geometry {
    location: {
        lat: number,
        lng: number
    }
}

interface Places {
    place_id: string,
    decription: string,
    reference: string,
    structured_formatting: string[],
    types: string[]
}

interface Location {
    place_id: string,
    name: string,
    formatted_address: string,
    geometry: Geometry,
}


const useLocation = () => {
    const { userInfo } = useContext(AuthContext);
    const [places, setPlaces] = useState<Places[]>([]);
    const [location, setLocation] = useState<Location | null>(null);
    const [placeLoading, setPlaceLoading] = useState(false);

    const getPlaceDetails = async (place_id: string) => {
        console.log("place_id", place_id);

        setPlaceLoading(true);
        try {
            const response = await axios.get(`${API_URL}/location/places/detail`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
                params: {
                    place_id
                }
            });
            setLocation(response.data.result);
            console.log("location trong hook ", location);
            setPlaceLoading(false);
        } catch (error) {
            console.log('Error fetching places:', error);
            setPlaceLoading(false);
        }
    }

    const getPlaces = async (input: string, location: string) => {
        setPlaceLoading(true);
        console.log("location trong hook", location);
        const url = `${API_URL}/location/places/autocomplete`;
        const params = {
            input,
            location,
        };
        console.log("params", params);
        const headers = {
            Authorization: `Bearer ${userInfo.access_token}`,
        };

        // Log the full URL with parameters
        const queryString = new URLSearchParams(params).toString();
        console.log(`API Request: ${url}?${queryString}`);
        try {
            const response = await axios.get(`${API_URL}/location/places/autocomplete`, {
                headers: {
                    Authorization: `Bearer ${userInfo.access_token}`,
                },
                params: {
                    input,
                    location
                }
            });
            console.log("location: ", response.data.predictions);
            setPlaces(response.data.predictions);
            setPlaceLoading(false);
        } catch (error) {
            console.log('Error fetching places:', error);
            setPlaceLoading(false);
        } finally {
            setPlaceLoading(false);
        }
    };

    return { getPlaces, getPlaceDetails, places, placeLoading, location };
}

export default useLocation;