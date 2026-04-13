import { useState, useEffect } from "react";
import { useAuth } from "../../../context/useAuth";
import { getSavedEvents } from "../../../services/savedEvents.services";
import type { PhotoUploadModalProps } from "../../../types/components.types";

const PhotoUploadModal = ({ photos, onClose, onUpload }: PhotoUploadModalProps) => {
    const { token } = useAuth()
    const [selectedEventId, setSelectedEventId] = useState<string>('')
    const [savedEvents, setSavedEvents] = useState<{ id: string; title: string }[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getSavedEvents()
            setSavedEvents(data.savedEvents.filter((e: { id: string; title: string | null }) => e.title !== null));
            console.log("Eventos del usuario:", savedEvents)
        }
        fetchEvents()
    }, [token])

    const handleUpload = async () => {
        if (!selectedEventId) return

        for (const file of photos) {
            const formData = new FormData()
            formData.append('photo', file)
            formData.append('savedEventId', String(selectedEventId))

            await fetch('/api/photos', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            })
        }
        onUpload()
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal photo-upload-modal" onClick={e => e.stopPropagation()}>
                <h3>Subir fotos</h3>
                <div className="upload-previews">
                    {photos.map((file, i) => (
                        <img
                            key={i}
                            src={URL.createObjectURL(file)}
                            className="upload-preview-img"
                            alt={`preview-${i}`}
                        />
                    ))}
                </div>
                <select
                    value={selectedEventId || ''}
                    onChange={e => setSelectedEventId(e.target.value)}
                >
                    <option value="">¿A qué evento pertenecen?</option>
                    {savedEvents.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.title}
                        </option>
                    ))}
                </select>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleUpload}
                        disabled={selectedEventId === ''}
                    >
                        Subir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PhotoUploadModal;
