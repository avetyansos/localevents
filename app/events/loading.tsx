import { EventsSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Events</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          {/* Filter skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-10 w-full bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-10 w-full bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-10 w-full bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-20 bg-muted rounded"></div>
              <div className="h-10 w-full bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-10 w-full bg-muted rounded"></div>
              <div className="h-10 w-full bg-muted rounded"></div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <EventsSkeleton />
        </div>
      </div>
    </div>
  )
}

