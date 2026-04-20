export interface Photo {
  id: number
  url: string
  userId: number
  savedEventId: number
  createdAt: string
  savedEvent?: {
    eventId: string
    name: string
  }
  user?: {
    username: string
    avatarUrl: string | null
  }
}
export interface PhotoUploaderProps {
  onPhotosSelected: (files: File[]) => void
}
export interface PhotoUploadModalProps {
  photos: File[]
  onClose: () => void
  onUpload: () => void
}
