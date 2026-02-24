import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes" 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Rutas
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;


app.get("/", (req, res)=>{
    res.json({message: "Hype!!"})
});

app.listen(PORT, ()=>{
    console.log(`El backend esta corriendo en el puerto:  ${PORT}`)
})