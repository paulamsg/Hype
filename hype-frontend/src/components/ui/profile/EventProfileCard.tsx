import type { Event } from "../../../types/event.types";

const EventProfileCard = (data:Event) =>{
    return (
        <div className="event-card">
            <div className="event-card__img">
                <img src={data.image}></img>
            </div>
            <div className="event-card__info">
                <p className="event-card__title">{data.name}</p>
                <p className="event-card__venue">{data.venue}</p>
            </div>
            <div  className="event-card__date">
                <p className="event-card__day"></p>
                <p className="event-card__month"></p>
            </div>
        </div>
    )
}

export default EventProfileCard;