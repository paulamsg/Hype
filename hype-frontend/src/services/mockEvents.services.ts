import axios from 'axios'
import type { Event, EventFilters } from '../types/event.types.ts'

export const getFeaturedMockEvents = async (): Promise<Event[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/mock-events/featured`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.events
}

export const getMockEvents = async (filters: EventFilters): Promise<Event[]> => {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/mock-events/`, {
    params: filters,
  })
  return response.data.events
}
