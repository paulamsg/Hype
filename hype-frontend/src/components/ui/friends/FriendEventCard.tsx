import type { FriendActivity } from '../../../services/savedEvents.services'
import Button from '../Button'

const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

const FOLDER_LABELS: Record<string, string> = {
  WANT_GO: 'Quiere ir',
  GOING: 'Va a asistir',
}

const PILL_CLASS: Record<string, string> = {
  WANT_GO: 'want_go',
  GOING: 'going',
  PHOTO: 'photo',
}

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

const FriendEventCard = (activity: FriendActivity) => {
  const { savedBy } = activity
  const pillKey = activity.type === 'PHOTO' ? 'PHOTO' : activity.folder
  const pillLabel = activity.type === 'PHOTO' ? 'Ha subido una foto' : FOLDER_LABELS[activity.folder]

  return (
    <div className="friend-event-card">
      <div className="friend-event-card__header">
        <Avatar savedBy={savedBy} />
        <span className="friend-event-card__user">
          {savedBy.name} <span className="friend-event-card__user-username">(@{savedBy.username})</span>
        </span>
        <span className={`friend-event-card__pill friend-event-card__pill--${PILL_CLASS[pillKey]}`}>
          {pillLabel}
        </span>
      </div>

      {activity.type === 'SAVED_EVENT' ? (
        <div className="friend-event-card__event">
          {activity.image && <img className="friend-event-card__event-img" src={activity.image} alt={activity.name} />}
          <div className="friend-event-card__event-info">
            <p className="friend-event-card__event-title">{activity.name}</p>
            <p className="friend-event-card__event-meta">{activity.city}</p>
            <p className="friend-event-card__event-meta">{activity.venue}</p>
          </div>
          <div className="friend-event-card__event-date">
            <p className="friend-event-card__event-day">{getDay(activity.date)}</p>
            <p className="friend-event-card__event-month">{getMonth(activity.date)}</p>
          </div>
        </div>
      ) : (
        <div className="friend-event-card__photo">
          <img src={activity.photoUrl} alt={activity.eventName ?? 'foto'} />
          {activity.eventName && (
            <p className="friend-event-card__photo-event">{activity.eventName}</p>
          )}
        </div>
      )}

      {activity.type === 'SAVED_EVENT' && (
        <div className="friend-event-card__actions">
          <Button label="Ver evento" variant="outline" type="button" size="sm" disabled={false} />
          <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} />
        </div>
      )}
    </div>
  )
}

export default FriendEventCard
