import Topbar from '../components/ui/TopBar'
import { useState } from 'react'
import { getNotifications } from './../services/notifications.services'

const NotificationsPage = () => {
  const [allNotifications, setAllNotifications] = useState([])

  const getAllNotifications = async () => {
    try {
      const data = await getNotifications()
      setAllNotifications(data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Topbar />

      <div className="notifications__info">
        {allNotifications.map((noti) => (
          <NotificationCard key={noti.id} {...noti} />
        ))}
      </div>
    </>
  )
}

export default NotificationsPage
