import axios from 'axios'
import type { Notification } from '../types/notifications.types'

export const postFollowRequest = async (receiverId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/follow-requests`,
    { receiverId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}

export const deleteFollowRequest = async (notification: Notification) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/follow-requests/${notification.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
