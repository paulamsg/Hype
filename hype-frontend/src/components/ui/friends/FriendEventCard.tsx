import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FriendActivity, FriendSavedEvent, FriendPhoto, FriendGroupEvent, FriendEventShared } from '../../../services/savedEvents.services'
import type { Event } from '../../../types/event.types'
import Button from '../Button'
import { getDay, getMonthAbbr } from '../../../utils/date.utils'
import EventDetailModal from '../events/EventDetailModal'
import { respondToEvent } from '../../../services/notifications.services'

const Avatar = ({ savedBy }: { savedBy: FriendActivity['savedBy'] }) => (
  <div className="friend-event-card__avatar">
    {savedBy.avatarUrl
      ? <img src={savedBy.avatarUrl} alt={savedBy.username} />
      : <span>{savedBy.name.charAt(0).toUpperCase()}</span>
    }
  </div>
)

const EventRow = ({ image, name, city, venue, date }: { image?: string; name?: string; city?: string; venue?: string; date?: string }) => (
  <div className="friend-event-card__event">
    {image && <img className="friend-event-card__event-img" src={image} alt={name} />}
    <div className="friend-event-card__event-info">
      <p className="friend-event-card__event-title">{name}</p>
      <p className="friend-event-card__event-meta">{city}</p>
      <p className="friend-event-card__event-meta">{venue}</p>
    </div>
    <div className="friend-event-card__event-date">
      <p className="friend-event-card__event-day">{getDay(date)}</p>
      <p className="friend-event-card__event-month">{getMonthAbbr(date)}</p>
    </div>
  </div>
)

const toEvent = (a: FriendSavedEvent | FriendGroupEvent | FriendEventShared): Event => {
  if (a.type === 'EVENT_SHARED') return { id: a.id, name: a.eventName ?? '', image: a.eventImage, date: a.eventDate, venue: a.eventVenue, city: a.eventCity }
  return { id: a.eventId, name: a.name ?? '', image: a.image, date: a.date, venue: a.venue, city: a.city, category: a.category, genre: a.genre }
}

const FriendEventCard = (activity: FriendActivity) => {
  const { savedBy } = activity
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [responded, setResponded] = useState(false)

  const handleRespond = async (joined: boolean) => {
    const eventName = (activity as FriendGroupEvent).name ?? (activity as FriendEventShared).eventName ?? ''
    await respondToEvent(savedBy.id, eventName, joined)
    setResponded(true)
  }

  const saved   = activity.type === 'SAVED_EVENT'   ? (activity as FriendSavedEvent)  : null
  const photo   = activity.type === 'PHOTO'          ? (activity as FriendPhoto)        : null
  const group   = activity.type === 'GROUP_EVENT'    ? (activity as FriendGroupEvent)   : null
  const shared  = activity.type === 'EVENT_SHARED'   ? (activity as FriendEventShared)  : null

  const pill = saved   ? { label: 'Quiere ir',        cls: 'want_go'  }
             : group   ? { label: group.groupName,     cls: 'group'    }
             : shared  ? { label: 'Compartió contigo', cls: 'shared'   }
             :           { label: 'Ha subido una foto', cls: 'photo'   }

  return (
    <>
      <div className="friend-event-card">
        <div className="friend-event-card__header">
          <div onClick={() => navigate(`/usuario/${savedBy.id}`)} style={{ cursor: 'pointer' }}>
            <Avatar savedBy={savedBy} />
          </div>
          <span
            className="friend-event-card__user friend-event-card__user--link"
            onClick={() => navigate(`/usuario/${savedBy.id}`)}
          >
            {savedBy.name} <span className="friend-event-card__user-username">(@{savedBy.username})</span>
          </span>
          <span className={`friend-event-card__pill friend-event-card__pill--${pill.cls}`}>
            {pill.label}
          </span>
        </div>

        {saved && <EventRow image={saved.image} name={saved.name} city={saved.city} venue={saved.venue} date={saved.date} />}
        {group && <EventRow image={group.image} name={group.name} city={group.city} venue={group.venue} date={group.date} />}

        {photo && (
          <div className="friend-event-card__photo">
            <img src={photo.photoUrl} alt={photo.eventName ?? 'foto'} />
            {photo.eventName && <p className="friend-event-card__photo-event">{photo.eventName}</p>}
          </div>
        )}

        {shared && shared.eventName && (
          <EventRow
            image={shared.eventImage ?? undefined}
            name={shared.eventName}
            city={shared.eventCity ?? undefined}
            venue={shared.eventVenue ?? undefined}
            date={shared.eventDate ?? undefined}
          />
        )}

        {saved && (
          <div className="friend-event-card__actions">
            <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} onClick={() => setShowModal(true)} />
          </div>
        )}

        {group && (
          <div className="friend-event-card__actions">
            <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} onClick={() => setShowModal(true)} />
            {responded
              ? <Button label="Respuesta enviada" variant="outline" type="button" size="sm" disabled={true} onClick={() => {}} />
              : <>
                  <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} onClick={() => handleRespond(true)} />
                  <Button label="No puedo" variant="outline" type="button" size="sm" disabled={false} onClick={() => handleRespond(false)} />
                </>
            }
          </div>
        )}

        {shared && (
          <div className="friend-event-card__actions">
            <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} onClick={() => setShowModal(true)} />
            {responded
              ? <Button label="Respuesta enviada" variant="outline" type="button" size="sm" disabled={true} onClick={() => {}} />
              : <>
                  <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} onClick={() => handleRespond(true)} />
                  <Button label="No puedo" variant="outline" type="button" size="sm" disabled={false} onClick={() => handleRespond(false)} />
                </>
            }
          </div>
        )}
      </div>

      {showModal && !photo && (
        <EventDetailModal
          event={toEvent(activity as FriendSavedEvent | FriendGroupEvent | FriendEventShared)}
          onClose={(_s, _t) => setShowModal(false)}
          friendMode={(group || shared) ? { recipientId: savedBy.id, recipientName: savedBy.name } : undefined}
          onResponded={() => setResponded(true)}
          alreadyResponded={responded}
        />
      )}
    </>
  )
}

export default FriendEventCard
