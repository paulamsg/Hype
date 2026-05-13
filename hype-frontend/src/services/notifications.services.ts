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
