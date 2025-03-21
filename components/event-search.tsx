"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { LocationAutocomplete } from "@/components/location-autocomplete"

export function EventSearch() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (searchQuery) params.append("q", searchQuery)
    if (location) params.append("location", location)
    if (date) params.append("date", format(date, "yyyy-MM-dd"))

    router.push(`/events?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search events..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="relative md:w-64 flex-1 md:flex-none">
        <LocationAutocomplete value={location} onChange={setLocation} placeholder="City or Country" />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="md:w-64 justify-start text-left font-normal">
            <Calendar className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>

      <Button type="submit">Search</Button>
    </form>
  )
}

