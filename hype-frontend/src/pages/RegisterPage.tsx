import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom"
import type { RegisterForm } from "../types/auth.types";
import { useState } from "react";
import { register} from "../services/auth.services";

const Register = () =>{
    const navigate = useNavigate()
    const { saveAuth } = useAuth()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<RegisterForm>({
        name: "",
        lastName: "",
        email: "",
        password: "",
        location:""
    });
    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setLoading(true)
        setError(null)
        try {
            const  data = await register(form)
            saveAuth(data.token, data.user)
            navigate("/descubre")
        }catch(err){
            setError(`Error: ${err}`);
        }finally{
            setLoading(false)
        }

    }
    const handleChange =(e: React.ChangeEvent <HTMLInputElement>) =>{
        console.log("e.target",e.target);
        setForm({...form, [e.target.name]: e.target.value}) 
    }
    return (
            <div>
            <h1>Registro</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={handleChange}
                />
                <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={form.lastName}
                onChange={handleChange}
                />
                <input
                type="email"
                name="email"
                placeholder="ejemplo@gmail.com"
                value={form.email}
                onChange={handleChange}
                />
                <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={form.password}
                onChange={handleChange}
                />
                <input
                type="text"
                name="location"
                placeholder="Localidad"
                value={form.location}
                onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                {loading ? "Cargando..." : "Iniciar sesión"}
                </button>
            </form>
            <p>¿Tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        )
}
export default Register;