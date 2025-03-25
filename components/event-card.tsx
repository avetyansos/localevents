import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/lib/types"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative aspect-video">
          <Image
            src={`/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge className="absolute top-2 right-2">{event.category}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm mt-2">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-muted-foreground text-sm mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
          <p className="text-muted-foreground mt-2 line-clamp-2">{event.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <span className="font-medium">{event.price === 0 ? "Free" : `$${event.price}`}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

