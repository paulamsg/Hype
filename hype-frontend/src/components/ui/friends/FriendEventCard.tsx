import type { FriendActivity, FriendSavedEvent, FriendPhoto, FriendGroupEvent, FriendEventShared } from '../../../services/savedEvents.services'
import Button from '../Button'

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const getDay = (date?: string) => (date ? new Date(date).getDate() : '')
const getMonth = (date?: string) => (date ? MONTHS[new Date(date).getMonth()] : '')

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
      <p className="friend-event-card__event-month">{getMonth(date)}</p>
    </div>
  </div>
)

const FriendEventCard = (activity: FriendActivity) => {
  const { savedBy } = activity

  const saved   = activity.type === 'SAVED_EVENT'   ? (activity as FriendSavedEvent)  : null
  const photo   = activity.type === 'PHOTO'          ? (activity as FriendPhoto)        : null
  const group   = activity.type === 'GROUP_EVENT'    ? (activity as FriendGroupEvent)   : null
  const shared  = activity.type === 'EVENT_SHARED'   ? (activity as FriendEventShared)  : null

  const pill = saved   ? { label: 'Quiere ir',        cls: 'want_go'  }
             : group   ? { label: group.groupName,     cls: 'group'    }
             : shared  ? { label: 'Compartió contigo', cls: 'shared'   }
             :           { label: 'Ha subido una foto', cls: 'photo'   }

  return (
    <div className="friend-event-card">
      <div className="friend-event-card__header">
        <Avatar savedBy={savedBy} />
        <span className="friend-event-card__user">
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
          <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} />
        </div>
      )}

      {group && (
        <div className="friend-event-card__actions">
          <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} />
          <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} />
        </div>
      )}

      {shared && (
        <div className="friend-event-card__actions">
          <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} />
          <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} />
        </div>
      )}
    </div>
  )
}

export default FriendEventCard
