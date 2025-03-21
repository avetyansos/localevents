"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for events
const allEvents = [
  {
    id: "1",
    title: "Summer Music Festival",
    description: "A three-day music festival featuring top artists from around the world.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Aug 15-17, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    city: "New York",
    country: "United States",
    category: "Music",
  },
  {
    id: "2",
    title: "Food & Wine Expo",
    description: "Sample delicious cuisine and fine wines from local and international vendors.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jul 22-23, 2024",
    time: "11:00 AM - 7:00 PM",
    location: "Convention Center, Chicago",
    city: "Chicago",
    country: "United States",
    category: "Food & Drink",
  },
  {
    id: "3",
    title: "Tech Conference 2024",
    description: "Join industry leaders and innovators for the biggest tech event of the year.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Sep 5-7, 2024",
    time: "9:00 AM - 6:00 PM",
    location: "Tech Campus, San Francisco",
    city: "San Francisco",
    country: "United States",
    category: "Workshops",
  },
  {
    id: "4",
    title: "Startup Networking Mixer",
    description: "Connect with entrepreneurs, investors, and industry professionals.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jun  and industry professionals.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jun 28, 2024",
    time: "6:00 PM - 9:00 PM",
    location: "Innovation Hub, Boston",
    city: "Boston",
    country: "United States",
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
    city: "Los Angeles",
    country: "United States",
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
    city: "Austin",
    country: "United States",
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
    city: "Seattle",
    country: "United States",
    category: "Food & Drink",
  },
  {
    id: "8",
    title: "Film Festival",
    description: "Screenings of independent films from around the world.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Aug 3-10, 2024",
    time: "Various times",
    location: "Cinema Center, Portland",
    city: "Portland",
    country: "United States",
    category: "Entertainment",
  },
  {
    id: "9",
    title: "Historical Walking Tour",
    description: "Explore the rich history of the city with expert guides.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Downtown, Philadelphia",
    city: "Philadelphia",
    country: "United States",
    category: "Culture",
  },
  {
    id: "10",
    title: "Coding Workshop",
    description: "Learn the basics of web development in this hands-on workshop.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Jul 8, 2024",
    time: "9:00 AM - 4:00 PM",
    location: "Tech Hub, Denver",
    city: "Denver",
    country: "United States",
    category: "Workshops",
  },
  {
    id: "11",
    title: "London Symphony Orchestra",
    description: "A night of classical masterpieces performed by the renowned orchestra.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Aug 12, 2024",
    time: "7:30 PM - 10:00 PM",
    location: "Royal Albert Hall, London",
    city: "London",
    country: "United Kingdom",
    category: "Music",
  },
  {
    id: "12",
    title: "Paris Fashion Week",
    description: "Showcasing the latest collections from top designers.",
    image: "/placeholder.svg?height=200&width=300",
    date: "Sep 23-30, 2024",
    time: "Various times",
    location: "Grand Palais, Paris",
    city: "Paris",
    country: "France",
    category: "Arts",
  },
]

interface EventListProps {
  searchQuery?: string
  category?: string
  location?: string
  date?: string
  currentPage: number
}

export function EventList({ searchQuery, category, location, date, currentPage = 1 }: EventListProps) {
  const [filteredEvents, setFilteredEvents] = useState(allEvents)
  const [totalPages, setTotalPages] = useState(1)
  const eventsPerPage = 6

  useEffect(() => {
    // Filter events based on search parameters
    let filtered = [...allEvents]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (event) => event.title.toLowerCase().includes(query) || event.description.toLowerCase().includes(query),
      )
    }

    if (category) {
      filtered = filtered.filter((event) => event.category.toLowerCase() === category.toLowerCase())
    }

    if (location) {
      const locationLower = location.toLowerCase()
      filtered = filtered.filter(
        (event) =>
          event.location.toLowerCase().includes(locationLower) ||
          event.city.toLowerCase().includes(locationLower) ||
          event.country.toLowerCase().includes(locationLower),
      )
    }

    if (date) {
      filtered = filtered.filter((event) => event.date.includes(date))
    }

    setFilteredEvents(filtered)
    setTotalPages(Math.ceil(filtered.length / eventsPerPage))
  }, [searchQuery, category, location, date])

  // Get current events for pagination
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent)

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No events found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
        <Button asChild>
          <Link href="/events">Clear all filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid gap-6">
        {currentEvents.map((event) => (
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

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/events?page=${currentPage - 1}`} />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink href={`/events?page=${i + 1}`} isActive={currentPage === i + 1}>
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/events?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

