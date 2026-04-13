import axios from "axios"; 
import type { Photo } from '../types/photo.types';

export const postPhoto = async ({ url, savedEventId }: { url: string; savedEventId: string | number }): Promise<Photo> => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/photos/`,
        { url: url, savedEventId: savedEventId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;
}

export const getPhotosByUser = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/photos/`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data;
}

export const deletePhoto = async (photo: Photo) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/photos/${photo.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    return response.data
}