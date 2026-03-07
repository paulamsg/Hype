import type { InputProps } from "../../types/components.types";

const Input = ({label, name, type,placeholder,value, icon, error, onChange}:InputProps) => {
    return (
        <div className={`input-wrap ${error ? "input-wrap--error" : ""}`}>
            {label && <label htmlFor={name}>{label}</label>}
            <div className="input-inner">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    )
}
export default Input