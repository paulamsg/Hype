import { useState, useEffect } from 'react'
import type { Event } from '../../../types/event.types'
import { getMyGroups, addEventToGroup, getGroupIdsForEvent, type Group } from '../../../services/groups.services'
import { getFriends, type Friend } from '../../../services/follow.services'
import { shareEventToFriend } from '../../../services/notifications.services'

type Props = { event: Event; onClose: () => void; onSent: () => void }

const Avatar = ({ name, avatarUrl }: { name: string; avatarUrl: string | null }) => (
  <div className="share-modal__avatar">
    {avatarUrl ? <img src={avatarUrl} alt={name} /> : <span>{name.charAt(0).toUpperCase()}</span>}
  </div>
)

const ShareEventModal = ({ event, onClose, onSent }: Props) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [friends, setFriends] = useState<Friend[]>([])
  const [search, setSearch] = useState('')
  const [sentGroups, setSentGroups] = useState<Set<number>>(new Set())
  const [sentFriends, setSentFriends] = useState<Set<number>>(new Set())

  const LS_KEY = `hype_shared_friends_${event.id}`

  useEffect(() => {
    getMyGroups().then(setGroups).catch(console.error)
    getFriends().then(setFriends).catch(console.error)
    getGroupIdsForEvent(event.id)
      .then(ids => setSentGroups(new Set(ids)))
      .catch(console.error)
    const stored = JSON.parse(localStorage.getItem(LS_KEY) || '[]') as number[]
    if (stored.length) setSentFriends(new Set(stored))
  }, [])

  const handleSendToGroup = async (groupId: number) => {
    await addEventToGroup(groupId, {
      eventId: event.id,
      name: event.name,
      date: event.date,
      venue: event.venue,
      city: event.city,
      image: event.image,
    })
    setSentGroups(prev => new Set(prev).add(groupId))
    onSent()
  }

  const handleSendToFriend = async (friendId: number) => {
    await shareEventToFriend(friendId, { name: event.name, image: event.image, date: event.date, venue: event.venue, city: event.city })
    setSentFriends(prev => {
      const updated = new Set(prev).add(friendId)
      localStorage.setItem(LS_KEY, JSON.stringify([...updated]))
      return updated
    })
    onSent()
  }

  const filteredFriends = friends.filter(f =>
    `${f.name} ${f.lastName} ${f.username}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="share-modal">
          <div className="share-modal__header">
            <div>
              <h2 className="share-modal__title">Compartir evento</h2>
              <p className="share-modal__subtitle">{event.name}</p>
            </div>
            <button className="friends-modal__close" onClick={onClose}>✕</button>
          </div>

          {/* Grupos */}
          <section className="share-modal__section">
            <h3 className="share-modal__section-title">Mis grupos</h3>
            {groups.length === 0 ? (
              <p className="share-modal__empty">No tienes grupos aún</p>
            ) : (
              <ul className="share-modal__list">
                {groups.map(g => (
                  <li key={g.id} className={`share-modal__item${sentGroups.has(g.id) ? ' share-modal__item--sent' : ''}`}>
                    <div className="share-modal__item-info">
                      <span className="share-modal__item-name">{g.name}</span>
                      <span className="share-modal__item-meta">{g.memberCount} miembros</span>
                    </div>
                    <button
                      className={`share-modal__send-btn${sentGroups.has(g.id) ? ' share-modal__send-btn--sent' : ''}`}
                      onClick={() => handleSendToGroup(g.id)}
                      disabled={sentGroups.has(g.id)}
                    >
                      {sentGroups.has(g.id) ? '✓ Compartido' : 'Compartir'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Amigos */}
          <section className="share-modal__section">
            <h3 className="share-modal__section-title">Enviar a un amigo</h3>
            <input
              className="share-modal__search"
              placeholder="Buscar amigo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {filteredFriends.length === 0 ? (
              <p className="share-modal__empty">No hay amigos que coincidan</p>
            ) : (
              <ul className="share-modal__list">
                {filteredFriends.map(f => (
                  <li key={f.id} className={`share-modal__item${sentFriends.has(f.id) ? ' share-modal__item--sent' : ''}`}>
                    <Avatar name={f.name} avatarUrl={f.avatarUrl} />
                    <div className="share-modal__item-info">
                      <span className="share-modal__item-name">{f.name} {f.lastName}</span>
                      <span className="share-modal__item-meta">@{f.username}</span>
                    </div>
                    <button
                      className={`share-modal__send-btn${sentFriends.has(f.id) ? ' share-modal__send-btn--sent' : ''}`}
                      onClick={() => handleSendToFriend(f.id)}
                      disabled={sentFriends.has(f.id)}
                    >
                      {sentFriends.has(f.id) ? '✓ Compartido' : 'Compartir'}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  )
}

export default ShareEventModal
