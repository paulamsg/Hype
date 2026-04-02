import {Request, Response} from "express"
import axios from "axios";
import prisma from "../config/database"
const BASE_URL = "https://app.ticketmaster.com/discovery/v2/";

const CATEGORY_MAP: Record<string, string> = {
    "Music": "Música",
    "Sports": "Deportes",
    "Arts & Theatre": "Teatro",
    "Theatre": "Teatro",
    "Family": "Familia",
    "Comedy": "Comedia",
    "Stand Up Comedy": "Comedia",
    "Fine Art": "Arte",
    "Dance": "Arte",
    "Film": "Arte",
}

export const getEvents = async (req: Request, res: Response) =>{
    try{
        const {city, category, startDateTime, endDateTime, page=0 } = req.query
        const response = await axios.get(`${BASE_URL}events.json`,{
            params : {
                apikey : process.env.API_KEY_TICKETMASTER,
                city: city,
                countryCode: "ES",
                classificationName: category || undefined,
                startDateTime: startDateTime || undefined,
                endDateTime: endDateTime || undefined,
                size: 50,
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
            //category: event.classifications?.[0]?.segment?.name,
            category: CATEGORY_MAP[event.classifications?.[0]?.segment?.name] ?? event.classifications?.[0]?.segment?.name,
            priceMin: event.priceRanges?.[0]?.min,
            priceMax: event.priceRanges?.[0]?.max,
            genre: event.classifications?.[0]?.genre?.name,
            subGenre: event.classifications?.[0]?.subGenre?.name,
            url: event.url
        }));
        const uniqueEvents = eventInformation.filter((event: any, index: any, self: any[])=>{
            return index === self.findIndex((e:any) => e.name === event.name)
        })
        res.status(200).json({
            events: uniqueEvents,
        })
        
    }catch (err){
        return res.status(500).json({message : err})
    }
}

export const getMocksEvents = async (req: Request, res: Response) => {
    try{
        const {city} = req.query
        const events = await prisma.mockEvent.findMany({
            where: {city: city as string},
            orderBy: { date: 'asc' }
        });
        res.status(200).json({events})
    }catch(error){
        return res.status(500).json({message: error})
    }
}