export interface Event {
    id: string
    name?: string
    date?: string
    time?: string
    venue?: string
    city?: string
    image?: string
    category?: string
    genre?: string
    subGenre?: string
    priceMin?: number
    priceMax?: number
    url?: string
}

export interface EventFilters {
    city?: string
    category?: string
    startDateTime?: string
    endDateTime?: string
}

