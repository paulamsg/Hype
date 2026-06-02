import Topbar from '../components/ui/TopBar'
import { useState, useEffect } from 'react'
import { getNotifications } from './../services/notifications.services'
import NotificationCard from '../components/ui/notifications/NotificationCard'
import type { Notification } from '../types/notifications.types'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const NotificationsPage = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([])
  const navigate = useNavigate()
  const getAllNotifications = async () => {
    try {
      const data = await getNotifications()
      setAllNotifications(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllNotifications()
  }, [])

  return (
    <>
      <Topbar />
      <div className="notifications">
        <h1>Notificaciones</h1>
      </div>
      <div className={`notifications__info${allNotifications.length > 0 ? ' notifications__info--filled' : ''}`}>
        {allNotifications.length === 0 && (
          <>
            <p>Todavía no tienes notificaciones</p>
            <Button
              label="Buscar amigos"
              variant="primary"
              type="button"
              size="md"
              disabled={false}
              onClick={() => navigate('/amigos')}
            />
          </>
        )}
        {allNotifications.length > 0 &&
          allNotifications.map((noti) => <NotificationCard key={noti.id} {...noti} onRefresh={getAllNotifications} />)}
      </div>
    </>
  )
}

export default NotificationsPage
