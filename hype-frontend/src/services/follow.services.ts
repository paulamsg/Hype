import axios from 'axios'

export const getFriendIds = async (): Promise<number[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/follow/friend-ids`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.friendIds
}

export const removeFollow = async (followerId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/follow/${followerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
