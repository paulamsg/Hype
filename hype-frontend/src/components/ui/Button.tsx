import type {ButtonProps} from '../../types/components.types'

const Button = ({label,variant, size, type , disabled , onClick}: ButtonProps) => {
    return (
        <button
            className={`btn btn-${variant} ${size ? `btn-${size}` : ""}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export default Button;