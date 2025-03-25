"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, MapPin, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { showToast } from "./toast-container"
import { usePathname } from "next/navigation"

export default function SavedEvents() {
  const [savedEvents, setSavedEvents] = useState<Event[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const pathname = usePathname()

  // Load saved events from localStorage
  useEffect(() => {
    try {
      const events = JSON.parse(localStorage.getItem("savedEvents") || "[]")
      setSavedEvents(events)
    } catch (error) {
      console.error("Error loading saved events:", error)
      setSavedEvents([])
      showToast({
        title: "Error",
        description: "There was an error loading your saved events",
        variant: "destructive",
      })
    } finally {
      setIsLoaded(true)
    }
  }, [pathname]) // Re-run when pathname changes (returning from detail page)

  // Handle removing an event
  const handleRemoveEvent = (eventId: string) => {
    try {
      // Find the event being removed
      const eventToRemove = savedEvents.find((event) => event.id === eventId)
      if (!eventToRemove) return

      // Update the saved events list
      const updatedEvents = savedEvents.filter((event) => event.id !== eventId)
      localStorage.setItem("savedEvents", JSON.stringify(updatedEvents))
      setSavedEvents(updatedEvents)

      // Show toast with undo option
      showToast({
        title: "Event removed",
        description: "Event has been removed from your saved events",
        onUndo: () => {
          // Handle undo action
          const currentEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]")
          const restoredEvents = [...currentEvents, eventToRemove]
          localStorage.setItem("savedEvents", JSON.stringify(restoredEvents))
          setSavedEvents(restoredEvents)

          showToast({
            title: "Event restored",
            description: "Event has been added back to your saved events",
          })
        },
      })
    } catch (error) {
      console.error("Error removing event:", error)
      showToast({
        title: "Error",
        description: "There was an error removing the event",
        variant: "destructive",
      })
    }
  }

  if (!isLoaded) {
    return (
      <div className="h-40 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (savedEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No saved events</h3>
        <p className="text-muted-foreground mb-6">You haven't saved any events yet.</p>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden h-full transition-all hover:shadow-md">
          <Link href={`/events/${event.id}`}>
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
          </Link>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <span className="font-medium">{event.price === 0 ? "Free" : `$${event.price}`}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemoveEvent(event.id)}
              aria-label="Remove from saved events"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

