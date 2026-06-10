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

export const searchUser = async (value: String) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/search?user=${value}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getAllUsers = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getFriendsCount = async (): Promise<{ followersCount: number; followingCount: number }> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/me/friends-count`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export type PublicProfile = {
  user: { id: number; name: string; lastName: string; username: string; bio?: string; location: string; avatarUrl?: string }
  isFriend: boolean
  stats: { photosCount: number; friendsCount: number }
}

export const getUserProfile = async (userId: number): Promise<PublicProfile> => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${userId}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getUserPhotos = async (userId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${userId}/photos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const getUserGoneEvents = async (userId: number) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${userId}/gone`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
