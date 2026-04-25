import { useEffect, useState } from 'react'
import { getPhotosByUser } from '../../../services/photos.services'
import { useAuth } from '../../../context/useAuth'
import type { Photo } from '../../../types/photo.types'

const PhotoGallery = () => {
  const { token } = useAuth()
  const [savedPhotos, setSavedPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  
  const getSavedPhotos = async () => {
    setLoading(true)
    if (!token) {
      return
    }
    try {
      const data = await getPhotosByUser()
      setSavedPhotos(data.photos)
    } catch (error) {
      return console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getSavedPhotos()
  }, [token])

  if (loading) return <p className="photo-gallery__loading">Cargando fotos...</p>

  if (savedPhotos.length === 0) {
    return (
      <div className="photo-gallery__empty">
        <p>Aún no has subido ninguna foto.</p>
      </div>
    )
  }

  return (
    <div className="photo-gallery">
      {savedPhotos.map((photo) => (
        <div key={photo.id} className="photo-gallery__item">
          <img
            className="photo-gallery__item-img"
            src={photo.url}
            alt={photo.savedEvent?.eventId || 'Foto de evento'}
          />
          <p className="photo-gallery__item-name">{photo.savedEvent?.name}</p>
        </div>
      ))}
    </div>
  )
}
export default PhotoGallery;
