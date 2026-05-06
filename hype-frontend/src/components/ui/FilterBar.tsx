import { CITIES } from '../../mocks/cities'
import type { FilterBarProps } from '../../types/components.types'
import CustomSelect from './CustomSelect'

const DATE_OPTIONS = [
  { value: 'all', label: 'Cualquier fecha' },
  { value: 'today', label: 'Hoy' },
  { value: 'weekend', label: 'Este fin de semana' },
  { value: 'week', label: 'Esta semana' },
  { value: 'month', label: 'Este mes' },
]

const PRICE_OPTIONS = [
  { value: 'all', label: 'Todos los precios' },
  { value: 'free', label: 'Gratis' },
  { value: 'under10', label: 'Menos de 10€' },
  { value: '10-30', label: '10€ - 30€' },
  { value: '30-60', label: '30€ - 60€' },
  { value: 'over60', label: 'Más de 60€' },
]

const CITY_OPTIONS = CITIES.map((city) => ({ value: city, label: city }))

const FilterBar = ({
  selectedCity,
  onCityChange,
  selectedPrice,
  onPriceChange,
  selectedCategory,
  onCategoryChange,
  selectedDate,
  onDateChange,
}: FilterBarProps) => {
  return (
    <nav className="filterbar">
      <div className="filterbar__left">
        {(['all', 'Música', 'Teatro', 'Deportes', 'Arte', 'Familia', 'Comedia'] as const).map((cat) => (
          <div
            key={cat}
            className={`filterbar__tab-wrapper${selectedCategory === cat ? ' filterbar__tab-wrapper--active' : ''}${cat === 'all' ? ' filterbar__tab-wrapper--separator' : ''}`}
          >
            <button className="filterbar__tab" onClick={() => onCategoryChange(cat)}>
              {cat === 'all' ? 'Todo' : cat}
            </button>
          </div>
        ))}
      </div>

      <div className="filterbar__right">
        <CustomSelect value={selectedDate} onChange={onDateChange} options={DATE_OPTIONS} active={selectedDate !== 'all'} />
        <CustomSelect value={selectedCity} onChange={onCityChange} options={CITY_OPTIONS} active={selectedCity !== 'Almería'} />
        <CustomSelect value={selectedPrice} onChange={onPriceChange} options={PRICE_OPTIONS} active={selectedPrice !== 'all'} />
      </div>
    </nav>
  )
}
export default FilterBar
