import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import { getPhotosByUser } from '../services/photos.services'
import { getWantEvents, getGoingEvents, getGoneEvents, getExpiredEvents } from '../services/savedEvents.services'
import { getFriendsCount } from '../services/user.services'

type EventsCount = {
  wantGo: number
  going: number
  gone: number
  expired: number
}

type UserContextType = {
  photosCount: number
  eventsCount: EventsCount
  followersCount: number
  followingCount: number
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
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)

  const refreshProfile = async () => {
    try {
      const [photos, wantGo, going, gone, expired, friends] = await Promise.all([
        getPhotosByUser(),
        getWantEvents(),
        getGoingEvents(),
        getGoneEvents(),
        getExpiredEvents(),
        getFriendsCount(),
      ])

      setPhotosCount(photos.photos.length)
      setEventsCount({
        wantGo: wantGo.savedEvents.length,
        going: going.savedEvents.length,
        gone: gone.savedEvents.length,
        expired: expired.savedEvents.length,
      })
      setFollowersCount(friends.followersCount)
      setFollowingCount(friends.followingCount)
    } catch (e) {}
  }

  useEffect(() => {
    refreshProfile()
  }, [])

  return (
    <UserContext.Provider value={{ photosCount, eventsCount, followersCount, followingCount, refreshProfile }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUserContext debe usarse dentro de UserProvider')
  return context
}
