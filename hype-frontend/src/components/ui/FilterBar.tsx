import { CITIES } from "../../data/cities";
import type { FilterBarProps } from "../../types/components.types";

const FilterBar = ({selectedCity, onCityChange, selectedPrice, onPriceChange, selectedCategory, onCategoryChange}: FilterBarProps) => {    
    return (
        <nav className="filterbar">
            <div className="filterbar__left">
                <button 
                    className={`filterbar__tab ${selectedCategory === "all" ? "active" : ""}`} 
                    onClick={() =>onCategoryChange("all")}
                >
                    Todo
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Música" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Música")}
                >
                    Música
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Teatro" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Teatro")}
                >
                    Teatro
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Deportes" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Deportes")}
                >
                    Deportes
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Arte" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Arte")}
                >
                    Arte
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Familia" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Familia")}
                >
                    Familia
                </button>
                <button 
                    className={`filterbar__tab ${selectedCategory === "Comedia" ? "active" : ""}`} 
                    onClick={() => onCategoryChange("Comedia")}
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