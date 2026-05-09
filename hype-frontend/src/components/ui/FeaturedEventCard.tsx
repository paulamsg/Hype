import type { Event } from '../../types/event.types'

const FeaturedEventCard = (event: Event) => {
  return (
    <div className="featured-card">
      <div className="featured-card__img">
        <img src={event.image} alt={event.name} />
        <span className="featured-card__badge">Destacado</span>
      </div>
      <div className="featured-card__info">
        <p className="featured-card__category">{event.category}</p>
        <p className="featured-card__name">{event.name}</p>
        <p className="featured-card__date">{event.date}</p>
        <p className="featured-card__venue">{event.venue}</p>
        <p className="featured-card__price">
          {event.priceMin != null
            ? event.priceMin === 0
              ? 'Gratis'
              : `${event.priceMin} €`
            : 'Precio disponible en la web'}
        </p>
      </div>
    </div>
  )
}

export default FeaturedEventCard
