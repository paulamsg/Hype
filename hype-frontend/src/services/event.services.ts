import axios from "axios"; 
import { SERVER_URL } from "../config/config";
import type {Event} from "../types/event.types.ts";

export const getEvents = async (): Promise<Event[]> =>{
    const response = await axios.get(`${SERVER_URL}/events/`)
    return response.data;
}