import axios from 'axios'
import type { Event, EventFilters } from '../types/event.types.ts'

export const getEvents = async (filters: EventFilters): Promise<Event[]> => {
  const params = new URLSearchParams()
  params.append('city', filters.city)
  if (filters.category!== undefined) params.append('category', filters.category)
  if (filters.priceMin !== undefined) params.append('priceMin', String(filters.priceMin))
  if (filters.priceMax !== undefined) params.append('priceMax', String(filters.priceMax))
  if (filters.date !== undefined) params.append('date', filters.date)

  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events?${params.toString()}`)
  return response.data.events
}
