import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyGroups, type Group } from '../../../services/groups.services'
import { Users } from 'lucide-react'
import Button from '../Button'

const GroupsAside = () => {
  const [groups, setGroups] = useState<Group[]>([])
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyGroups()
        setGroups(data)
      } catch {
      } finally {
        setLoaded(true)
      }
    }
    load()
  }, [])

  if (!loaded) return null

  if (groups.length === 0) {
    return (
      <div className="groups-aside groups-aside--empty">
        <div className="groups-aside__promo-icon">
          <Users size={20} />
        </div>
        <div className="groups-aside__promo-text">
          <h3 className="groups-aside__title">Grupos</h3>
          <p>Crea un grupo con tus amigos y organizad eventos juntos</p>
        </div>
        <Button
          label="Crear grupo"
          variant="primary"
          type="button"
          size="sm"
          disabled={false}
          onClick={() => navigate('/grupos')}
        />
      </div>
    )
  }

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
