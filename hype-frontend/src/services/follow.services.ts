import axios from 'axios'

export const removeFollow = async (followerId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/follow/${followerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
