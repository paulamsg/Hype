import {Request, Response} from "express"
import axios from "axios";

const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

export const getEvents = async (req: Request, res: Response) =>{
    try{
        const {location, category, startDateTime, endDateTime, page=0 } = req.query
        const response = await axios.get(`${BASE_URL}/events.json`,{
            params : {
                apikey : process.env.API_KEY_TICKETMASTER,
                city: location,
                countryCode: "ES",
                classificationName: category || undefined,
                startDateTime: startDateTime || undefined,
                endDateTime: endDateTime || undefined,
                size: 20,
                page: page,
                sort: "date,asc"
            }
        });
        
        const events = response.data._embedded?.events || [];
        const eventInformation = events.map((event: any) => ({
            id: event.id,
            name: event.name,
            date: event.dates?.start?.localDate,
            time: event.dates?.start?.localTime,
            venue: event._embedded?.venues?.[0]?.name,
            city: event._embedded?.venues?.[0]?.city?.name,
            image: event.images?.[0]?.url,
            category: event.classifications?.[0]?.segment?.name,
            //priceMin: event.priceRanges?.[0]?.min,
            //priceMax: event.priceRanges?.[0]?.max,
            url: event.url
        }));

        res.status(200).json({
            events: eventInformation,
        })
        
    }catch (err){
        return res.status(500).json({message : err})
    }
}