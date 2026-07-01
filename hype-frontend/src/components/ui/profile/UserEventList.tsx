import EventProfileCard from './EventProfileCard'
import type { FolderType } from '../../../types/folder.types'
import type { Event } from '../../../types/event.types'
import { getWantEvents, getGoneEvents, getGoingEvents, getExpiredEvents } from '../../../services/savedEvents.services'
import { useState, useEffect } from 'react'

const EMPTY_MESSAGES: Record<string, string> = {
  GOING: 'Todavía no tienes eventos confirmados',
  WANT_GO: 'Todavía no has guardado ningún evento',
  GONE: 'Todavía no has asistido a ningún evento',
  EXPIRED: 'No tienes eventos pasados',
}

const UserEventList = ({ folder }: FolderType) => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [refresh, setOnRefresh] = useState(false)

  useEffect(() => {
    const getEventsByFolder = async () => {
      setLoading(true)
      try {
        if (folder === 'WANT_GO') {
          const data = await getWantEvents()
          setEvents(data.savedEvents)
        }
        if (folder === 'GONE') {
          const data = await getGoneEvents()
          setEvents(data.savedEvents)
        }
        if (folder === 'GOING') {
          const data = await getGoingEvents()
          setEvents(data.savedEvents)
        }
        if (folder === 'EXPIRED') {
          const data = await getExpiredEvents()
          setEvents(data.savedEvents)
        }
      } catch {
      } finally {
        setLoading(false)
      }
    }
    getEventsByFolder()
  }, [folder, refresh])

  if (!loading && events.length === 0) {
    return <p className="empty-folder-msg">{EMPTY_MESSAGES[folder]}</p>
  }

  return (
    <div className="display">
      {events.map((event) => (
        <EventProfileCard key={event.id} {...event} folder={folder} onUpdate={() => setOnRefresh((state) => !state)} />
      ))}
    </div>
  )
}
export default UserEventList
