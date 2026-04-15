//import EventProfileCard from "./EventProfileCard";
import type { FolderType } from "../../../types/folder.types";
//recibo por parametro que eventos tengo que mostrar -> recibo el folder --> folder type

const UserEventList =  ({ folder }: FolderType ) => {

    //función para llamar con el folder

    return (
        <>
        {folder === 'GONE'/* && <EventProfileCard data = {data}/>*/}
        </>
    )
}
export default UserEventList;