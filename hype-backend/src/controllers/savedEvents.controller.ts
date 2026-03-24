import { Request, Response } from "express"
import prisma from "../config/database"
import { AuthRequest } from "../middleware/auth.middleware"

export const saveEvent = async (req: AuthRequest, res: Response) => {
    try{
        const {eventId, eventDate} = req.body;
        const userId = req.userId;
        const isAlreadySaved = await prisma.savedEvent.findUnique({
            where:{
                userId_eventId: { userId, eventId }
            } 
        });
        if (isAlreadySaved) {
            return res.status(400).json({ message: "El evento ya está guardado" })
        }

        const savedEvent = await prisma.savedEvent.create({
            data:{
                userId,
                eventId,
                folder: "WANT_GO",
                eventDate: eventDate ? new Date(eventDate) : null
            }
        });

        res.status(201).json({ message: "Evento guardado correctamente", savedEvent })

    }catch(error){
        return res.status(500).json({message: "Error"})
    }
}
