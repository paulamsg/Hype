import { useState } from 'react'
import type { Notification } from '../../../types/notifications.types'
import Button from '../Button'
import { updateFollowRequest } from '../../../services/followRequest.services'
import { deleteNotification } from '../../../services/notifications.services'
import { removeFollow } from '../../../services/follow.services'
import { useUserContext } from '../../../context/userContext'

const NotificationCard = ({ onRefresh, ...noti }: Notification) => {
  const [accepted, setAccepted] = useState(noti.type === 'FOLLOW_ACCEPTED')
  const [showConfirm, setShowConfirm] = useState(false)
  const { refreshProfile } = useUserContext()

  const handleAccept = async () => {
    try {
      await updateFollowRequest(noti)
      setAccepted(true)
      refreshProfile()
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
      <div className={`notification__card${accepted ? ' notification__card--accepted' : ''}`}>
        <div className="notification__card--img">
          {noti.sender?.avatarUrl
            ? <img src={noti.sender.avatarUrl} alt={noti.sender.username} />
            : <span className="notification__card--img-fallback">{noti.sender?.name?.charAt(0).toUpperCase()}</span>
          }
        </div>
        <div className="notification__card--info">
          {!accepted ? (
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
                {noti.sender?.name} (@{noti.sender?.username}) y tú sois <span className="notification__friends-word">amigos</span>
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
