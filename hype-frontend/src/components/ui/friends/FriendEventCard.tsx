import type { FriendEvent } from '../../../services/savedEvents.services'
import Button from '../Button'

const MONTHS = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
]

const FOLDER_LABELS: Record<string, string> = {
  WANT_GO: 'Quiere ir',
  GOING: 'Va a ir',
}

const getDay = (date?: string) => (date ? new Date(date).getDate() : '')
const getMonth = (date?: string) => (date ? MONTHS[new Date(date).getMonth()] : '')

const FriendEventCard = ({ name, date, venue, city, image, folder, savedBy }: FriendEvent) => {
  return (
    <div className="friend-event-card">
      <div className="friend-event-card__header">
        <div className="friend-event-card__avatar">
          {savedBy.avatarUrl
            ? <img src={savedBy.avatarUrl} alt={savedBy.username} />
            : <span>{savedBy.name.charAt(0).toUpperCase()}</span>
          }
        </div>
        <span className="friend-event-card__user">{savedBy.name} <span className="friend-event-card__user-username">(@{savedBy.username})</span></span>
        <span className={`friend-event-card__pill friend-event-card__pill--${folder.toLowerCase()}`}>
          {FOLDER_LABELS[folder]}
        </span>
      </div>

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

      <div className="friend-event-card__actions">
        <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} />
        <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} />
      </div>
    </div>
  )
}

export default FriendEventCard
