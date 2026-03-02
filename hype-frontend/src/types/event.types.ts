export interface Event {
    id: string
    city: string
    name: string
    date: string
    time: string
    venue: string
    image: string
    category: string
    subGenre: string 
}
export interface EventFilters {
    city?: string;
    category?: string;
    date?: string;
};