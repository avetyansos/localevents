import { EventCard } from "@/components/event-card"
import { getEvents } from "@/lib/data"

export default async function FeaturedEvents() {
  // In a real app, you would fetch featured events from an API
  const { events } = await getEvents({ featured: true, limit: 4 })

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

