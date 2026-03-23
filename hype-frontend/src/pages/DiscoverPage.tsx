import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
//import { useNavigate, Link } from "react-router-dom"
import { getEvents } from "../services/event.services";
import type { Event } from "../types/event.types";
import EventCard from "../components/ui/EventCard";
import Topbar from "../components/ui/TopBar";
import FilterBar from "../components/ui/FilterBar";
import jsonEvents from "../mocks/eventsData.json"

const Discover = () =>{
    
    const [events, setEvents] =useState<Event[]>([])
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]) 

    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    
    //filterbar - properties
    const [filters, setFilters] = useState({
        city: user?.location || "Madrid",
        price: "all",
        category: "all",
        date: "all"
    })
    
    const handleCityChange = (city: string) => {
        setFilters({
            ...filters,
            city: city
        })
    }

    const handlePriceChange = (price: string) => {
        setFilters({
            ...filters,
            price: price
        })
    }

    const handleCategoryChange = (category: string)=>{
        setFilters({
            ...filters,
            category: category
        })
    }

    const handleDateChange = (date: string) =>{
        setFilters({
            ...filters,
            date: date
        })
    }
    const listEvents = async () =>{
        setLoading(true)
        try{
            const data = await getEvents ({ city: filters.city });
            const otherEvents = jsonEvents.filter((evnt)=>{
                return evnt.city === filters.city;
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
    }, [filters.city])

    const applyFilters = () => {
        let filtered = [...events]
        if (filters.price !== "all") {
            filtered = filtered.filter((event) => {
                const min = event.priceMin || 0
                const max = event.priceMax || 0
                switch(filters.price) {
                    case "free":
                        return min === 0 && max === 0
                    case "under10":
                        return max <= 10
                    case "10-30":
                        return (min >= 10 && min <= 30)
                    case "30-60":
                        return (min >= 30 && min <= 60)
                    case "over60":
                        return min > 60 && max > 60
                    default:
                        return true;
                }
            })
        }
        if (filters.category !== "all") {
            filtered = filtered.filter(event => event.category === filters.category);
        }
        if (filters.date !== "all") {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            filtered = filtered.filter((event) => {
                if (!event.date) return false;
                const eventDate = new Date(event.date);
                const eventDay = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                switch (filters.date) {
                    case "today":
                        return eventDay.getTime() === today.getTime();
                    case "weekend": {
                        const day = today.getDay();
                        const daysToSat = day === 6 ? 0 : (6 - day); 
                        const sat = new Date(today); sat.setDate(today.getDate() + daysToSat);
                        const sun = new Date(sat); sun.setDate(sat.getDate() + 1);
                        return eventDay.getTime() === sat.getTime() || eventDay.getTime() === sun.getTime();
                    }
                    case "week": {
                        const day = today.getDay();
                        const sunday = new Date(today); sunday.setDate(today.getDate() + (7 - day) % 7);
                        return eventDay >= today && eventDay <= sunday;
                    }
                    case "month": {
                        return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
                    }
                    default:
                        return true;
                }
            })
        }
        setFilteredEvents(filtered)
    }

    useEffect(() => {
        applyFilters()
    }, [events, filters])

    return(
        <>
        <Topbar/>
        <FilterBar
            selectedCity={filters.city}
            onCityChange={handleCityChange}
            selectedPrice={filters.price}
            onPriceChange={handlePriceChange}
            selectedCategory = {filters.category}
            onCategoryChange={handleCategoryChange}
            selectedDate={filters.date}
            onDateChange={handleDateChange}
        />
        {loading && <p>Cargando los eventos eventos</p>}
        {
        filteredEvents.map((event:Event)=>(
            <div key={event.id}>
                <EventCard {...event}/>
            </div>
        ))
        }
        </>
    )
}
export default Discover;