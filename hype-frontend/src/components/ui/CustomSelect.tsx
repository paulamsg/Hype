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
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

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

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right })
    }
    setOpen((prev) => !prev)
  }

  return (
    <div className={`custom-select${active ? ' custom-select--active' : ''}`} ref={ref}>
      <button type="button" className="custom-select__trigger" ref={triggerRef} onClick={handleToggle}>
        <span>{selected?.label}</span>
        <span className={`custom-select__arrow${open ? ' custom-select__arrow--open' : ''}`}>▾</span>
      </button>
      {open && (
        <ul
          className="custom-select__dropdown"
          style={{ position: 'fixed', top: dropdownPos.top, right: dropdownPos.right, left: 'auto' }}
        >
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
