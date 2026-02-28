import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes" 
import eventsRoutes from "./routes/events.routes"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);  
const PORT = process.env.PORT || 3000;


app.get("/", (req, res)=>{
    res.json({message: "Hype!!"})
});

app.listen(PORT, ()=>{
    console.log(`El backend esta corriendo en el puerto:  ${PORT}`)
})