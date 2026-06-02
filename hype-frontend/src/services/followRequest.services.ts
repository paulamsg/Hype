import axios from 'axios'

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

export const getPendingRequests = async (): Promise<number[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/follow-requests/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.pendingReceiverIds
}

export const cancelFollowRequest = async (receiverId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/follow-requests/${receiverId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const updateFollowRequest = async (notification: { id: number }) => {
  const token = localStorage.getItem('token')
  const response = await axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/follow-requests/${notification.id}`,
    { status: 'ACCEPTED' },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return response.data
}
