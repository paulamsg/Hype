import axios from "axios"; 
import type { Event } from "../types/event.types";
import type { Folder } from "../types/folder.types";


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
    return response.data
}

export const getSavedEvents = async () =>{
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/savedEvents/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;
}
export const updateEventFolder = async (event:Event, folder:Folder) =>{
    const token = localStorage.getItem("token");
    const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_URL}/savedEvents/${event.id}/folder`,
        {folder},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;
}