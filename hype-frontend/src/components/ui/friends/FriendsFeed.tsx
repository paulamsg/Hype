import { useState, useEffect } from 'react'
import { getFriendsFeed, type FriendActivity } from '../../../services/savedEvents.services'
import FriendEventCard from './FriendEventCard'

const FriendsFeed = () => {
  const [events, setEvents] = useState<FriendActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFriendsFeed()
        setEvents(data)
      } catch {
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="friends-feed">
      <h2 className="friends-feed__title">Feed de amigos</h2>
      {loading ? (
        <p className="friends-feed__empty">Cargando...</p>
      ) : events.length === 0 ? (
        <p className="friends-feed__empty">Tus amigos no han guardado eventos aún.</p>
      ) : (
        <div className="friends-feed__list">
          {events.map((event) => (
            <FriendEventCard key={event.id} {...event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FriendsFeed
