import React, { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import type { LoginForm } from '../types/auth.types'
import { login } from '../services/auth.services'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const VIDEOS = [
  '/videos/11999024_1920_1080_25fps.mp4',
  '/videos/12504903_2560_1440_30fps.mp4',
  '/videos/13082773-hd_1920_1080_60fps.mp4',
  '/videos/15878108_1920_1080_25fps.mp4',
]

const Login = () => {
  const navigate = useNavigate()
  const { saveAuth } = useAuth()
  const [video] = useState(() => VIDEOS[Math.floor(Math.random() * VIDEOS.length)])

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
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
      navigate('/descubre')
    } catch (err) {
      setError(`Email o contraseña incorrectos: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth__layout">
      <video className="auth__layout__video" src={video} autoPlay loop muted playsInline />
      <div className="auth__layout__overlay" />
      <h1 className="logo__text">hype</h1>
      <div className="auth__layout__form">
        <h1 className="auth__layout__form-title">Bienvenido de nuevo</h1>
        <p>
          ¿No tienes cuenta? <Link to="/registro">Regístrate gratis → </Link>
        </p>
        {error && <p className="status-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />
          <Button label="Entrar →" variant="primary" size="xl" type="submit" disabled={loading} />
        </form>
        <p className="auth__layout__form-footer">
          ¿Primera vez? <Link to="/registro">Crea tu cuenta</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
