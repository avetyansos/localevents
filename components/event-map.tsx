"use client"

import { useEffect, useRef } from "react"

interface Coordinates {
  lat: number
  lng: number
}

interface EventMapProps {
  coordinates: Coordinates
}

export function EventMap({ coordinates }: EventMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

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
      mapIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-map"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>`

      const mapText = document.createElement("div")
      mapText.textContent = `Map at coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`
      mapText.style.marginTop = "8px"
      mapText.style.fontSize = "14px"

      mapContent.appendChild(mapIcon)
      mapContent.appendChild(mapText)

      // Clear previous content and append new content
      mapElement.innerHTML = ""
      mapElement.appendChild(mapContent)
    }
  }, [coordinates])

  return <div ref={mapRef} className="w-full h-full" />
}

