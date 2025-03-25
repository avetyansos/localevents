"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, X } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const categories = [
  { value: "concerts", label: "Concerts" },
  { value: "festivals", label: "Festivals" },
  { value: "food-drink", label: "Food & Drink" },
  { value: "networking", label: "Networking" },
  { value: "workshops", label: "Workshops" },
  { value: "arts", label: "Arts" },
  { value: "sports", label: "Sports" },
  { value: "comedy", label: "Comedy" },
]

const locations = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "miami", label: "Miami" },
  { value: "austin", label: "Austin" },
  { value: "seattle", label: "Seattle" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "boston", label: "Boston" },
]

function EventsFilterContent() {
  const searchParams = useSearchParams()

  // Reset handler
  const handleReset = () => {
    window.location.href = "/events"
  }

  return (
    <div className="space-y-6 sticky top-20">
      <form method="get" action="/events" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="search"
              name="search"
              placeholder="Search events..."
              className="pl-10"
              defaultValue={searchParams.get("search") || ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            defaultValue={searchParams.get("category") || ""}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <select
            id="location"
            name="location"
            defaultValue={searchParams.get("location") || ""}
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" className="w-full" defaultValue={searchParams.get("date") || ""} />
        </div>

        {/* Hidden input to ensure page is reset to 1 */}
        <input type="hidden" name="page" value="1" />

        <div className="flex flex-col gap-2">
          <Button type="submit">Apply Filters</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            <X className="mr-2 h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </form>
    </div>
  )
}

export default function EventsFilter() {
  return (
    <Suspense fallback={<EventsFilterFallback />}>
      <EventsFilterContent />
    </Suspense>
  )
}

function EventsFilterFallback() {
  return (
    <div className="space-y-6 sticky top-20">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <div className="h-10 w-full rounded-md border border-input bg-background pl-10"></div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <div className="h-10 w-full rounded-md border border-input bg-background"></div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="h-10 w-full rounded-md border border-input bg-background"></div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <div className="h-10 w-full rounded-md border border-input bg-background"></div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-10 w-full rounded-md bg-primary"></div>
          <div className="h-10 w-full rounded-md border border-input"></div>
        </div>
      </div>
    </div>
  )
}

