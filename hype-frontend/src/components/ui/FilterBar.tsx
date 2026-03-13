import { CITIES } from "../../data/cities";
import type { FilterBarProps } from "../../types/components.types";

const FilterBar = ({selectedCity, onCityChange, selectedPrice, onPriceChange}: FilterBarProps) => {    
    return (
        <nav className="filterbar">
            <div className="filterbar__left">
                <button 
                    className="filterbar__tab topbar__tab--active"
                    onClick={() =>null}
                >
                    Todo
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Música
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Teatro
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Deportes
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Arte
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Familia
                </button>
                <button 
                    className="filterbar__tab"
                    onClick={() => null}
                >
                    Comedia
                </button>
            </div>
            
            <div className="filterbar__right">
                <div className="filterbar__date" onClick={() => null}>
                    <input type="date" name="date"/>
                </div>
                <div className="filterbar__city" onClick={() => null}>
                    <select value = {selectedCity} onChange={(e) => onCityChange(e.target.value)}>
                    {CITIES.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="filterbar__price">
                    <select value = {selectedPrice} onChange={(e) => onPriceChange(e.target.value)}>
                    <option value="all">Todos los precios</option>
                    <option value= "free">Gratis</option>
                    <option value="under10">Menos de 10€</option>
                    <option value="10-30">10€ - 30€</option>
                    <option value="30-60">30€ - 60€</option>
                    <option value="over60">Más de 60€</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}
export default FilterBar;