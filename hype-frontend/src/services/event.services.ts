import axios from "axios"; 
import type {Event, EventFilters} from "../types/event.types.ts";

export const getEvents = async ( filters:EventFilters ): Promise<Event[]> =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events/`,{
        params: filters
    })
    return response.data.events;
}

export const getMocksEvents =  async ( filters:EventFilters ): Promise<Event[]> =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events/mock`,{
        params: filters
    })
    return response.data.events;
}