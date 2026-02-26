import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate, Link } from "react-router-dom"
import type { LoginForm } from "../types/auth.types";
import { useState } from "react";
import { login } from "../services/auth.services";

const Login = () => {
    const navigate = useNavigate()
    const { saveAuth } = useAuth()

    const [form, setForm] = useState<LoginForm>({
        email: "",
        password: ""
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
        const data = await login(form)
        saveAuth(data.token, data.user)
        navigate("/descubre")
        } catch (err) {
            setError(`Email o contraseña incorrectos: ${err}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
        <h1>Iniciar sesión</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
            type="email"
            name="email"
            placeholder="Email"
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
            <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
        </form>
        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
        </div>
    )
}

export default Login;