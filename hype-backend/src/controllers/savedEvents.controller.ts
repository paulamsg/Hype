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

//GET TODOS LOS EVENTOS DE TODAS LAS CARPETAS
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

//WANT_GO (EL USUARIO HA MARCADO ESE EVENTO COMO QUE QUIERE IR)
export const getWantEvents = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }

        const saved = await prisma.savedEvent.findMany({ where: { userId, folder:'WANT_GO' } })
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
//GOING (EL USUARIO HA MARCADO ESE EVENTO COMO QUE VA A ASISTIR)
export const getGoingEvents = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }

        const saved = await prisma.savedEvent.findMany({ where: { userId, folder:'GOING'} })
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
// GONE (EL USUARIO HA ASISTIDO A ESE USUARIO)
export const getGoneEvents = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }

        const saved = await prisma.savedEvent.findMany({ where: { userId, folder:'GONE'} })
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
// EXPIRED (EL EVENTO QUE HA MARCADO ESE USUARIO COMO QUE QUERIA IR HA EXPIRADO)
export const getExpiredEvents = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }

        const saved = await prisma.savedEvent.findMany({ where: { userId, folder:'EXPIRED'} })
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

// CAMBIO DE ESTADO DE LOS EVENTOS.
export const updateEventFolder = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "No autorizado" })
        }
        const eventId = req.params.eventId as string;
        const {folder} = req.body;

        const folders = ['WANT_GO', 'GOING', 'GONE', 'EXPIRED'];

        if(!folders.includes(folder)){
            return res.status(400).json({message:"Folder no válido"});
        }

        const updated = await prisma.savedEvent.update({
            where: {userId_eventId: {userId, eventId}},
            data: {folder}
        })
        return res.status(200).json({ message: "Carpeta actualizada", updated })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}