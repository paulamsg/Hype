import { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  active?: boolean
}

const CustomSelect = ({ value, onChange, options, active }: CustomSelectProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = options.find((o) => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`custom-select${active ? ' custom-select--active' : ''}`} ref={ref}>
      <button className="custom-select__trigger" onClick={() => setOpen((prev) => !prev)}>
        <span>{selected?.label}</span>
        <span className={`custom-select__arrow${open ? ' custom-select__arrow--open' : ''}`}>▾</span>
      </button>
      {open && (
        <ul className="custom-select__dropdown">
          {options.map((opt) => (
            <li
              key={opt.value}
              className={`custom-select__option${opt.value === value ? ' custom-select__option--selected' : ''}`}
              onClick={() => { onChange(opt.value); setOpen(false) }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomSelect
