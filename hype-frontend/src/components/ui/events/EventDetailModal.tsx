import { useState, useEffect } from 'react'
import type { Event } from '../../../types/event.types'
import { Heart, Users, ExternalLink, MapPin, Calendar, Ticket } from 'lucide-react'
import { saveEvent, deleteEvent, getSavedEvents } from '../../../services/savedEvents.services'
import { getSharedEventIds } from '../../../services/groups.services'
import ShareEventModal from './ShareEventModal'

type Props = { event: Event; onClose: (saved: boolean, sent: boolean) => void }

const EventDetailModal = ({ event, onClose }: Props) => {
  const [isSaved, setIsSaved] = useState(false)
  const [hasSent, setHasSent] = useState(false)
  const [showShare, setShowShare] = useState(false)

  useEffect(() => {
    getSavedEvents()
      .then(data => setIsSaved(data.savedEvents.some((e: { id: string }) => e.id === event.id)))
      .catch(() => {})
    getSharedEventIds()
      .then(ids => setHasSent(ids.includes(event.id)))
      .catch(() => {})
  }, [event.id])

  const handleSave = async () => {
    if (isSaved) { await deleteEvent(event); setIsSaved(false) }
    else { await saveEvent(event); setIsSaved(true) }
  }

  const price = event.priceMin != null
    ? event.priceMin === 0 ? 'Gratis' : `Desde ${event.priceMin} €`
    : 'Precio disponible en la web'

  const category = [event.category === 'Undefined' ? null : event.category, event.genre, event.subGenre]
    .filter(Boolean).join(' · ')

  return (
    <>
      <div className="modal-overlay" onClick={() => onClose(isSaved, hasSent)} />
      <div className="event-modal">
        <div className="event-modal__img">
          {event.image && <img src={event.image} alt={event.name} />}
          <button className="event-modal__close" onClick={() => onClose(isSaved, hasSent)}>✕</button>
        </div>

        <div className="event-modal__body">
          {category && <p className="event-modal__category">{category}</p>}
          <h2 className="event-modal__title">{event.name}</h2>

          <div className="event-modal__details">
            {(event.venue || event.city) && (
              <div className="event-modal__detail">
                <MapPin size={14} />
                <span>{[event.venue, event.city].filter(Boolean).join(', ')}</span>
              </div>
            )}
            {(event.date || event.time) && (
              <div className="event-modal__detail">
                <Calendar size={14} />
                <span>{[event.date, event.time].filter(Boolean).join(' · ')}</span>
              </div>
            )}
            <div className="event-modal__detail">
              <Ticket size={14} />
              <span>{price}</span>
            </div>
          </div>

          <div className="event-modal__actions">
            <button
              className={`event-modal__action-btn event-modal__action-btn--save${isSaved ? ' event-modal__action-btn--saved' : ''}`}
              onClick={handleSave}
            >
              <Heart size={14} fill={isSaved ? 'currentColor' : 'none'} />
              {isSaved ? 'Guardado' : 'Guardar'}
            </button>
            <button
              className={`event-modal__action-btn${hasSent ? ' event-modal__action-btn--shared' : ''}`}
              onClick={() => setShowShare(true)}
            >
              <Users size={14} />
              Compartir
            </button>
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="event-modal__action-btn event-modal__action-btn--primary"
              >
                Ver entradas
                <ExternalLink size={13} />
              </a>
            )}
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

export default EventDetailModal
