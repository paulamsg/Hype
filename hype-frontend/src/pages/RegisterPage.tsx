import React from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import type { RegisterForm } from '../types/auth.types'
import { useState } from 'react'
import { register } from '../services/auth.services'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { CITIES } from '../mocks/cities'

const Register = () => {
  const navigate = useNavigate()
  const { saveAuth } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    location: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = await register(form)
      saveAuth(data.token, data.user)
      navigate('/descubre')
    } catch (err) {
      setError(`Error: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div className="auth__layout">
      <h1 className="logo__text">hype</h1>
      <div className="auth__layout__form">
        <h1 className="auth__layout__form-title">Crea tu cuenta</h1>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión → </Link>
        </p>
        {error && <p className="status-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
          <Input type="text" name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} />
          <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <select name="location" value={form.location} onChange={handleSelectChange}>
            <option value="" disabled>Localidad</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <Button label="Crear cuenta →" variant="primary" size="xl" type="submit" disabled={loading} />
        </form>
      </div>
    </div>
  )
}

export default Register
