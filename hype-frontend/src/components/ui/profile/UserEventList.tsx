import EventProfileCard from "./EventProfileCard";
import type { FolderType } from "../../../types/folder.types";
import type { Event } from "../../../types/event.types";
import {getWantEvents,getGoneEvents,getGoingEvents,getExpiredEvents} from "../../../services/savedEvents.services";
import { useState,useEffect } from "react";
//recibo por parametro que eventos tengo que mostrar -> recibo el folder --> folder type
const UserEventList =  ({ folder }: FolderType ) => {

    const [events, setEvents] = useState<Event[]>([])
    const[refresh, setOnRefresh] = useState(false);
    
    useEffect(()=>{
        const getEventsByFolder = async () =>{
            try{
                if(folder === 'WANT_GO'){
                    const data = await getWantEvents()
                    setEvents(data.savedEvents);
                }
                if(folder === 'GONE'){
                    const data = await getGoneEvents()
                    setEvents(data.savedEvents);
                }
                if(folder === 'GOING'){
                    const data = await getGoingEvents()
                    setEvents(data.savedEvents);
                }
                if(folder === 'EXPIRED'){
                    const data = await getExpiredEvents()
                    setEvents(data.savedEvents);
                }
            }catch(e){
                console.log("error", e)
            }
        }
        getEventsByFolder()
    },[folder, refresh])

    return (
        <div className="display">
            {events.map(event => <EventProfileCard key={event.id} {...event} folder={folder}  onUpdate={() => setOnRefresh(state => !state)}/>)}
        </div>
    )
}
export default UserEventList;