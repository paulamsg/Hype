export interface Photo {
    id: number;
    url: string;
    userId: number;
    savedEventId: number;
    createdAt: string;
    savedEvent?: {
        eventId: string;
    };
    user?: {
        username: string;
        avatarUrl: string | null;
    };
}
export interface PhotoUploaderProps {
    onPhotosSelected: (files: File[]) => void  // avisa al padre con los archivos
}
export interface PhotoUploadModalProps {
    photos: File[]
    onClose: () => void
    onUpload: () => void
}