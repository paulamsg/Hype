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

export const deleteEvent = async (req:AuthRequest, res:Response) => {
    try{
        const eventId = req.params.eventId as string;
        const userId = req.userId;
        const isAlreadySaved = await prisma.savedEvent.findUnique({
            where:{
                userId_eventId: { userId, eventId }
            } 
        });

        if(!isAlreadySaved){
            return res.status(404).json({ message: "Evento no encontrado" })
        }else{
            await prisma.savedEvent.delete({
                where: {
                    userId_eventId: { userId, eventId }
                }
            });
        }
        res.status(200).json({ message: "Evento eliminado correctamente" })
    }catch(error){
        return res.status(500).json({message: "Error"})
    }
}

export const getSavedEvents = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }

        const saved = await prisma.savedEvent.findMany({ where: { userId } })
        const eventIds = saved.map(e => e.eventId)

        const mockEvents = await prisma.mockEvent.findMany({
            where: { id: { in: eventIds } },
            select: { id: true, name: true }
        })

        const mockMap = new Map(mockEvents.map(e => [e.id, e.name]))

        const savedEvents = eventIds.map(id => ({
            id,
            title: mockMap.get(id) ?? null
        }))

        return res.status(200).json({ savedEvents })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}