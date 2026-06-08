import type { Event } from '../../types/event.types'
import { Heart, Users } from 'lucide-react'
import { useState, useEffect } from 'react'
import { saveEvent, deleteEvent, getSavedEvents } from '../../services/savedEvents.services'
import { getSharedEventIds } from '../../services/groups.services'
import ShareEventModal from './events/ShareEventModal'
import EventDetailModal from './events/EventDetailModal'

const EventCard = (event: Event) => {
  const [isSaved, setIsSaved] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    getSavedEvents()
      .then((data) => setIsSaved(data.savedEvents.some((e: { id: string }) => e.id === event.id)))
      .catch(() => setIsSaved(false))
    getSharedEventIds()
      .then((ids) => setHasSent(ids.includes(event.id)))
      .catch(() => {})
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
    <>
      <div className="event-card" onClick={() => setShowDetail(true)}>
        <div className="event-card__img">
          <img src={event.image}></img>
          <div className="event-card__img-actions">
            <div
              className={`event-card__btn-heart${isSaved ? ' event-card__btn-heart--saved' : ''}`}
              onClick={(e) => { e.stopPropagation(); handleClickHeart() }}
            >
              <Heart size={12} fill={isSaved ? 'white' : 'black'} color={isSaved ? 'white' : 'black'} />
            </div>
            <div className={`event-card__btn-share${hasSent ? ' event-card__btn-share--sent' : ''}`} onClick={(e) => { e.stopPropagation(); setShowShare(true) }}>
              <Users size={12} />
            </div>
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
          <p>{event.venue}</p>
          <p>{event.date}</p>
          <hr className="event-card__divider" />
          <p>
            {event.priceMin != null
              ? event.priceMin === 0
                ? 'Gratis'
                : `Desde ${event.priceMin} €`
              : 'Precio disponible en la web'}
          </p>
        </div>
      </div>

      {showShare && <ShareEventModal event={event} onClose={() => setShowShare(false)} onSent={() => setHasSent(true)} />}
      {showDetail && <EventDetailModal event={event} onClose={(saved, sent) => { setShowDetail(false); setIsSaved(saved); setHasSent(sent) }} />}
    </>
  )
}
export default EventCard
