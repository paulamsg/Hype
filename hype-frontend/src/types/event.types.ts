
export interface Event {
    id: string
    name: string
    date: string
    time: string
    venue: string
    image: string
    category: string
    subGenre: string 
}
export interface EventFilters {
    location?: string;
    category?: string;
    date?: string;
};