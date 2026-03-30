import type { Event } from "../../types/event.types";
import {Heart} from "lucide-react"
import { useState,useEffect } from "react";
import { saveEvent, deleteEvent,getSavedEvents} from "../../services/savedEvents.services";
//const EventCard = ({ isSaved, ...event }: Event & { isSaved?: boolean }) => {
const EventCard = ({id, name, date, venue, category, image, genre, priceMin}:Event) =>{
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        getSavedEvents()
            .then(data => {
            setIsSaved(data.savedEvents.includes(id))
            })
            .catch(() => setIsSaved(false))
    }, [id]);

    const handleClickHeart = async() => {
        if(isSaved){
            await deleteEvent({id})
            setIsSaved(false)
        }else{
            await saveEvent({id, date})
            setIsSaved(true)
        }
    }

    return (
        <div className="event-card">
            <div className="event-card__img">
                <img src= {image} ></img>
                <div className="event-card__btn-heart" onClick={handleClickHeart}>
                    <Heart size={10} fill= {isSaved? "red" : "black" } />
                </div>
            </div>
            
            <div className="event-card__info">
                <p>{category} - {genre}</p>
                <p><b>{name}</b></p>
                <p>{date} - {venue}</p>
                <p>{priceMin} €</p>
            </div>
        </div>
    );
}
export default EventCard;