import { useState, useEffect } from 'react'
import type { Event } from '../../types/event.types'
import { getSharedEventIds } from '../../services/groups.services'
import ShareEventModal from './events/ShareEventModal'

interface FeaturedEventCardProps extends Event {
  hero?: boolean
}

const FeaturedEventCard = ({ hero, ...event }: FeaturedEventCardProps) => {
  const [showShare, setShowShare] = useState(false)
  const [hasSent, setHasSent] = useState(false)

  useEffect(() => {
    getSharedEventIds()
      .then((ids) => setHasSent(ids.includes(event.id)))
      .catch(() => {})
  }, [event.id])

  return (
    <>
      <div className={`featured-card${hero ? ' featured-card--hero' : ''}`}>
        <img src={event.image} alt={event.name} className="featured-card__img" />
        <div className="featured-card__overlay" />
        <div className="featured-card__info">
          <p className="featured-card__name">{event.name}</p>
          <p className="featured-card__date">
            {event.venue} | {event.date}
          </p>
          <p className="featured-card__price">
            {event.priceMin != null
              ? event.priceMin === 0
                ? 'Gratis'
                : `Desde ${event.priceMin} €`
              : 'Precio disponible en la web'}
          </p>
          <div className="featured-card__actions">
            <button className="featured-card__btn">Quiero ir</button>
            <button
              className={`featured-card__btn${hasSent ? ' featured-card__btn--shared' : ''}`}
              onClick={() => setShowShare(true)}
            >
              Compartir
            </button>
            <a
              href={event.url}
              target="_blank"
              rel="noreferrer"
              className="featured-card__btn featured-card__btn--primary"
            >
              Ver evento
            </a>
          </div>
        </div>
      </div>

      {showShare && (
        <ShareEventModal
          event={event}
          onClose={() => setShowShare(false)}
          onSent={() => setHasSent(true)}
        />
      )}
    </>
  )
}

export default FeaturedEventCard
