import { Music, Theater, Drama, SportShoe, HouseHeart, Palette } from 'lucide-react'
const CategoryHeader = ({ name, total }: { name: string; total: number }) => {
  return (
    <>
      <div className="category-header">
        <div className="category-header__icon">
          {name === 'Música' && <Music size={30} color="#e8ff00" />}
          {name === 'Teatro' && <Theater size={30} color="#e8ff00" />}
          {name === 'Deportes' && <SportShoe size={30} color="#e8ff00" />}
          {name === 'Arte' && <Palette size={30} color="#e8ff00" />}
          {name === 'Familia' && <HouseHeart size={30} color="#e8ff00" />}
          {name === 'Comedia' && <Drama size={30} color="#e8ff00" />}
        </div>
        <div className="category-header__info">
          <p>CATEGORÍA</p>
          <p>{name}</p>
        </div>
        <div className="category-header__count">
          <p>{total} eventos</p>
        </div>
      </div>
    </>
  )
}

export default CategoryHeader
