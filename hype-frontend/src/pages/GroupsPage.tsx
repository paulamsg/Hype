import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Topbar from '../components/ui/TopBar'
import { getMyGroups, getGroupById, type Group, type GroupDetail } from '../services/groups.services'
import { useAuth } from '../context/useAuth'
import CreateGroupModal from '../components/ui/groups/CreateGroupModal'
import GroupDetailComponent from '../components/ui/groups/GroupDetail'
import { Users } from 'lucide-react'
import Button from '../components/ui/Button'

const GroupsPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const locationGroupId: number | undefined = (location.state as { groupId?: number } | null)?.groupId
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<GroupDetail | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadGroups = async () => {
    try {
      const data = await getMyGroups()
      setGroups(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadGroupDetail = async (id: number) => {
    try {
      const detail = await getGroupById(id)
      setSelectedGroup(detail)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadGroups().then(() => {
      if (locationGroupId) loadGroupDetail(locationGroupId)
    })
  }, [])

  const handleGroupUpdate = () => {
    if (selectedGroup) loadGroupDetail(selectedGroup.id)
    loadGroups()
  }

  const handleGroupDeleted = () => {
    setSelectedGroup(null)
    loadGroups()
  }

  return (
    <>
      <Topbar />
      <div className="groups">

        <div className="groups__sidebar">
          <div className="groups__sidebar-header">
            <h2 className="groups__sidebar-title">Mis grupos</h2>
            <button className="groups__create-btn" onClick={() => setShowCreateModal(true)}>+ Nuevo</button>
          </div>

          {loading ? (
            <p className="groups__empty-text">Cargando...</p>
          ) : groups.length === 0 ? (
            <p className="groups__empty-text">No tienes grupos aún</p>
          ) : (
            <ul className="groups__list">
              {groups.map((g) => (
                <li
                  key={g.id}
                  className={`groups__item${selectedGroup?.id === g.id ? ' groups__item--active' : ''}`}
                  onClick={() => loadGroupDetail(g.id)}
                >
                  <div className="groups__item-icon"><Users size={16} /></div>
                  <div className="groups__item-info">
                    <span className="groups__item-name">{g.name}</span>
                    <span className="groups__item-count">{g.memberCount} {g.memberCount === 1 ? 'miembro' : 'miembros'}</span>
                  </div>
                  {g.createdBy === user?.id && <span className="groups__item-creator-dot" title="Creador" />}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="groups__main">
          {groups.length === 0 && !loading ? (
            <div className="groups__welcome">
              <div className="groups__welcome-icon"><Users size={48} strokeWidth={1.2} /></div>
              <h2 className="groups__welcome-title">Crea tu primer grupo</h2>
              <p className="groups__welcome-text">
                Los grupos son el lugar perfecto para coordinar planes con tus amigos.
                Comparte eventos, decide quién va y organízate fácilmente.
              </p>
              <div className="groups__welcome-actions">
                <Button label="Crear un grupo" variant="primary" type="button" size="md" disabled={false} onClick={() => setShowCreateModal(true)} />
                <Button label="Buscar amigos" variant="outline" type="button" size="md" disabled={false} onClick={() => navigate('/amigos')} />
              </div>
            </div>
          ) : !selectedGroup ? (
            <div className="groups__placeholder">
              <Users size={36} strokeWidth={1.2} />
              <p>Selecciona un grupo para ver los detalles</p>
            </div>
          ) : (
            <GroupDetailComponent
              group={selectedGroup}
              currentUserId={user?.id ?? 0}
              onUpdate={handleGroupUpdate}
              onDeleted={handleGroupDeleted}
            />
          )}
        </div>
      </div>

      {showCreateModal && (
        <CreateGroupModal
          onClose={() => setShowCreateModal(false)}
          onCreate={() => { setShowCreateModal(false); loadGroups() }}
        />
      )}
    </>
  )
}

export default GroupsPage
