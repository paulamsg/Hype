import { useEffect, useState } from 'react'
import { getPhotosByUser } from '../../../services/photos.services'
import { useAuth } from '../../../context/useAuth'
import type { Photo } from '../../../types/photo.types'
import { EllipsisVertical } from 'lucide-react'
import { deletePhoto } from '../../../services/photos.services'
import { useUserContext } from '../../../context/userContext'

const PhotoGallery = () => {
  const { token } = useAuth()
  const [savedPhotos, setSavedPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const { refreshProfile } = useUserContext()

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
  const handleDelete = async (photo: Photo) => {
    try {
      await deletePhoto(photo)
    } catch (e) {
      console.log(e)
    } finally {
      setSavedPhotos((prev) => prev.filter((p) => p.id !== photo.id))
      setDropdownOpen(null)
      refreshProfile()
    }
  }
  useEffect(() => {
    getSavedPhotos()
  }, [])

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
          <div className="photo-gallery__item-footer">
            <p className="photo-gallery__item-name">{photo.savedEvent?.name}</p>
            <div className="photo-gallery__item-menu">
              <EllipsisVertical size={12} onClick={() => setDropdownOpen(dropdownOpen === photo.id ? null : photo.id)} />
              {dropdownOpen === photo.id && (
                <div className="photo-gallery__drpdown">
                  <button onClick={() => handleDelete(photo)}>Eliminar foto</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PhotoGallery
