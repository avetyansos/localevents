import { EventDetailSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <EventDetailSkeleton />
    </div>
  )
}

