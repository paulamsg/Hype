import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
//import { useNavigate, Link } from "react-router-dom"
import { getEvents } from "../services/event.services";
import type { Event } from "../types/event.types";
const Discover = () =>{
    
    const [events, setEvents] =useState<Event[]>([])
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    
    const listEvents = async () =>{
        setLoading(true)
        try{
            const data = await getEvents ({ city: user?.location || "Madrid" });
            setEvents(data);
        }catch(e){
            console.log("error", e)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        listEvents()
    }, [])

    return(
        <div><p>Estamos en la página descubre</p>
        {loading && <p>Cargando los eventos eventos</p>}
        {
        events.map((event:Event)=>(
            <div key={event.id}>
                    <p><b>{event.name}</b></p>
                    <p>{event.date}</p>
                    <p>{event.venue}</p>
                </div>
        ))
        }
        </div>
    )
}
export default Discover;