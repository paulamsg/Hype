import type { Event } from '../../types/event.types'
import { Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { saveEvent, deleteEvent, getSavedEvents } from '../../services/savedEvents.services'

const EventCard = (event: Event) => {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    getSavedEvents()
      .then((data) => {
        setIsSaved(data.savedEvents.some((e: { id: string }) => e.id === event.id))
      })
      .catch(() => setIsSaved(false))
  }, [event.id])

  const handleClickHeart = async () => {
    if (isSaved) {
      await deleteEvent(event)
      setIsSaved(false)
    } else {
      await saveEvent(event)
      setIsSaved(true)
    }
  }

  return (
    <div className="event-card">
      <div className="event-card__img">
        <img src={event.image}></img>
        <div className="event-card__btn-heart" onClick={handleClickHeart}>
          <Heart size={10} fill={isSaved ? 'red' : 'black'} />
        </div>
      </div>

      <div className="event-card__info">
        <p>
          {event.category} - {event.genre}
        </p>
        <p>
          <b>{event.name}</b>
        </p>
        <p>
          {event.date} - {event.venue}
        </p>
        <p>{event.priceMin} €</p>
      </div>
    </div>
  )
}
export default EventCard
