import axios from "axios"; 
import type { Event } from "../types/event.types";


export const saveEvent = async (event: Event) => {
    const token = localStorage.getItem("token")
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/savedEvents/save`,
        { eventId: event.id, eventDate: event.date },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log("guardado:", response.data)
    return response.data
}
export const deleteEvent = async (event: Event) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/savedEvents/${event.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    console.log("eliminado:", response.data)
    return response.data
}

export const getSavedEvents = async (userId: Event) =>{
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/savedEvents/${userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;

}