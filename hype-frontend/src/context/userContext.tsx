import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { getPhotosByUser } from '../services/photos.services'
import { getWantEvents, getGoingEvents, getGoneEvents, getExpiredEvents } from '../services/savedEvents.services'

type EventsCount = {
  wantGo: number
  going: number
  gone: number
  expired: number
}

type UserContextType = {
  photosCount: number
  eventsCount: EventsCount
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [photosCount, setPhotosCount] = useState(0)
  const [eventsCount, setEventsCount] = useState<EventsCount>({
    wantGo: 0,
    going: 0,
    gone: 0,
    expired: 0,
  })

  const refreshProfile = async () => {
    try {
      const [photos, wantGo, going, gone, expired] = await Promise.all([
        getPhotosByUser(),
        getWantEvents(),
        getGoingEvents(),
        getGoneEvents(),
        getExpiredEvents(),
      ])

      setPhotosCount(photos.photos.length)
      setEventsCount({
        wantGo: wantGo.savedEvents.length,
        going: going.savedEvents.length,
        gone: gone.savedEvents.length,
        expired: expired.savedEvents.length,
      })
    } catch (e) {}
  }

  useEffect(() => {
    refreshProfile()
  }, [])

  return (
    <UserContext.Provider value={{ photosCount, eventsCount, refreshProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUserContext debe usarse dentro de UserProvider')
  return context
}
