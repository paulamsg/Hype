/*import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom"
import { getEvents } from "../services/event.services";

const Discover = () =>{

    const navigate = useNavigate()
    const { saveAuth } = useAuth()

    const [location, setLocation] = useState(useAuth().user?.location)
    
    const listEvents = async () =>{
        try{
            const data = await getEvents (location)
        }catch(){
            
        }
    }
    return(
        <div><p>Estamos en la página descubre</p></div>
    )
}
export default Discover;*/