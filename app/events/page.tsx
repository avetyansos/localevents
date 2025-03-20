import { Suspense } from "react"
import EventsList from "@/components/events-list"
import EventsFilter from "@/components/events-filter"
import { EventsSkeleton } from "@/components/skeletons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Events | LocalEvents",
  description: "Browse all local events happening near you.",
}

interface EventsPageProps {
  searchParams: {
    category?: string
    location?: string
    date?: string
    search?: string
    page?: string
  }
}

export default function EventsPage({ searchParams }: EventsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Events</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <EventsFilter />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<EventsSkeleton />}>
            <EventsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

