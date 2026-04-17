import type { Event } from "../../../types/event.types";

const EventProfileCard = ({  name, image, venue, date,city }: Event) =>{
    
    const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

    const getDay = (date?: string) => {
        if (!date){
            return ''
        } 
        const day = new Date(date).getDate();
        return day
    }

    const getMonth = (date?: string) => {
        if (!date){
            return ''
        }
        const month = MONTHS[new Date(date).getMonth()]
        return month;
    }

    return (
        <div className="event-card">
            <img className="event-card__img" src={image} alt={name} />
            <div className="event-card__info">
                <p className="event-card__title">{name}</p>
                <p className="event-card__city">{city}</p>
                <p className="event-card__venue">{venue}</p>
            </div>
            <div className="event-card__date">
                <p className="event-card__day">{getDay(date)}</p>
                <p className="event-card__month">{getMonth(date)}</p>
            </div>
        </div>
    )
}

export default EventProfileCard;