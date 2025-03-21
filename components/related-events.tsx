import { EventCard } from "@/components/event-card"
import { getEvents } from "@/lib/data"

interface RelatedEventsProps {
  category: string
  currentEventId: string
}

export default async function RelatedEvents({ category, currentEventId }: RelatedEventsProps) {
  const { events } = await getEvents({
    categories: [category],
    limit: 4,
    exclude: currentEventId,
  })

  if (events.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

