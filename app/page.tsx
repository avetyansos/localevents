import { EventSearch } from "@/components/event-search"
import { EventCategories } from "@/components/event-categories"
import { FeaturedEvents } from "@/components/featured-events"
import { UpcomingEvents } from "@/components/upcoming-events"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Discover Local Events</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Find the best concerts, festivals, workshops and more happening near you
        </p>
        <div className="max-w-4xl">
          <EventSearch />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
        <EventCategories />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Events</h2>
        <FeaturedEvents />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Upcoming Events</h2>
        <UpcomingEvents />
      </section>
    </div>
  )
}

