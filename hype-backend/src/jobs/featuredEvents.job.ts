import prisma from '../config/database'
export async function updateFeaturedEvents(): Promise<void> {
    
    const events = await prisma.mockEvent.findMany({
        where: {featured: false}
    })
    const featuredEvents = await prisma.mockEvent.findMany({
        where: { featured: true },
    });

    const eventsToNotFeatured = () => {
        if (featuredEvents.length > 0) {
            featuredEvents.forEach((event) => {
                event.featured === false;
            })
        } else {
            console.log("No hay eventos destacados todavía")
        }
    }

    const eventsToFeatured = () => {
        const shuffled = [...events].sort(() => Math.random() - 0.5)
        shuffled.slice(0, 3).forEach((event) => {
            event.featured = true;
        })
    }

    eventsToNotFeatured()
    eventsToFeatured()
}