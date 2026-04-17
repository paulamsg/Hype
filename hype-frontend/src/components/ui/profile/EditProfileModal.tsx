import { useRef, useState } from 'react';
import { useAuth } from "../../../context/useAuth";
import Button from '../Button';
const EditProfileModal = () =>{
    const { user } = useAuth();
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        avatarUrl: user?.avatarUrl,
        name: user?.name,
        lastname:user?.lastName,
        location:user?.location,
        bio: user?.bio,
    })

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name: name
        })
    }
    const handleLastNameChange = (lastname: string) => {
        setFormData({
            ...formData,
            lastname: lastname
        })
    }
    const handleLocationChange = (location: string) => {
        setFormData({
            ...formData,
            location: location
        })
    }
    const handleBioChange = (bio: string) => {
        setFormData({
            ...formData,
            bio: bio
        })
    }
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleFormSubmit = async() =>{
        
    }

    return (
        <>
        <div className="modal-edit">
            <div className="modal-edit__title"></div>
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
                        {preview
                            ? <img src={preview} alt="avatar preview" />
                            : user?.avatarUrl
                                ? <img src={user.avatarUrl} alt="avatar" />
                                : <span>Cambiar foto</span>
                        }
                    </div>
                    <label htmlFor="POST-name">Nombre</label>
                        <input id="POST-name" type="text" placeholder={user?.name} value={formData.name} onChange={(e) => handleNameChange(e.target.value)} />
                    <label htmlFor="POST-lastname">Apellidos</label>
                        <input id="POST-lastname" type="text" placeholder={user?.lastName} value={formData.lastname} onChange={(e) => handleLastNameChange(e.target.value)} />
                    <label htmlFor="POST-username">Username</label>
                        <input id="POST-username" type="text" value={user?.username} disabled />
                    <label htmlFor="POST-location">Localidad</label>
                        <input id="POST-location" type="text" placeholder={user?.location} value={formData.location} onChange={(e) => handleLocationChange(e.target.value)} />
                    <label htmlFor="POST-bio">Biografía</label>
                        <input id="POST-bio" type="text" placeholder={user?.bio} value={formData.bio} onChange={(e) => handleBioChange(e.target.value)} />
                    <Button
                    label="Guardar"
                    variant= "primary"
                    type="submit"
                    size="md"
                    disabled={false}
                    onClick={handleFormSubmit}
                    
                    />
                </form>
            </div>
        </div>
        </>
    )
}
export default EditProfileModal;