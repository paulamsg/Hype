export type NotificationSender = {
  id: number
  name: string
  lastName: string
  username: string
  avatarUrl: string | null
}

export type Notification = {
  id: number
  userId: number
  senderId: number | null
  type: string
  message: string
  read: boolean
  createdAt: string
  sender: NotificationSender | null
}
