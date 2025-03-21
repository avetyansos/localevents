import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getEvent } from "@/lib/data"
import { EventDetailSkeleton } from "@/components/skeletons"
import EventDetailWrapper from "@/components/event-detail-wrapper"
import type { Metadata } from "next"

interface EventPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const event = await getEvent(params.id)

  if (!event) {
    return {
      title: "Event Not Found | LocalEvents",
    }
  }

  return {
    title: `${event.title} | LocalEvents`,
    description: event.description,
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<EventDetailSkeleton />}>
        <EventDetailWrapper event={event} />
      </Suspense>
    </div>
  )
}

