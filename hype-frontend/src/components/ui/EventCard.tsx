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
        <div
          className="event-card__btn-heart"
          style={{ background: isSaved ? 'red' : 'white' }}
          onClick={handleClickHeart}
        >
          <Heart size={15} fill={isSaved ? 'white' : 'black'} color="white" />
        </div>
      </div>

      <div className="event-card__info">
        <p>
          {event.category === 'Undefined' ? 'Sin categoría' : event.category}
          {event.genre === undefined ? ' ' : `- ${event.genre}`}
        </p>
        <p>
          <b>{event.name}</b>
        </p>
        <p>{event.date}</p>
        <p>{event.venue}</p>
        <p>
          {event.priceMin != null
            ? event.priceMin === 0
              ? 'Gratis'
              : `${event.priceMin} €`
            : 'Precio disponible en la web'}{' '}
        </p>
      </div>
    </div>
  )
}
export default EventCard
