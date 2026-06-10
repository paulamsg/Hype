import React from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate, Link } from 'react-router-dom'
import { useForm, Controller, type Resolver } from 'react-hook-form'
import { z } from 'zod'
import { register as registerUser } from '../services/auth.services'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { CITIES } from '../mocks/cities'

const schema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'Los apellidos deben tener al menos 2 caracteres'),
  email: z.email('Introduce un email válido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .refine((val) => /[A-Z]/.test(val), 'Debe contener al menos una mayúscula')
    .refine((val) => /[0-9]/.test(val), 'Debe contener al menos un número'),
  location: z.string().min(1, 'Selecciona tu localidad'),
})

type RegisterFormData = z.infer<typeof schema>

const resolver: Resolver<RegisterFormData> = async (values) => {
  const result = schema.safeParse(values)
  if (result.success) return { values: result.data, errors: {} }

  const errors = result.error.issues.reduce(
    (acc, issue) => {
      const key = issue.path[0] as keyof RegisterFormData
      if (!acc[key]) acc[key] = { message: issue.message, type: issue.code }
      return acc
    },
    {} as Record<keyof RegisterFormData, { message: string; type: string }>,
  )
  return { values: {}, errors }
}

const Register = () => {
  const navigate = useNavigate()
  const { saveAuth } = useAuth()
  const [serverError, setServerError] = React.useState<string | null>(null)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver,
    defaultValues: { name: '', lastName: '', email: '', password: '', location: '' },
  })

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null)
    try {
      const res = await registerUser(data)
      saveAuth(res.token, res.user)
      navigate('/descubre')
    } catch {
      setServerError('Ha ocurrido un error al crear la cuenta. Inténtalo de nuevo.')
    }
  }

  return (
    <div className="auth__layout">
      <h1 className="logo__text">hype</h1>
      <div className="auth__layout__form">
        <h1 className="auth__layout__form-title">Crea tu cuenta</h1>
        <p>
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión →</Link>
        </p>
        {serverError && <p className="status-error">{serverError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="text"
                name="name"
                placeholder="Nombre"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
          <div className={`input-wrap${errors.location ? ' input-wrap--error' : ''}`}>
            <select {...register('location')} defaultValue="">
              <option value="" disabled>Localidad</option>
              {CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.location && <span className="input-error">{errors.location.message}</span>}
          </div>
          <Button
            label="Crear cuenta →"
            variant="primary"
            size="xl"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  )
}

export default Register
