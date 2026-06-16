import type { Event } from '../../../types/event.types'
import { EllipsisVertical } from 'lucide-react'
import type { Folder } from '../../../types/folder.types'
import { useState, useEffect, useRef } from 'react'
import { deleteEvent, updateEventFolder } from '../../../services/savedEvents.services'
import { useUserContext } from '../../../context/userContext'
import { getDay, getMonthAbbr } from '../../../utils/date.utils'

const EventProfileCard = ({ folder, onUpdate, ...event }: Event & { folder: Folder; onUpdate: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { refreshProfile } = useUserContext()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!dropdownOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [dropdownOpen])

  const handleDelete = async (event: Event) => {
    try {
      await deleteEvent(event)
    } catch (e) {
      console.log(e)
    } finally {
      refreshProfile()
      setDropdownOpen(false)
      onUpdate()
    }
  }

  const handleMoveToFolder = async (event: Event, folder: Folder) => {
    try {
      console.log('evento + folder:', event, folder)
      await updateEventFolder(event, folder)
    } catch (e) {
      console.log(e)
    } finally {
      refreshProfile()
      setDropdownOpen(false)
      onUpdate()
    }
  }

  return (
    <div className="event-profile-card">
      <img className="event-profile-card__img" src={event.image} alt={event.name} />
      <div className="event-profile-card__info">
        <p className="event-profile-card__title">{event.name}</p>
        <p className="event-profile-card__city">{event.city}</p>
        <p className="event-profile-card__venue">{event.venue}</p>
      </div>
      <div className="event-profile-card__date">
        <p className="event-profile-card__day">{getDay(event.date)}</p>
        <p className="event-profile-card__month">{getMonthAbbr(event.date)}</p>
      </div>
      <div className="event-profile-card__update" ref={dropdownRef}>
        <EllipsisVertical size={12} onClick={() => setDropdownOpen((state) => !state)} />
        {dropdownOpen && (
          <div className="event-profile-card__dropdown">
            {folder === 'WANT_GO' && (
              <>
                <button onClick={() => handleMoveToFolder(event, 'GONE')}>Marcar como "He ido"</button>
                <button onClick={() => handleMoveToFolder(event, 'GOING')}>Marcar como "Próximo"</button>
                <button onClick={() => handleDelete(event)}>No me interesa</button>
              </>
            )}
            {folder === 'EXPIRED' && (
              <>
                <button onClick={() => handleMoveToFolder(event, 'GONE')}>Marcar como "He ido"</button>
                <button onClick={() => handleDelete(event)}>Eliminar evento</button>
              </>
            )}
            {folder === 'GOING' && <button onClick={() => handleDelete(event)}>Eliminar evento</button>}
            {folder === 'GONE' && <button onClick={() => handleDelete(event)}>Eliminar evento</button>}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventProfileCard
