import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyGroups, type Group } from '../../../services/groups.services'
import { Users } from 'lucide-react'

const GroupsAside = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getMyGroups().then(setGroups).catch(console.error)
  }, [])

  if (groups.length === 0) return null

  return (
    <div className="groups-aside">
      <h3 className="groups-aside__title">Mis grupos</h3>
      <ul className="groups-aside__list">
        {groups.map((g) => (
          <li key={g.id} className="groups-aside__item" onClick={() => navigate('/grupos', { state: { groupId: g.id } })}>
            <div className="groups-aside__icon"><Users size={14} /></div>
            <div className="groups-aside__info">
              <span className="groups-aside__name">{g.name}</span>
              <span className="groups-aside__count">{g.memberCount} {g.memberCount === 1 ? 'miembro' : 'miembros'}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GroupsAside
