import { useState } from 'react'
import type { GroupDetail as GroupDetailType, GroupMember } from '../../../services/groups.services'
import { addMember, removeMember, deleteGroup, removeEventFromGroup, updateGroupName } from '../../../services/groups.services'
import { formatDate } from '../../../utils/date.utils'
import { getFriends, type Friend } from '../../../services/follow.services'
import Button from '../Button'

type Props = {
  group: GroupDetailType
  currentUserId: number
  onUpdate: () => void
  onDeleted: () => void
}

const Avatar = ({ name, avatarUrl }: { name: string; avatarUrl: string | null }) => (
  <div className="group-detail__avatar">
    {avatarUrl
      ? <img src={avatarUrl} alt={name} />
      : <span>{name.charAt(0).toUpperCase()}</span>
    }
  </div>
)

const GroupDetail = ({ group, currentUserId, onUpdate, onDeleted }: Props) => {
  const isCreator = group.createdBy === currentUserId
  const [showAddMember, setShowAddMember] = useState(false)
  const [friends, setFriends] = useState<Friend[]>([])
  const [loadingFriends, setLoadingFriends] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmLeave, setConfirmLeave] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(group.name)

  const memberIds = new Set(group.members.map((m: GroupMember) => m.id))

  const handleShowAddMember = async () => {
    setShowAddMember(true)
    setLoadingFriends(true)
    try {
      const all = await getFriends()
      setFriends(all.filter((f) => !memberIds.has(f.id)))
    } finally {
      setLoadingFriends(false)
    }
  }

  const handleAddMember = async (friendId: number) => {
    await addMember(group.id, friendId)
    onUpdate()
    setShowAddMember(false)
  }

  const handleRemoveMember = async (memberId: number) => {
    await removeMember(group.id, memberId)
    onUpdate()
  }

  const handleLeave = async () => {
    await removeMember(group.id, currentUserId)
    onDeleted()
  }

  const handleDelete = async () => {
    await deleteGroup(group.id)
    onDeleted()
  }

  const handleRemoveEvent = async (groupEventId: number) => {
    await removeEventFromGroup(group.id, groupEventId)
    onUpdate()
  }

  const handleSaveName = async () => {
    if (!nameInput.trim() || nameInput === group.name) { setEditingName(false); return }
    await updateGroupName(group.id, nameInput.trim())
    setEditingName(false)
    onUpdate()
  }

  return (
    <div className="group-detail">
      <div className="group-detail__header">
        {editingName ? (
          <div className="group-detail__name-edit">
            <input
              className="group-detail__name-input"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSaveName(); if (e.key === 'Escape') setEditingName(false) }}
              autoFocus
            />
            <button className="group-detail__name-save" onClick={handleSaveName}>Guardar</button>
            <button className="group-detail__name-cancel" onClick={() => { setEditingName(false); setNameInput(group.name) }}>✕</button>
          </div>
        ) : (
          <>
            <h2 className="group-detail__name">{group.name}</h2>
            {isCreator && (
              <button className="group-detail__edit-btn" onClick={() => setEditingName(true)}>Editar</button>
            )}
            {isCreator && <span className="group-detail__creator-badge">Creador</span>}
          </>
        )}
      </div>

      {/* Miembros */}
      <section className="group-detail__section">
        <h3 className="group-detail__section-title">Miembros ({group.members.length})</h3>
        <ul className="group-detail__members">
          {group.members.map((m) => (
            <li key={m.id} className="group-detail__member">
              <Avatar name={m.name} avatarUrl={m.avatarUrl} />
              <div className="group-detail__member-info">
                <span className="group-detail__member-name">{m.name} {m.lastName}</span>
                <span className="group-detail__member-username">@{m.username}</span>
              </div>
              {m.id === group.createdBy && (
                <span className="group-detail__member-badge">Creador</span>
              )}
              {isCreator && m.id !== currentUserId && (
                <button className="group-detail__remove-btn" onClick={() => handleRemoveMember(m.id)}>✕</button>
              )}
            </li>
          ))}
        </ul>

        {isCreator && !showAddMember && (
          <button className="group-detail__add-member-btn" onClick={handleShowAddMember}>
            + Añadir amigo
          </button>
        )}

        {showAddMember && (
          <div className="group-detail__add-member">
            <div className="group-detail__add-member-header">
              <span>Selecciona un amigo</span>
              <button className="friends-modal__close" onClick={() => setShowAddMember(false)}>✕</button>
            </div>
            {loadingFriends ? (
              <p className="group-detail__empty-text">Cargando...</p>
            ) : friends.length === 0 ? (
              <p className="group-detail__empty-text">Todos tus amigos ya están en el grupo</p>
            ) : (
              <ul className="group-detail__friend-list">
                {friends.map((f) => (
                  <li key={f.id} className="group-detail__friend-item" onClick={() => handleAddMember(f.id)}>
                    <Avatar name={f.name} avatarUrl={f.avatarUrl} />
                    <div className="group-detail__member-info">
                      <span className="group-detail__member-name">{f.name} {f.lastName}</span>
                      <span className="group-detail__member-username">@{f.username}</span>
                    </div>
                    <span className="group-detail__add-icon">+</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* Eventos */}
      <section className="group-detail__section">
        <h3 className="group-detail__section-title">Eventos ({group.events.length})</h3>
        {group.events.length === 0 ? (
          <p className="group-detail__empty-text">Nadie ha compartido eventos aún.</p>
        ) : (
          <ul className="group-detail__events">
            {group.events.map((e) => (
              <li key={e.id} className="group-detail__event">
                <div className="group-detail__event-img">
                  {e.image && <img src={e.image} alt={e.name ?? ''} />}
                </div>
                <div className="group-detail__event-info">
                  <p className="group-detail__event-title">{e.name}</p>
                  <p className="group-detail__event-meta">{e.city} · {formatDate(e.date)}</p>
                  <p className="group-detail__event-shared">
                    Compartido por <strong>@{e.sharedBy.username}</strong>
                  </p>
                  <div className="group-detail__event-actions">
                    {e.sharedBy.id === currentUserId ? (
                      <button className="group-detail__event-remove" onClick={() => handleRemoveEvent(e.id)}>Eliminar</button>
                    ) : (
                      <>
                        <Button label="Ir juntos" variant="primary" type="button" size="sm" disabled={false} />
                        <Button label="No me interesa" variant="outline" type="button" size="sm" disabled={false} />
                        {isCreator && (
                          <button className="group-detail__event-remove" onClick={() => handleRemoveEvent(e.id)}>Eliminar</button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Acciones de grupo */}
      <div className="group-detail__footer">
        {isCreator ? (
          confirmDelete ? (
            <div className="group-detail__confirm">
              <p>¿Eliminar el grupo para todos?</p>
              <div className="group-detail__confirm-btns">
                <Button label="Sí, eliminar" variant="danger-outline" type="button" size="sm" disabled={false} onClick={handleDelete} />
                <Button label="Cancelar" variant="outline" type="button" size="sm" disabled={false} onClick={() => setConfirmDelete(false)} />
              </div>
            </div>
          ) : (
            <span className="link-red" onClick={() => setConfirmDelete(true)}>Eliminar grupo</span>
          )
        ) : (
          confirmLeave ? (
            <div className="group-detail__confirm">
              <p>¿Abandonar el grupo?</p>
              <div className="group-detail__confirm-btns">
                <Button label="Sí, abandonar" variant="danger-outline" type="button" size="sm" disabled={false} onClick={handleLeave} />
                <Button label="Cancelar" variant="outline" type="button" size="sm" disabled={false} onClick={() => setConfirmLeave(false)} />
              </div>
            </div>
          ) : (
            <span className="link-red" onClick={() => setConfirmLeave(true)}>Abandonar grupo</span>
          )
        )}
      </div>
    </div>
  )
}

export default GroupDetail
