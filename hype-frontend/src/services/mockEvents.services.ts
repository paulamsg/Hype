import axios from "axios"; 
import type {Event, EventFilters} from "../types/event.types.ts";

export const getMockEvents =  async ( filters:EventFilters ): Promise<Event[]> =>{
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/mock-events/`,{
        params: filters
    })
    return response.data.events;
}