import { useState, useEffect } from 'react'
import type { Event } from '../../types/event.types'
import { getSharedEventIds } from '../../services/groups.services'
import { formatDate } from '../../utils/date.utils'
import { saveEvent, deleteEvent, getSavedEvents } from '../../services/savedEvents.services'
import ShareEventModal from './events/ShareEventModal'
import EventDetailModal from './events/EventDetailModal'

interface FeaturedEventCardProps extends Event {
  hero?: boolean
}

const FeaturedEventCard = ({ hero, ...event }: FeaturedEventCardProps) => {
  const [showShare, setShowShare] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showDetail, setShowDetail] = useState(false)

  useEffect(() => {
    getSharedEventIds()
      .then((ids) => setHasSent(ids.includes(event.id)))
      .catch(() => {})
    getSavedEvents()
      .then((data) => setIsSaved(data.savedEvents.some((e: { id: string }) => e.id === event.id)))
      .catch(() => {})
  }, [event.id])

  const handleWantGo = async () => {
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
      <div className={`featured-card${hero ? ' featured-card--hero' : ''}`} onClick={() => setShowDetail(true)}>
        <img src={event.image} alt={event.name} className="featured-card__img" />
        <div className="featured-card__overlay" />
        <div className="featured-card__info">
          <p className="featured-card__name">{event.name}</p>
          <p className="featured-card__date">
            {event.venue} | {formatDate(event.date)}
          </p>
          <p className="featured-card__price">
            {event.priceMin != null
              ? event.priceMin === 0
                ? 'Gratis'
                : `Desde ${event.priceMin} €`
              : 'Precio disponible en la web'}
          </p>
          <div className="featured-card__actions">
            <button
              className={`featured-card__btn${isSaved ? ' featured-card__btn--saved' : ''}`}
              onClick={handleWantGo}
            >
              {isSaved ? '✓ Guardado' : 'Quiero ir'}
            </button>
            <button
              className={`featured-card__btn${hasSent ? ' featured-card__btn--shared' : ''}`}
              onClick={() => setShowShare(true)}
            >
              {hasSent ? 'Compartido' : 'Compartir'}
            </button>
            <button className="featured-card__btn featured-card__btn--primary" onClick={() => setShowDetail(true)}>
              Ver evento
            </button>
          </div>
        </div>
      </div>

      {showShare && (
        <ShareEventModal event={event} onClose={() => setShowShare(false)} onSent={() => setHasSent(true)} />
      )}
      {showDetail && (
        <EventDetailModal
          event={event}
          onClose={(saved, sent) => {
            setShowDetail(false)
            setIsSaved(saved)
            setHasSent(sent)
          }}
        />
      )}
    </>
  )
}

export default FeaturedEventCard
