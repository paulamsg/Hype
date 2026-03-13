import type { Event } from "../../types/event.types";
const EventCard = ({name, date, venue, category, image, genre, priceMin}:Event) =>{
    return (
        <div className="event-card">
            <div className="event-card__img">
                <img src= {image}></img>
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