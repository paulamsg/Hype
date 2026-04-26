import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import eventsRoutes from './routes/events.routes'
import mockEventsRoutes from './routes/mockEvents.routes'
import savedEventRoutes from './routes/savedEvents.routes'
import photosRoutes from './routes/photos.routes'
import usersRoutes from './routes/users.routes'
import { expireOldEvents } from './jobs/expireEvents.job'
import nodeCron from 'node-cron'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

//Rutas
app.use('/auth', authRoutes)
app.use('/events', eventsRoutes)
app.use('/mock-events', mockEventsRoutes)
app.use('/saved-events', savedEventRoutes)
app.use('/photos', photosRoutes)
app.use('/users', usersRoutes)

expireOldEvents()
nodeCron.schedule('0 0 * * *', () => {
  console.log('Ejecutando expiración nocturna...')
  expireOldEvents()
})

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hype!!' })
})

app.listen(PORT, () => {
  console.log(`El backend esta corriendo en el puerto:  ${PORT}`)
})
