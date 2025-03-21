import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

// Mock data for featured events
const featuredEvents = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "A three-day music festival featuring top artists from around the world.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Aug 15-17, 2024",
    location: "Central Park, New York",
    category: "Music",
  },
  {
    id: "2",
    title: "Food & Wine Expo",
    description: "Sample delicious cuisine and fine wines from local and international vendors.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Jul 22-23, 2024",
    location: "Convention Center, Chicago",
    category: "Food & Drink",
  },
  {
    id: "3",
    title: "Tech Conference 2024",
    description: "Join industry leaders and innovators for the biggest tech event of the year.",
    image: "/placeholder.svg?height=400&width=600",
    date: "Sep 5-7, 2024",
    location: "Tech Campus, San Francisco",
    category: "Workshops",
  },
]

export function FeaturedEvents() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {featuredEvents.map((event) => (
        <Link key={event.id} href={`/events/${event.id}`}>
          <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              <Badge className="absolute top-2 right-2">{event.category}</Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-1">{event.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

