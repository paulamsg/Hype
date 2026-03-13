import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
//import { useNavigate, Link } from "react-router-dom"
import { getEvents } from "../services/event.services";
import type { Event } from "../types/event.types";
import EventCard from "../components/ui/EventCard";
import Topbar from "../components/ui/TopBar";
import FilterBar from "../components/ui/FilterBar";
import jsonEvents from "../data/eventsData.json"

const Discover = () =>{
    
    const [events, setEvents] =useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]) 

    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    
    //filterbar - properties
    const [selectedCity, setSelectedCity] = useState(user?.location || "Madrid")
    const [selectedPrice, setSelectedPrice] = useState('all')

    const listEvents = async () =>{
        setLoading(true)
        try{
            const data = await getEvents ({ city: selectedCity || "Madrid" });
            const otherEvents = jsonEvents.filter((evnt)=>{
                return evnt.city === selectedCity;
            });
            const allEvents = [...data, ...otherEvents]
            
            setEvents(allEvents);
        }catch(e){
            console.log("error", e)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        listEvents();
    }, [selectedCity])


    const applyFilters = async () => {
        let filtered  = [...filteredEvents];
        console.log("array copiado de los eventos segun ciudad",filtered);
        // Precio
        if (selectedPrice !== "all") {
            filtered = filtered.filter((event) => {
                if (selectedPrice === "free") return !event.priceMin || event.priceMin === 0
                if (selectedPrice === "under10") return (event.priceMin ?? 0) < 10
                if (selectedPrice === "10-30") return (event.priceMin ?? 0) >= 10 && (event.priceMin ?? 0) <= 30
                if (selectedPrice === "30-60") return (event.priceMin ?? 0) >= 30 && (event.priceMin ?? 0) <= 60
                if (selectedPrice === "over60") return (event.priceMin ?? 0) > 60
                return true;
            })
        }
        setEvents(filtered)
    }
    useEffect(() => {
        applyFilters()
    }, [selectedPrice])



    return(
        <>
        <Topbar/>
        <FilterBar
            selectedCity={selectedCity}
            onCityChange = {setSelectedCity}
            selectedPrice={selectedPrice}
            onPriceChange = {setSelectedPrice}
        />
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