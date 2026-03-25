import type { Event } from "../../types/event.types";
import {Heart} from "lucide-react"
import { useState } from "react";
import { saveEvent, deleteEvent } from "../../services/savedEvents.services";

const EventCard = ({id, name, date, venue, category, image, genre, priceMin}:Event) =>{
    const [isSaved, setIsSaved] = useState(false)
    
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