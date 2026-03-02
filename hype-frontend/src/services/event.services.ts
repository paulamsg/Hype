import axios from "axios"; 
import { SERVER_URL } from "../config/config";
import type {Event, EventFilters} from "../types/event.types.ts";

export const getEvents = async ( filters:EventFilters ): Promise<Event[]> =>{
    const response = await axios.get(`${SERVER_URL}/events/`,{
        params: filters
    })
    return response.data;
}