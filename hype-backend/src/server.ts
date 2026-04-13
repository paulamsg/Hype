import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes" 
import eventsRoutes from "./routes/events.routes"
import savedEventRoutes from "./routes/savedEvents.routes"
import photosRoutes from "./routes/photos.routes"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use("/auth", authRoutes);
app.use("/events", eventsRoutes);  
app.use("/savedEvents",savedEventRoutes);
app.use("/photos", photosRoutes);

const PORT = process.env.PORT || 3000;


app.get("/", (req, res)=>{
    res.json({message: "Hype!!"})
});

app.listen(PORT, ()=>{
    console.log(`El backend esta corriendo en el puerto:  ${PORT}`)
})