import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, Share2, Heart } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/lib/types"
import RelatedEvents from "@/components/related-events"

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge>{event.category}</Badge>
            <span className="text-muted-foreground">
              by <span className="font-medium">{event.organizer}</span>
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save event</span>
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share event</span>
          </Button>
        </div>
      </div>

      <div className="relative aspect-video md:aspect-[2/1] overflow-hidden rounded-lg">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About this event</h2>
            <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
          </div>

          {event.lineup && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Lineup</h2>
              <ul className="list-disc pl-5 space-y-1">
                {event.lineup.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold mb-4">Location</h2>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium">{event.venue}</h3>
                <p className="text-muted-foreground">{event.address}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Price</span>
                <span className="text-xl font-bold">{event.price === 0 ? "Free" : `$${event.price}`}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Button className="w-full">Get Tickets</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Organizer</h3>
              <p className="text-muted-foreground">{event.organizer}</p>
              <Button variant="link" className="p-0 h-auto mt-2">
                Contact organizer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Events</h2>
        <RelatedEvents category={event.category} currentEventId={event.id} />
      </div>
    </div>
  )
}

