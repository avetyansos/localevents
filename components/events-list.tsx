import { EventCard } from "@/components/event-card"
import { getEvents } from "@/lib/data"
import { Pagination } from "@/components/pagination"

interface EventsListProps {
  searchParams: {
    category?: string
    location?: string
    date?: string
    search?: string
    page?: string
  }
}

export default async function EventsList({ searchParams }: EventsListProps) {
  const page = searchParams.page ? Number.parseInt(searchParams.page) : 1

  // Handle the case where searchParams.category is "all"
  const category = searchParams.category === "all" ? undefined : searchParams.category

  // Handle the case where searchParams.location is "all"
  const location = searchParams.location === "all" ? undefined : searchParams.location

  const { events, totalPages } = await getEvents({
    category,
    location,
    date: searchParams.date,
    search: searchParams.search,
    page,
    limit: 12,
  })

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <Pagination totalPages={totalPages} currentPage={page} />
    </div>
  )
}

