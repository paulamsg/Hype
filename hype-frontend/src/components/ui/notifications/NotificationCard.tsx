import type { Notification } from '../../../types/notifications.types'
import Button from '../Button'
import { followUser } from '../../../services/follow.services'
import { deleteNotification } from '../../../services/notifications.services'
//import { useState } from 'react'

const NotificationCard = ({ ...noti }: Notification) => {
  //const [allNotifications, setAllNotifications] = useState<Notification[]>([noti])

  const handleAccept = async () => {
    try {
      if (!noti.sender?.id) return
      await followUser(noti.sender.id)
      // poner el aceptar el el followRequest
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeny = async () => {
    try {
      if (!noti.id) return
      await deleteNotification(noti.id)
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
          <div className="btn">
            <Button label="Aceptar" variant="primary" type="button" size="md" disabled={false} onClick={handleAccept} />
            <Button label="Rechazar" variant="outline" type="button" size="md" disabled={false} onClick={handleDeny} />
          </div>
        </div>
      </div>
    </>
  )
}
export default NotificationCard
