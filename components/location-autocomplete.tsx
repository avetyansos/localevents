"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { MapPin, X } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

// Mock data for countries and cities
const locations = [
  { id: "us-ny", name: "New York", country: "United States", type: "city" },
  { id: "us-la", name: "Los Angeles", country: "United States", type: "city" },
  { id: "us-ch", name: "Chicago", country: "United States", type: "city" },
  { id: "us-sf", name: "San Francisco", country: "United States", type: "city" },
  { id: "us-mi", name: "Miami", country: "United States", type: "city" },
  { id: "us-bo", name: "Boston", country: "United States", type: "city" },
  { id: "us-se", name: "Seattle", country: "United States", type: "city" },
  { id: "us-au", name: "Austin", country: "United States", type: "city" },
  { id: "uk-lo", name: "London", country: "United Kingdom", type: "city" },
  { id: "uk-ma", name: "Manchester", country: "United Kingdom", type: "city" },
  { id: "ca-to", name: "Toronto", country: "Canada", type: "city" },
  { id: "ca-va", name: "Vancouver", country: "Canada", type: "city" },
  { id: "fr-pa", name: "Paris", country: "France", type: "city" },
  { id: "de-be", name: "Berlin", country: "Germany", type: "city" },
  { id: "jp-to", name: "Tokyo", country: "Japan", type: "city" },
  { id: "au-sy", name: "Sydney", country: "Australia", type: "city" },
  { id: "us", name: "United States", type: "country" },
  { id: "uk", name: "United Kingdom", type: "country" },
  { id: "ca", name: "Canada", type: "country" },
  { id: "fr", name: "France", type: "country" },
  { id: "de", name: "Germany", type: "country" },
  { id: "jp", name: "Japan", type: "country" },
  { id: "au", name: "Australia", type: "country" },
]

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search for a location...",
}: LocationAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Set initial selected location if value is provided
  useEffect(() => {
    if (value && !selectedLocation) {
      const location = locations.find(
        (loc) => loc.name.toLowerCase() === value.toLowerCase() || loc.country.toLowerCase() === value.toLowerCase(),
      )
      if (location) {
        setSelectedLocation(`${location.name}${location.type === "city" ? `, ${location.country}` : ""}`)
      } else {
        setSelectedLocation(value)
      }
    }
  }, [value, selectedLocation])

  // Filter locations based on search query
  const filteredLocations = locations.filter((location) => {
    const query = searchQuery.toLowerCase()
    return location.name.toLowerCase().includes(query) || location.country.toLowerCase().includes(query)
  })

  // Group locations by type
  const cities = filteredLocations.filter((loc) => loc.type === "city")
  const countries = filteredLocations.filter((loc) => loc.type === "country")

  const handleSelect = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId)
    if (location) {
      const displayName = location.type === "city" ? `${location.name}, ${location.country}` : location.name

      setSelectedLocation(displayName)
      onChange(location.name)
      setOpen(false)
    }
  }

  const handleClear = () => {
    setSelectedLocation(null)
    onChange("")
    setSearchQuery("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={placeholder}
            className="pl-10 pr-10"
            value={selectedLocation || ""}
            onChange={(e) => {
              setSelectedLocation(e.target.value)
              setSearchQuery(e.target.value)
              if (!open) setOpen(true)
            }}
            onClick={() => !open && setOpen(true)}
          />
          {selectedLocation && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={(e) => {
                e.stopPropagation()
                handleClear()
              }}
            >
              <X className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[300px]" align="start">
        <Command>
          <CommandInput
            placeholder="Search location..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No locations found</CommandEmpty>
            {cities.length > 0 && (
              <CommandGroup heading="Cities">
                {cities.map((location) => (
                  <CommandItem key={location.id} value={location.id} onSelect={handleSelect}>
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{location.name}</span>
                    <span className="ml-1 text-muted-foreground text-xs">{location.country}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {countries.length > 0 && (
              <CommandGroup heading="Countries">
                {countries.map((location) => (
                  <CommandItem key={location.id} value={location.id} onSelect={handleSelect}>
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{location.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

