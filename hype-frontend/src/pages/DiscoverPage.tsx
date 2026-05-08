import { useState, useEffect, useMemo } from 'react'
import { useAuth } from '../context/useAuth'
//import { useNavigate, Link } from "react-router-dom"
import { getEvents } from '../services/event.services'
import { getMockEvents } from '../services/mockEvents.services'
import type { Event } from '../types/event.types'
import EventCard from '../components/ui/EventCard'
import Topbar from '../components/ui/TopBar'
import FilterBar from '../components/ui/FilterBar'
//import jsonEvents from "../mocks/eventsData.json"

const Discover = () => {
  const [events, setEvents] = useState<Event[]>([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<{
    city: string
    priceLabel: string
    price: { priceMin: number; priceMax: number } | null
    category: string
    date: string
  }>({
    city: user?.location || 'Madrid',
    priceLabel: 'all',
    price: null,
    category: 'all',
    date: 'all',
  })

  const handleCityChange = (city: string) => {
    setFilters({
      ...filters,
      city: city,
    })
  }

  const handlePriceChange = (price: string) => {
    let priceRange: { priceMin: number; priceMax: number } | null = null
    switch (price) {
      case 'free':
        priceRange = { priceMin: 0, priceMax: 0 }
        break
      case 'under10':
        priceRange = { priceMin: 0, priceMax: 10 }
        break
      case '10-30':
        priceRange = { priceMin: 10, priceMax: 30 }
        break
      case '30-60':
        priceRange = { priceMin: 30, priceMax: 60 }
        break
      case 'over60':
        priceRange = { priceMin: 60, priceMax: 9999 }
        break
    }
    setFilters({ ...filters, priceLabel: price, price: priceRange })
  }

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: category,
    })
  }

  const handleDateChange = (date: string) => {
    setFilters({
      ...filters,
      date: date,
    })
  }

  const listEvents = async () => {
    setLoading(true)
    try {
      const data = await getEvents({
        city: filters.city,
        priceMin: filters.price?.priceMin,
        priceMax: filters.price?.priceMax,
        category: filters.category,
        date: filters.date,
      })
      const dataMock = await getMockEvents({
        city: filters.city,
        priceMin: filters.price?.priceMin,
        priceMax: filters.price?.priceMax,
        category: filters.category,
        date: filters.date,
      })
      const allEvents = [...data, ...dataMock]
      setEvents(allEvents)
    } catch (e) {
      console.log('error', e)
    } finally {
      setLoading(false)
    }
  }

  const eventsFiltered = useMemo(() => {
    return events.filter(
      (e) =>
        (filters.category === 'all' || e.category === filters.category) &&
        (filters.date === 'all' || e.date === filters.date) &&
        (!filters.price ||
          (e.priceMin != null &&
            e.priceMax != null &&
            e.priceMin >= filters.price.priceMin &&
            e.priceMax <= filters.price.priceMax)),
    )
  }, [events, filters])

  useEffect(() => {
    listEvents()
  }, [filters.city])

  return (
    <>
      <Topbar />
      <FilterBar
        selectedCity={filters.city}
        onCityChange={handleCityChange}
        selectedPrice={filters.priceLabel}
        onPriceChange={handlePriceChange}
        selectedCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        selectedDate={filters.date}
        onDateChange={handleDateChange}
      />
      {loading && <p>Cargando los eventos eventos</p>}
      <div className="grid__layout">
        {eventsFiltered.map((event: Event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </>
  )
}
export default Discover
