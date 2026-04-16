import { useState, useEffect } from "react";
import { useAuth } from "../../../context/useAuth";
import { getSavedEvents } from "../../../services/savedEvents.services";
import type { PhotoUploadModalProps } from "../../../types/photo.types";
import { postPhoto} from "../../../services/photos.services";
import { uploadImageToCloudinary } from "../../../services/claudinary.services";

const PhotoUploadModal = ({ photos, onClose, onUpload }: PhotoUploadModalProps) => {
    const { token } = useAuth()
    const [selectedEventId, setSelectedEventId] = useState<string>('')
    const [savedEvents, setSavedEvents] = useState<{ id: string; name: string }[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            const data = await getSavedEvents()
            setSavedEvents(data.savedEvents.filter((e: { id: string; name: string | null }) => e.name !== null));
            console.log("Eventos del usuario:", savedEvents)
        }
        fetchEvents()
    }, [token]);

    const handleUpload = async () => {
        if (!selectedEventId){
            return;
        }else{
            for (const file of photos) {
                const imageUrl = await uploadImageToCloudinary(file);
                await postPhoto({ url: imageUrl, savedEventId: selectedEventId})
        }
        onUpload() 
        }
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
                            {event.name}
                        </option>
                    ))}
                </select>
                <div className="modal-actions">
                    <button onClick={onClose}>Cancelar</button>
                    <button
                        onClick={handleUpload}
                        disabled={!selectedEventId}
                    >
                        Subir
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PhotoUploadModal;
