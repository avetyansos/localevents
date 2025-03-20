import { EventsSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-12 w-12 bg-muted rounded-full"></div>
        <div className="h-8 w-48 bg-muted rounded"></div>
      </div>

      <EventsSkeleton />
    </div>
  )
}

