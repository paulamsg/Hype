import axios from 'axios'

export type Friend = { id: number; name: string; lastName: string; username: string; avatarUrl: string | null }

export const getFriends = async (): Promise<Friend[]> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/follow/friends`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.friends
}

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
