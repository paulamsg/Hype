import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { getEvents } from '../services/event.services'
import { getMockEvents } from '../services/mockEvents.services'
import type { Event } from '../types/event.types'
import EventCard from '../components/ui/EventCard'
import Topbar from '../components/ui/TopBar'
import FilterBar from '../components/ui/FilterBar'
import CategoryHeader from '../components/ui/CategoryHeader'

const Discover = () => {
  const [events, setEvents] = useState<Event[]>([])
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
        (date === 'all' || e.date === date) &&
        (!price ||
          (e.priceMin != null && e.priceMax != null && e.priceMin >= price.priceMin && e.priceMax <= price.priceMax)),
    )
  }, [events, category, date, price])

  useEffect(() => {
    listEvents()
  }, [city])

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
      {loading && <p>Cargando los eventos eventos</p>}
      {isCategoryChange && categoryName !== 'all' && (
        <CategoryHeader name={categoryName} total={eventsFiltered.length} />
      )}
      <h1 className="discover__title">Todos los eventos</h1>
      <div className="grid__layout">
        {eventsFiltered.map((event: Event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </>
  )
}
export default Discover
