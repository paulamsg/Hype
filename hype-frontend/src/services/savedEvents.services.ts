import axios from 'axios'
import type { Event } from '../types/event.types'
import type { Folder } from '../types/folder.types'

export type FriendEvent = {
  id: number
  eventId: string
  name: string
  date?: string
  venue?: string
  city?: string
  image?: string
  category?: string
  genre?: string
  folder: string
  savedBy: {
    id: number
    name: string
    username: string
    avatarUrl: string | null
  }
}

export const getFriendsFeed = async (): Promise<FriendEvent[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/feed`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.events
}

export const saveEvent = async (event: Event) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/saved-events/`,
    {
      eventId: event.id,
      name: event.name,
      date: event.date,
      time: event.time,
      venue: event.venue,
      city: event.city,
      image: event.image,
      category: event.category,
      genre: event.genre,
      subGenre: event.subGenre,
      priceMin: event.priceMin,
      priceMax: event.priceMax,
      url: event.url,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}
export const deleteEvent = async (event: Event) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/saved-events/${event.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getSavedEvents = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const updateEventFolder = async (event: Event, folder: Folder) => {
  const token = localStorage.getItem('token')
  const response = await axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/saved-events/${event.id}/folder`,
    { folder },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export const getWantEvents = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/want`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getGoingEvents = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/going`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getGoneEvents = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/gone`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
export const getExpiredEvents = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/saved-events/expired`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
