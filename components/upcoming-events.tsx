import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: "4",
    title: "Startup Networking Mixer",
    description: "Connect with entrepreneurs, investors, and industry professionals.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jun 28, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub, Boston",
    category: "Community",
  },
  {
    id: "5",
    title: "Modern Art Exhibition",
    description: "Featuring works from emerging contemporary artists.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jul 10, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Metropolitan Gallery, Los Angeles",
    category: "Arts",
  },
  {
    id: "6",
    title: "Yoga in the Park",
    description: "Join us for a relaxing outdoor yoga session suitable for all levels.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jun 25, 2024",
    time: "8:00 AM - 9:30 AM",
    location: "Riverside Park, Austin",
    category: "Sports",
  },
  {
    id: "7",
    title: "Craft Beer Festival",
    description: "Sample over 50 craft beers from local and regional breweries.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jul 15, 2024",
    time: "12:00 PM - 8:00 PM",
    location: "Waterfront Plaza, Seattle",
    category: "Food & Drink",
  },
]

export function UpcomingEvents() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        {upcomingEvents.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row h-full">
                <div className="relative h-48 sm:h-auto sm:w-1/3">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg line-clamp-1">{event.title}</h3>
                    <Badge>{event.category}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </div>
    </div>
  )
}

