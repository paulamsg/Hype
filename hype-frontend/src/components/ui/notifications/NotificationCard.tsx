import type { Notification } from '../../../types/notifications.types'
import Button from '../Button'

const NotificationCard = ({ ...noti }: Notification) => {
  return (
    <>
      <div className="notification__card">
        <div className="notification__card--img">
          {noti.sender?.avatarUrl && <img src={noti.sender.avatarUrl} alt={noti.sender.username} />}
        </div>
        <div className="notification__card--info">
          <div className="user-message">{noti.message}</div>
          <div className="btn">
            <Button
              label="Seguir también  +"
              variant="primary"
              type="button"
              size="md"
              disabled={false}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </>
  )
}
export default NotificationCard
