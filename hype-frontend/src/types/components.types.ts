export interface ButtonProps {
    label : string
    variant: "primary" | "lime" | "outline" | "outline-blue" | "ghost-w" | "danger" | "danger-outline" |"confirm";
    size?: "sm" | "md" | "lg" | "xl"
    type?: "button" | "submit"
    disabled?: boolean
    onClick?: () => void
}

export interface InputProps {
    label: string
    name: string
    type : "text" | "password"  | "search" | "email"
    placeholder : string
    value: string
    error?: string
    icon ?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface FilterBarProps {
    selectedCity: string
    onCityChange: (city: string) => void
    selectedPrice: string
    onPriceChange: (price: string) => void
    selectedCategory: string
    onCategoryChange: (category: string) => void
    selectedDate: string
    onDateChange: (category: string) => void
}

export type ProfileTab = 'fotos' | 'he-ido' | 'quiero-ir' | 'expirados';
export interface ProfileTabsProps {
    activeTab: ProfileTab
    onTabChange: (tab: ProfileTab) => void
}
export interface PhotoUploaderProps {
    onPhotosSelected: (files: File[]) => void  // avisa al padre con los archivos
}
export interface PhotoUploadModalProps {
    photos: File[]
    onClose: () => void
    onUpload: () => void
}