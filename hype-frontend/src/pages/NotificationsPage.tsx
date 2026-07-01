import Topbar from '../components/ui/TopBar'
import { useState, useEffect } from 'react'
import { getNotifications, deleteAllNotifications } from './../services/notifications.services'
import { getFriendsCount } from '../services/user.services'
import NotificationCard from '../components/ui/notifications/NotificationCard'
import type { Notification } from '../types/notifications.types'
import Button from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

const NotificationsPage = () => {
  const [allNotifications, setAllNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [hasFriends, setHasFriends] = useState(false)
  const navigate = useNavigate()

  const getAllNotifications = async () => {
    try {
      const data = await getNotifications()
      setAllNotifications(data)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllNotifications()
    getFriendsCount()
      .then(({ followingCount }) => setHasFriends(followingCount > 0))
      .catch(() => {})
  }, [])

  const unread = allNotifications.filter(n => !n.read)

  return (
    <>
      <Topbar />
      <div className="notifications">
        <div className="notifications__header">
          <h1>Notificaciones</h1>
          {allNotifications.length > 0 && (
            <span
              className="link-red"
              onClick={async () => { await deleteAllNotifications(); setAllNotifications([]) }}
            >
              Borrar todas
            </span>
          )}
        </div>
      </div>
      {!loading && (
        <div className={`notifications__info${unread.length > 0 ? ' notifications__info--filled' : ''}`}>
          {unread.length === 0 && (
            <>
              <p>No hay notificaciones</p>
              {!hasFriends && (
                <Button
                  label="Buscar amigos"
                  variant="primary"
                  type="button"
                  size="md"
                  disabled={false}
                  onClick={() => navigate('/amigos')}
                />
              )}
            </>
          )}
          {allNotifications.filter(n => !n.read).map((noti) => <NotificationCard key={noti.id} {...noti} onRefresh={getAllNotifications} />)}
        </div>
      )}
    </>
  )
}

export default NotificationsPage
