import { EventMapView } from "@/components/event-map-view"

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Events Map</h1>
      <p className="text-muted-foreground mb-8">Explore events happening near you on the map</p>

      <div className="h-[600px] rounded-lg overflow-hidden border">
        <EventMapView />
      </div>
    </div>
  )
}

