import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import prisma from "../config/database"

export const register = async (req: Request, res: Response) => {
    try{
        const {name, lastName, email, password, location} = req.body;
        const emailExist = await prisma.user.findUnique({
            where: {email}
        })
        
        if(emailExist){
            return res.status(400).json({message: "El email ya está registrado"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const normalizedName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const normalizedLastName = lastName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        const baseUsername = `${normalizedName}${normalizedLastName}`.replace(/\s/g, "")
        const randomNum = Math.floor(Math.random() * 9000) + 1000
        const username = `${baseUsername}_${randomNum}`

        const user = await prisma.user.create({
            data: {
                name,
                lastName,
                username: username,
                email,
                password: hashedPassword,
                location
            }
        });

        const userToken = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET as string,
            {expiresIn: "7d"}
        );

        res.status(201).json({
            message:"Usiario creado correctamente",
            userToken, 
            user : {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });

    }catch (error){
        return res.status(500).json({message: "Error interno del servidor"})
    }
}

export const login =  async (req: Request, res:Response) => {
    try{
        const  {email, password} =  req.body;

        const existsUser = await prisma.user.findUnique({
            where : {email}
        });

        const validPwd = existsUser && await bcrypt.compare(password, existsUser.password);

        if (!existsUser){
            return res.status(401).json({message:"Email o contraseña incorrectos"})
        }
        if (!validPwd){
            return res.status(401).json({message:"Contraseña incorrecta"})
        }

        const userToken = jwt.sign(
            { userId: existsUser.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message:"El usuario ha iniciado sesión correctamente",
            userToken, 
            user : {
                id: existsUser.id,
                name: existsUser.name,
                username: existsUser.username,
                email: existsUser.email
            }
        })
    }catch(error){
        return res.status(501).json({message: error})
    }
    
}
