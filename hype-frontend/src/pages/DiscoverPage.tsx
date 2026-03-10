import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
//import { useNavigate, Link } from "react-router-dom"
import { getEvents } from "../services/event.services";
import type { Event } from "../types/event.types";
import EventCard from "../components/ui/EventCard";
import Topbar from "../components/ui/TopBar";
import FilterBar from "../components/ui/FilterBar";
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
        listEvents();
    }, [])

    return(
        <>
        <Topbar/>
        <FilterBar/>
        <div><p>Estamos en la página descubre</p>
        {loading && <p>Cargando los eventos eventos</p>}
        {
        events.map((event:Event)=>(
            <div key={event.id}>
                <EventCard {...event}/>
            </div>
        ))
        }
        </div>
        </>
    )
}
export default Discover;