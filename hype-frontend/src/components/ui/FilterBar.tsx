//import type {EventFilters} from '../../types/event.types'

const FilterBar = (/*{city, category, startDateTime, endDateTime}: EventFilters*/) => {
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
                    <select name="select">
                    <option value="value1">Value 1</option>
                    <option value="value2" selected>Ciudad</option>
                    <option value="value3">Value 3</option>
                    </select>
                </div>
                <div className="filterbar__price" onClick={() => null}>
                    <select name="select">
                    <option value="value1">Value 1</option>
                    <option value="value2" selected>Precio</option>
                    <option value="value3">Value 3</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}
export default FilterBar;