import Topbar from '../components/ui/TopBar'
import { useState, useEffect } from 'react'
import { getNotifications } from './../services/notifications.services'
import NotificationCard from '../components/ui/notifications/NotificationCard'
import type { Notification } from '../types/notifications.types'

const NotificationsPage = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([])

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
      <div className="notifications__info">
        {allNotifications.length === 0 && <p>Todavía no tienes notificaciones</p>}
        {allNotifications.length > 0 && allNotifications.map((noti) => <NotificationCard key={noti.id} {...noti} onRefresh={getAllNotifications} />)}
      </div>
    </>
  )
}

export default NotificationsPage
