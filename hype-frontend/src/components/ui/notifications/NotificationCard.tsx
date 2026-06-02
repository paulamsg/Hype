import { useState } from 'react'
import type { Notification } from '../../../types/notifications.types'
import Button from '../Button'
import { updateFollowRequest } from '../../../services/followRequest.services'
import { deleteNotification } from '../../../services/notifications.services'
import { removeFollow } from '../../../services/follow.services'
import { useUserContext } from '../../../context/userContext'

const NotificationCard = ({ onRefresh, ...noti }: Notification) => {
  const [accepted, setAccepted] = useState(false)
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
      await refreshProfile()
      onRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="notification__card">
        <div className="notification__card--img">
          {noti.sender?.avatarUrl && <img src={noti.sender.avatarUrl} alt={noti.sender.username} />}
        </div>
        <div className="notification__card--info">
          <div className="user-message">{noti.message}</div>

          {!accepted ? (
            <div className="btn">
              <Button label="Aceptar" variant="primary" type="button" size="md" disabled={false} onClick={handleAccept} />
              <Button label="Rechazar" variant="outline" type="button" size="md" disabled={false} onClick={handleDeny} />
            </div>
          ) : (
            <div className="btn">
              <span className="notification__friends-label">Ahora sois amigos</span>
              <Button
                label="Eliminar amigo"
                variant="danger-outline"
                type="button"
                size="md"
                disabled={false}
                onClick={() => setShowConfirm(true)}
              />
            </div>
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
