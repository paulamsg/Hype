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
    }
  )
  return response.data
}
