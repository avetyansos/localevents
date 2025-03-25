"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X, Filter, CalendarIcon } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { Suspense, useState, useEffect, useCallback } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

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

function EventsHorizontalFilterContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || [],
  )
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get("location") || "")
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date") as string) : undefined,
  )

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        updateFilters({ search })
      } else if (searchParams.has("search")) {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.delete("search")
        router.push(`${pathname}?${newParams.toString()}`)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [search, pathname, router, searchParams])

  const updateFilters = useCallback(
    (updates: Record<string, string | string[] | Date | undefined>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      // Reset page to 1 when filters change
      newParams.set("page", "1")

      // Update params based on provided updates
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(key)
        } else if (key === "date" && value instanceof Date) {
          newParams.set(key, value.toISOString().split("T")[0])
        } else if (Array.isArray(value)) {
          newParams.set(key, value.join(","))
        } else {
          newParams.set(key, String(value))
        }
      })

      router.push(`${pathname}?${newParams.toString()}`)
    },
    [searchParams, pathname, router],
  )

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  useEffect(() => {
    if (selectedCategories.length > 0) {
      updateFilters({ category: selectedCategories })
    } else if (searchParams.has("category")) {
      updateFilters({ category: [] })
    }
  }, [selectedCategories, updateFilters, searchParams])

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = e.target.value
    setSelectedLocation(location)
    updateFilters({ location })
  }

  const handleDateChange = (date: Date | undefined) => {
    setDate(date)
    updateFilters({ date })
  }

  const handleReset = () => {
    setSearch("")
    setSelectedCategories([])
    setSelectedLocation("")
    setDate(undefined)
    router.push(pathname)
  }

  // Count active filters
  const activeFilterCount = [
    search ? 1 : 0,
    selectedCategories.length > 0 ? 1 : 0,
    selectedLocation ? 1 : 0,
    date ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <div className="bg-background border rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search events"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto justify-start">
                <Filter className="mr-2 h-4 w-4" />
                Categories
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.value}`}
                        checked={selectedCategories.includes(category.value)}
                        onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
                      />
                      <label htmlFor={`category-${category.value}`} className="text-sm cursor-pointer">
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Location */}
        <div>
          <select
            value={selectedLocation}
            onChange={handleLocationChange}
            className="h-10 w-full md:w-auto px-3 py-2 rounded-md border border-input bg-background text-sm"
            aria-label="Select location"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full md:w-auto justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus className="rounded-md" />
            </PopoverContent>
          </Popover>
        </div>

        {/* Reset */}
        {activeFilterCount > 0 && (
          <div>
            <Button variant="ghost" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Reset filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function EventsHorizontalFilter() {
  return (
    <Suspense fallback={<EventsHorizontalFilterFallback />}>
      <EventsHorizontalFilterContent />
    </Suspense>
  )
}

function EventsHorizontalFilterFallback() {
  return (
    <div className="bg-background border rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="h-10 w-full rounded-md border border-input bg-background"></div>
        </div>
        <div>
          <div className="h-10 w-full md:w-[120px] rounded-md border border-input bg-background"></div>
        </div>
        <div>
          <div className="h-10 w-full md:w-[150px] rounded-md border border-input bg-background"></div>
        </div>
        <div>
          <div className="h-10 w-full md:w-[150px] rounded-md border border-input bg-background"></div>
        </div>
      </div>
    </div>
  )
}

