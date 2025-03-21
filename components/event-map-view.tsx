"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock data for events with coordinates
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    date: "Aug 15-17, 2024",
    location: "Central Park, New York",
    category: "Music",
    coordinates: { lat: 40.785091, lng: -73.968285 },
  },
  {
    id: "2",
    title: "Food & Wine Expo",
    date: "Jul 22-23, 2024",
    location: "Convention Center, Chicago",
    category: "Food & Drink",
    coordinates: { lat: 41.851, lng: -87.6298 },
  },
  {
    id: "3",
    title: "Tech Conference 2024",
    date: "Sep 5-7, 2024",
    location: "Tech Campus, San Francisco",
    category: "Workshops",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: "4",
    title: "Startup Networking Mixer",
    date: "Jun 28, 2024",
    location: "Innovation Hub, Boston",
    category: "Community",
    coordinates: { lat: 42.3601, lng: -71.0589 },
  },
  {
    id: "5",
    title: "Modern Art Exhibition",
    date: "Jul 10, 2024",
    location: "Metropolitan Gallery, Los Angeles",
    category: "Arts",
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
]

export function EventMapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Set background color
      mapElement.style.backgroundColor = "#e5e7eb"

      // Create a simple representation of a map
      const mapContent = document.createElement("div")
      mapContent.style.width = "100%"
      mapContent.style.height = "100%"
      mapContent.style.display = "flex"
      mapContent.style.alignItems = "center"
      mapContent.style.justifyContent = "center"
      mapContent.style.flexDirection = "column"
      mapContent.style.color = "#4b5563"

      const mapIcon = document.createElement("div")
      mapIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>`

      const mapText = document.createElement("div")
      mapText.textContent = `Interactive Map View`
      mapText.style.marginTop = "16px"
      mapText.style.fontSize = "18px"
      mapText.style.fontWeight = "bold"

      const mapSubtext = document.createElement("div")
      mapSubtext.textContent = `Showing ${events.length} events`
      mapSubtext.style.marginTop = "8px"
      mapSubtext.style.fontSize = "14px"

      mapContent.appendChild(mapIcon)
      mapContent.appendChild(mapText)
      mapContent.appendChild(mapSubtext)

      // Clear previous content and append new content
      mapElement.innerHTML = ""
      mapElement.appendChild(mapContent)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      <div className="absolute top-4 left-4 w-72 bg-background rounded-lg shadow-lg border overflow-hidden">
        <div className="p-3 border-b font-medium">Events List</div>
        <div className="max-h-[400px] overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className={`p-3 border-b hover:bg-muted cursor-pointer transition-colors ${
                selectedEvent === event.id ? "bg-muted" : ""
              }`}
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium line-clamp-1">{event.title}</h3>
                <Badge variant="outline" className="ml-2 shrink-0">
                  {event.category}
                </Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72">
          <Card>
            <CardContent className="p-4">
              {(() => {
                const event = events.find((e) => e.id === selectedEvent)
                if (!event) return null

                return (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge>{event.category}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <Link href={`/events/${event.id}`} className="text-sm text-primary hover:underline">
                      View details
                    </Link>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

