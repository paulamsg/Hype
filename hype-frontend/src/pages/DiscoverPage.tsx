import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getEvents } from '../services/event.services'
import { getMockEvents, getFeaturedMockEvents } from '../services/mockEvents.services'
import { isEventInDateRange } from '../utils/date.utils'
import type { Event } from '../types/event.types'
import EventCard from '../components/ui/EventCard'
import FeaturedEventCard from '../components/ui/FeaturedEventCard'
import Topbar from '../components/ui/TopBar'
import FilterBar from '../components/ui/FilterBar'
import CategoryHeader from '../components/ui/CategoryHeader'

const Discover = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isCategoryChange, setIsCategoryChange] = useState(false)
  const [categoryName, setCategoryName] = useState('')

  const city = searchParams.get('city') || user?.location || 'Madrid'
  const priceLabel = searchParams.get('price') || 'all'
  const category = searchParams.get('category') || 'all'
  const date = searchParams.get('date') || 'all'

  const getPriceRange = (label: string): { priceMin: number; priceMax: number } | null => {
    switch (label) {
      case 'free':
        return { priceMin: 0, priceMax: 0 }
      case 'under10':
        return { priceMin: 0, priceMax: 10 }
      case '10-30':
        return { priceMin: 10, priceMax: 30 }
      case '30-60':
        return { priceMin: 30, priceMax: 60 }
      case 'over60':
        return { priceMin: 60, priceMax: 9999 }
      default:
        return null
    }
  }

  const price = getPriceRange(priceLabel)

  const handleCityChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set('city', value)
      return prev
    })
  }

  const handlePriceChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set('price', value)
      return prev
    })
  }

  const handleCategoryChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set('category', value)
      setIsCategoryChange(true)
      setCategoryName(value)
      return prev
    })
  }

  const handleDateChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set('date', value)
      return prev
    })
  }

  const listEvents = async () => {
    setLoading(true)
    try {
      const data = await getEvents({ city, priceMin: price?.priceMin, priceMax: price?.priceMax, category, date })
      const dataMock = await getMockEvents({
        city,
        priceMin: price?.priceMin,
        priceMax: price?.priceMax,
        category,
        date,
      })
      setEvents([...data, ...dataMock])
      console.log('hola caracola', data[3])
    } catch (e) {
      console.log('error', e)
    } finally {
      setLoading(false)
    }
  }

  const eventsFiltered = useMemo(() => {
    return events.filter(
      (e) =>
        (category === 'all' || e.category === category) &&
        isEventInDateRange(e.date, date) &&
        (!price ||
          (e.priceMin != null && e.priceMax != null && e.priceMin >= price.priceMin && e.priceMax <= price.priceMax)),
    )
  }, [events, category, date, price])

  useEffect(() => {
    listEvents()
  }, [city])

  const loadFeatured = async () => {
    try {
      const data = await getFeaturedMockEvents()
      setFeaturedEvents(data)
    } catch (e) {
      console.log(e)
      setFeaturedEvents([])
    }
  }

  const eventsFeaturedFiltered = useMemo(() => {
    return featuredEvents.filter((e) => category === e.category)
  }, [category, featuredEvents])

  useEffect(() => {
    loadFeatured()
  }, [])
  //hacermemo de los eventos destacados
  return (
    <>
      <Topbar />
      <FilterBar
        selectedCity={city}
        onCityChange={handleCityChange}
        selectedPrice={priceLabel}
        onPriceChange={handlePriceChange}
        selectedCategory={category}
        onCategoryChange={handleCategoryChange}
        selectedDate={date}
        onDateChange={handleDateChange}
      />
      {isCategoryChange && categoryName !== 'all' && !loading && (
        <CategoryHeader name={categoryName} total={eventsFiltered.length} />
      )}

      {!loading && eventsFeaturedFiltered.length > 0 && category !== 'all' && (
        <>
          <h2 className="featured-section__title">Destacado de esta semana</h2>
          <FeaturedEventCard key={eventsFeaturedFiltered[0].id} {...eventsFeaturedFiltered[0]} hero />
        </>
      )}
      {!loading && featuredEvents.length > 0 && category === 'all' && (
        <>
          <h2 className="featured-section__title">Destacados de esta semana</h2>
          <div className="featured-grid">
            {featuredEvents.slice(0, 3).map((event) => (
              <FeaturedEventCard key={event.id} {...event} />
            ))}
          </div>
        </>
      )}

      {loading ? (
        <div className="discover__loader">
          <div className="discover__spinner" />
          <p>Buscando eventos...</p>
        </div>
      ) : (
        <>
          <h1 className="discover__title">Todos los eventos</h1>
          {eventsFiltered.length === 0 ? (
            <p className="discover__empty">
              {date !== 'all'
                ? 'No hay eventos previstos para esa fecha.'
                : 'No se han encontrado eventos con estos filtros.'}
            </p>
          ) : (
            <div className="grid__layout">
              {eventsFiltered.map((event: Event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  )
}
export default Discover
