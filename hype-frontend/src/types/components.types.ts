export interface ButtonProps {
    label : string
    variant: "primary" | "lime" | "outline" | "outline-blue" | "ghost-w" | "danger" | "confirm"
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
}