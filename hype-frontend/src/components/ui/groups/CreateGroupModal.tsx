import { useState } from 'react'
import { createGroup } from '../../../services/groups.services'
import Button from '../Button'
import Input from '../Input'

type Props = { onClose: () => void; onCreate: () => void }

const CreateGroupModal = ({ onClose, onCreate }: Props) => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await createGroup(name.trim())
      onCreate()
      onClose()
    } catch {
      setError('Error al crear el grupo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal">
        <div className="create-group-modal">
          <div className="create-group-modal__header">
            <h2 className="create-group-modal__title">Crear grupo</h2>
            <button className="friends-modal__close" onClick={onClose}>✕</button>
          </div>
          <form onSubmit={handleSubmit} className="create-group-modal__form">
            <Input
              label="Nombre del grupo"
              name="name"
              type="text"
              placeholder="Ej: Plan de verano"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && <p className="create-group-modal__error">{error}</p>}
            <div className="create-group-modal__actions">
              <Button label="Cancelar" variant="outline" type="button" size="md" disabled={false} onClick={onClose} />
              <Button label={loading ? 'Creando...' : 'Crear grupo'} variant="primary" type="submit" size="md" disabled={loading} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateGroupModal
