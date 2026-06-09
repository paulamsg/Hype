import axios from 'axios'

export const getNotifications = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data.notifications
}

export const deleteAllNotifications = async () => {
  const token = localStorage.getItem('token')
  await axios.delete(`${import.meta.env.VITE_SERVER_URL}/notifications`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const respondToEvent = async (recipientId: number, eventName: string, joined: boolean) => {
  const token = localStorage.getItem('token')
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/notifications/event-response`, { recipientId, eventName, joined }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const shareEventToFriend = async (
  friendId: number,
  event: { name?: string; image?: string; date?: string; venue?: string; city?: string }
) => {
  const token = localStorage.getItem('token')
  await axios.post(`${import.meta.env.VITE_SERVER_URL}/notifications/share-event`, {
    friendId,
    eventName: event.name,
    eventImage: event.image,
    eventDate: event.date,
    eventVenue: event.venue,
    eventCity: event.city,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const getUnreadCount = async (): Promise<number> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/notifications/unread-count`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.unreadCount
}

export const markNotificationRead = async (notificationId: number) => {
  const token = localStorage.getItem('token')
  await axios.patch(`${import.meta.env.VITE_SERVER_URL}/notifications/${notificationId}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const deleteNotification = async (notificationId: Number) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/notifications/${notificationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
