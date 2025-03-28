import { Suspense } from "react"
import EventsList from "@/components/events-list"
import EventsHorizontalFilter from "@/components/events-horizontal-filter"
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

      <EventsHorizontalFilter />

      <Suspense fallback={<EventsSkeleton />}>
        <EventsList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

