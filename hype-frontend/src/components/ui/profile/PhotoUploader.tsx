import { useRef, useState } from 'react'
import type { PhotoUploaderProps } from '../../../types/components.types'
    
const PhotoUploader = ({ onPhotosSelected }: PhotoUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    // Clic en el div → fuerza clic en el input oculto
    const handleClick = () => {
        inputRef.current?.click()
    }
    // Selección desde galería
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        processFiles(files)
    }
    // Drag & drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => setIsDragging(false)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const files = Array.from(e.dataTransfer.files)
        processFiles(files)
    }

    const processFiles = (files: File[]) => {
        const imageFiles = files.filter(f => f.type.startsWith('image/'))
        if (imageFiles.length === 0) return
        onPhotosSelected(imageFiles) // ← solo avisa al padre, nada más
    }

    return (
        <>
        {/* Input oculto */}
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
        />
        {/* Zona de arrastrar/clicar */}
        <div
            className={`upload-cta ${isDragging ? 'upload-cta--dragging' : ''}`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="uc-icon">📷</div>
            <div className="uc-t">Añade fotos de tu último evento</div>
            <div className="uc-s">Arrastra aquí o haz clic para subir</div>
        </div>
        </>
    )
    }
    export default PhotoUploader