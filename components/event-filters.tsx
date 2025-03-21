"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const categories = [
  { id: "music", label: "Music" },
  { id: "food-drink", label: "Food & Drink" },
  { id: "arts", label: "Arts" },
  { id: "sports", label: "Sports" },
  { id: "entertainment", label: "Entertainment" },
  { id: "culture", label: "Culture" },
  { id: "workshops", label: "Workshops" },
  { id: "community", label: "Community" },
]

const locations = [
  { id: "new-york", label: "New York" },
  { id: "los-angeles", label: "Los Angeles" },
  { id: "chicago", label: "Chicago" },
  { id: "san-francisco", label: "San Francisco" },
  { id: "boston", label: "Boston" },
  { id: "seattle", label: "Seattle" },
  { id: "austin", label: "Austin" },
  { id: "denver", label: "Denver" },
]

interface EventFiltersProps {
  selectedCategory?: string
  selectedLocation?: string
  selectedDate?: string
}

export function EventFilters({ selectedCategory, selectedLocation, selectedDate }: EventFiltersProps) {
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(selectedDate ? new Date(selectedDate) : undefined)

  const handleCategoryChange = (categoryId: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (categoryId === selectedCategory) {
      searchParams.delete("category")
    } else {
      searchParams.set("category", categoryId)
    }

    router.push(`/events?${searchParams.toString()}`)
  }

  const handleLocationChange = (locationId: string) => {
    const searchParams = new URLSearchParams(window.location.search)

    if (locationId === selectedLocation) {
      searchParams.delete("location")
    } else {
      searchParams.set("location", locationId)
    }

    router.push(`/events?${searchParams.toString()}`)
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)

    const searchParams = new URLSearchParams(window.location.search)

    if (selectedDate) {
      searchParams.set("date", format(selectedDate, "yyyy-MM-dd"))
    } else {
      searchParams.delete("date")
    }

    router.push(`/events?${searchParams.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/events")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-sm">
          Clear all
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["categories", "locations", "date"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={category.id === selectedCategory}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="locations">
          <AccordionTrigger>Locations</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location.id}`}
                    checked={location.id === selectedLocation}
                    onCheckedChange={() => handleLocationChange(location.id)}
                  />
                  <Label htmlFor={`location-${location.id}`} className="text-sm cursor-pointer">
                    {location.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date">
          <AccordionTrigger>Date</AccordionTrigger>
          <AccordionContent>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

