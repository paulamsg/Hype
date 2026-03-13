import axios from "axios"; 
import type { AuthResponse, LoginForm, RegisterForm } from "../types/auth.types.ts";


export const login = async (data:LoginForm): Promise <AuthResponse> =>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`,data);
    return response.data;
}
export const register = async (data:RegisterForm): Promise <AuthResponse> =>{
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`,data);
    return response.data;
}