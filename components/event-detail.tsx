"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Clock, MapPin, Heart } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { useState, useEffect } from "react"
import { showToast } from "./toast-container"

interface EventDetailProps {
  event: Event
}

export default function EventDetail({ event }: EventDetailProps) {
  const [isSaved, setIsSaved] = useState(false)

  // Check if event is saved in localStorage on component mount
  useEffect(() => {
    try {
      const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]")
      setIsSaved(savedEvents.some((savedEvent: Event) => savedEvent.id === event.id))
    } catch (error) {
      console.error("Error checking saved events:", error)
    }
  }, [event.id])

  const handleSaveToggle = () => {
    try {
      const savedEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]")

      if (isSaved) {
        // Remove from saved events
        const updatedSavedEvents = savedEvents.filter((savedEvent: Event) => savedEvent.id !== event.id)
        localStorage.setItem("savedEvents", JSON.stringify(updatedSavedEvents))
        setIsSaved(false)

        // Store the removed event for potential undo
        const removedEvent = event

        showToast({
          title: "Event removed",
          description: "Event has been removed from your saved events",
          onUndo: () => {
            // Handle undo action
            const currentEvents = JSON.parse(localStorage.getItem("savedEvents") || "[]")
            const restoredEvents = [...currentEvents, removedEvent]
            localStorage.setItem("savedEvents", JSON.stringify(restoredEvents))
            setIsSaved(true)

            showToast({
              title: "Event restored",
              description: "Event has been added back to your saved events",
            })
          },
        })
      } else {
        // Add to saved events
        savedEvents.push(event)
        localStorage.setItem("savedEvents", JSON.stringify(savedEvents))
        setIsSaved(true)
        showToast({
          title: "Event saved",
          description: "Event has been added to your saved events",
        })
      }
    } catch (error) {
      console.error("Error updating saved events:", error)
      showToast({
        title: "Error",
        description: "There was an error updating your saved events",
        variant: "destructive",
      })
    }
  }

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
          <Button
            variant={isSaved ? "default" : "outline"}
            size="icon"
            onClick={handleSaveToggle}
            aria-label={isSaved ? "Remove from saved events" : "Save event"}
          >
            <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
            <span className="sr-only">{isSaved ? "Remove event" : "Save event"}</span>
          </Button>
        </div>
      </div>

      <div className="relative aspect-video md:aspect-[2/1] overflow-hidden rounded-lg">
        <Image
          src={`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(event.title)}`}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About this event</h2>
            <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
          </div>

          {event.lineup && event.lineup.length > 0 && (
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
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-2">Organizer</h3>
              <p className="text-muted-foreground">{event.organizer}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

