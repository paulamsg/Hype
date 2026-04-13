export interface Photo {
    id: number;
    url: string;
    userId: number;
    savedEventId: number;
    createdAt: string;
    savedEvent?: {
        eventId: string;
    };
    user?: {
        username: string;
        avatarUrl: string | null;
    };
}