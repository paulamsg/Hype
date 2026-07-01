import { useRef, useState, useEffect } from 'react'
import { useAuth } from '../../../context/useAuth'
import Button from '../Button'
import CustomSelect from '../CustomSelect'
import { updateUserData } from '../../../services/user.services'
import { uploadImageToCloudinary } from '../../../services/claudinary.services'
import { CITIES } from '../../../mocks/cities'

const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  const { user, updateUser } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    avatarUrl: user?.avatarUrl,
    name: user?.name,
    lastName: user?.lastName,
    location: user?.location,
    bio: user?.bio,
    email: user?.email,
    username: user?.username,
    id: user?.id,
  })

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name: name,
    })
  }
  const handleLastNameChange = (lastname: string) => {
    setFormData({
      ...formData,
      lastName: lastname,
    })
  }
  const handleLocationChange = (location: string) => {
    setFormData({
      ...formData,
      location: location,
    })
  }
  const handleBioChange = (bio: string) => {
    setFormData({
      ...formData,
      bio: bio,
    })
  }
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPendingFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    setFormData({
      avatarUrl: user?.avatarUrl,
      name: user?.name,
      lastName: user?.lastName,
      location: user?.location,
      bio: user?.bio,
      email: user?.email,
      username: user?.username,
      id: user?.id,
    })
  }, [user])

  const handleFormSubmit = async () => {
    try {
      setUploading(true)
      let data = { ...formData }
      if (pendingFile) {
        const url = await uploadImageToCloudinary(pendingFile)
        data = { ...data, avatarUrl: url }
      }
      await updateUserData(data)
      updateUser(data)
    } catch (e) {
      console.log('error', e)
    } finally {
      setUploading(false)
      onClose()
    }
  }

  return (
    <>
      <div className="modal-edit">
        <div className="modal-edit__form">
          <form>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
            <div onClick={() => inputRef.current?.click()} className="modal-edit__avatar">
              {preview ? (
                <img src={preview} alt="avatar preview" />
              ) : user?.avatarUrl ? (
                <img src={user.avatarUrl} alt="avatar" />
              ) : (
                <span>Cambiar foto</span>
              )}
            </div>
            <label htmlFor="POST-name">Nombre</label>
            <input
              id="POST-name"
              type="text"
              placeholder={user?.name}
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
            <label htmlFor="POST-lastname">Apellidos</label>
            <input
              id="POST-lastname"
              type="text"
              placeholder={user?.lastName}
              value={formData.lastName}
              onChange={(e) => handleLastNameChange(e.target.value)}
            />
            <label htmlFor="POST-username">Username</label>
            <input id="POST-username" type="text" value={user?.username} disabled />
            <label>Localidad</label>
            <CustomSelect
              value={formData.location ?? ''}
              onChange={handleLocationChange}
              options={CITIES.map((city) => ({ value: city, label: city }))}
            />
            <label htmlFor="POST-bio">Biografía</label>
            <input
              id="POST-bio"
              type="text"
              placeholder={user?.bio}
              value={formData.bio}
              onChange={(e) => handleBioChange(e.target.value)}
            />
            <Button label="Cancelar" variant="outline" type="button" size="md" disabled={false} onClick={onClose} />
            <Button
              label={uploading ? 'Guardando...' : 'Guardar'}
              variant="primary"
              type="button"
              size="md"
              disabled={uploading}
              onClick={handleFormSubmit}
            />
          </form>
        </div>
      </div>
    </>
  )
}
export default EditProfileModal
