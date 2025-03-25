import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function EventCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="h-[200px] w-full rounded-t-md" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  )
}

export function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  )
}

export function EventDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>

      <Skeleton className="h-[400px] w-full rounded-lg" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />

          <Skeleton className="h-8 w-1/3 mt-6 mb-2" />
          <Skeleton className="h-[100px] w-full rounded-md" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[200px] w-full rounded-md" />
          <Skeleton className="h-[100px] w-full rounded-md" />
        </div>
      </div>

      {/* Related Events skeleton section removed */}
    </div>
  )
}

