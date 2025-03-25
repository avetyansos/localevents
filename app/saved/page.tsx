import SavedEvents from "@/components/saved-events"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saved Events | LocalEvents",
  description: "View your saved events.",
}

export default function SavedEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Saved Events</h1>
      <SavedEvents />
    </div>
  )
}

