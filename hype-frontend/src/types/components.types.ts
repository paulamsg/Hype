export interface ButtonProps {
    label : string
    variant: "primary" | "lime" | "outline" | "ghost-w" | "danger" | "confirm"
    size?: "sm" | "md" | "lg" | "xl"
    type?: "button" | "submit"
    disabled?: boolean
    onClick?: () => void
}