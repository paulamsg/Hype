import axios from 'axios'
import type { UpdateUserData } from '../types/user.types'

export const updateUserData = async (user: UpdateUserData) => {
  const token = localStorage.getItem('token')
  const response = await axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/me`, user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
