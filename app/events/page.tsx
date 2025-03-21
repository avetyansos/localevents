import { EventSearch } from "@/components/event-search"
import { EventList } from "@/components/event-list"
import { EventFilters } from "@/components/event-filters"

export default function EventsPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    category?: string
    location?: string
    date?: string
    page?: string
  }
}) {
  const { q, category, location, date, page = "1" } = searchParams

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events</h1>

      <div className="mb-8">
        <EventSearch />
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <EventFilters selectedCategory={category} selectedLocation={location} selectedDate={date} />
        </div>
        <div className="md:col-span-3">
          <EventList
            searchQuery={q}
            category={category}
            location={location}
            date={date}
            currentPage={Number.parseInt(page)}
          />
        </div>
      </div>
    </div>
  )
}

