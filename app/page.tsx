import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import FeaturedEvents from "@/components/featured-events"
import CategoryList from "@/components/category-list"
import { Suspense } from "react"
import { EventsSkeleton } from "@/components/skeletons"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Discover Events <span className="text-primary">Near You</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find and attend local concerts, festivals, workshops, and more happening in your area.
          </p>

          {/* Search Bar */}
          <form action="/events" method="get" className="max-w-md mx-auto mt-8 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input name="search" placeholder="Search events..." className="pl-10" />
            </div>
            <Button type="submit">Search</Button>
          </form>

          <div className="pt-4">
            <Link href="/events">
              <Button variant="outline" size="lg">
                Browse All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
        <CategoryList />
      </section>

      {/* Featured Events */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
        <Suspense fallback={<EventsSkeleton />}>
          <FeaturedEvents />
        </Suspense>
      </section>
    </div>
  )
}

