import type { Event } from '../../types/event.types'

interface FeaturedEventCardProps extends Event {
  hero?: boolean
}

const FeaturedEventCard = ({ hero, ...event }: FeaturedEventCardProps) => {
  return (
    <div className={`featured-card${hero ? ' featured-card--hero' : ''}`}>
      <img src={event.image} alt={event.name} className="featured-card__img" />
      <div className="featured-card__overlay" />
      {/*<span className="featured-card__badge">Destacado</span>*/}
      <div className="featured-card__info">
        <p className="featured-card__name">{event.name}</p>
        <p className="featured-card__date">
          {event.venue} | {event.date}
        </p>
        <p className="featured-card__price">
          {event.priceMin != null
            ? event.priceMin === 0
              ? 'Gratis'
              : `Desde ${event.priceMin} €`
            : 'Precio disponible en la web'}
        </p>
        <div className="featured-card__actions">
          <button className="featured-card__btn">Quiero ir</button>
          <button className="featured-card__btn">Mandar a grupo</button>
          <a
            href={event.url}
            target="_blank"
            rel="noreferrer"
            className="featured-card__btn featured-card__btn--primary"
          >
            Ver evento
          </a>
        </div>
      </div>
    </div>
  )
}

export default FeaturedEventCard
