import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Notification } from '../../../types/notifications.types'
import Button from '../Button'
import { updateFollowRequest } from '../../../services/followRequest.services'
import { deleteNotification, markNotificationRead } from '../../../services/notifications.services'
import { removeFollow } from '../../../services/follow.services'
import { useUserContext } from '../../../context/userContext'

const NotificationCard = ({ onRefresh, ...noti }: Notification) => {
  const accepted = noti.type === 'FOLLOW_ACCEPTED'
  const informational = noti.type === 'GROUP_ADDED' || noti.type === 'EVENT_SHARED'
  const [showConfirm, setShowConfirm] = useState(false)
  const [visited, setVisited] = useState(informational && noti.read)
  const { refreshProfile } = useUserContext()
  const navigate = useNavigate()

  const handleAccept = async () => {
    try {
      await updateFollowRequest(noti)
      refreshProfile()
      onRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeny = async () => {
    try {
      if (!noti.id) return
      await deleteNotification(noti.id)
      onRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemoveFriend = async () => {
    try {
      if (!noti.sender?.id) return
      await removeFollow(noti.sender.id)
      await deleteNotification(noti.id)
      await refreshProfile()
      onRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={`notification__card${accepted || visited ? ' notification__card--accepted' : ''}`}>
        <div className="notification__card--img">
          {noti.sender?.avatarUrl
            ? <img src={noti.sender.avatarUrl} alt={noti.sender.username} />
            : <span className="notification__card--img-fallback">{noti.sender?.name?.charAt(0).toUpperCase()}</span>
          }
        </div>
        <div className="notification__card--info">
          {informational ? (
            <>
              <div className="user-message">{noti.message}</div>
              {noti.groupId && (
                <div className="notification__actions">
                  <Button
                    label="Ver grupo"
                    variant="primary"
                    type="button"
                    size="md"
                    disabled={false}
                    onClick={async () => { setVisited(true); await markNotificationRead(noti.id); navigate('/grupos', { state: { groupId: noti.groupId } }) }}
                  />
                </div>
              )}
            </>
          ) : !accepted ? (
            <>
              <div className="user-message">{noti.message}</div>
              <div className="notification__actions">
                <Button label="Aceptar" variant="primary" type="button" size="md" disabled={false} onClick={handleAccept} />
                <Button label="Rechazar" variant="outline" type="button" size="md" disabled={false} onClick={handleDeny} />
              </div>
            </>
          ) : (
            <>
              <div className="user-message">
                {noti.message.split(/(ha aceptado tu solicitud de amistad|y tú sois amigos)/).map((part, i) =>
                  part === 'ha aceptado tu solicitud de amistad' || part === 'y tú sois amigos'
                    ? <span key={i} className="notification__friends-word">{part}</span>
                    : part
                )}
              </div>
              <span className="link-red" onClick={() => setShowConfirm(true)}>
                Eliminar amigo
              </span>
            </>
          )}
        </div>
      </div>

      {showConfirm && (
        <>
          <div className="modal-overlay" onClick={() => setShowConfirm(false)} />
          <div className="modal">
            <div className="confirm-modal">
              <p>¿Estás seguro de que quieres eliminar a <strong>@{noti.sender?.username}</strong> de tus amigos?</p>
              <div className="confirm-modal__btns">
                <Button label="Eliminar" variant="danger-outline" type="button" size="md" disabled={false} onClick={handleRemoveFriend} />
                <Button label="Cancelar" variant="outline" type="button" size="md" disabled={false} onClick={() => setShowConfirm(false)} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default NotificationCard
