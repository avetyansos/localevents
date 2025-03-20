import type { Event, Category } from "./types"

// Mock data for events
const eventsData: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description:
      "Join us for a weekend of amazing music performances from top artists across multiple genres. Enjoy food, drinks, and a great atmosphere with fellow music lovers.\n\nThis annual festival features over 20 artists on 3 stages, with performances running from noon until midnight each day. Don't miss this unforgettable experience!",
    date: "2025-07-15",
    time: "12:00 PM - 11:00 PM",
    location: "New York",
    address: "Central Park, New York, NY 10022",
    venue: "Central Park Great Lawn",
    category: "festivals",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    organizer: "NYC Events Co.",
    lineup: ["The Melodic Minds", "Electric Pulse", "Harmony Heights", "Rhythm Collective", "Sonic Wave"],
  },
  {
    id: "2",
    title: "Tech Startup Conference",
    description:
      "Network with founders, investors, and tech enthusiasts at this premier startup event. Featuring keynote speakers, panel discussions, and networking opportunities.",
    date: "2025-08-10",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco",
    address: "747 Howard St, San Francisco, CA 94103",
    venue: "Moscone Center",
    category: "networking",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    organizer: "TechConnect",
  },
  // Additional events omitted for brevity
]

// Categories data with icon names instead of JSX
export const categoriesData: Category[] = [
  {
    name: "Concerts",
    slug: "concerts",
    icon: "music",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    name: "Festivals",
    slug: "festivals",
    icon: "ticket",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Food & Drink",
    slug: "food-drink",
    icon: "utensils",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "Networking",
    slug: "networking",
    icon: "users",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Workshops",
    slug: "workshops",
    icon: "book-open",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Arts",
    slug: "arts",
    icon: "palette",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: "trophy",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "Comedy",
    slug: "comedy",
    icon: "mic",
    color: "bg-indigo-500/10 text-indigo-500",
  },
]

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Function to get events with filtering and pagination
export async function getEvents({
  category,
  location,
  date,
  search,
  featured,
  exclude,
  page = 1,
  limit = 10,
}: {
  category?: string
  location?: string
  date?: string
  search?: string
  featured?: boolean
  exclude?: string
  page?: number
  limit?: number
}) {
  // Simulate API delay
  await delay(500)

  let filteredEvents = [...eventsData]

  // Apply filters
  if (category) {
    filteredEvents = filteredEvents.filter((event) => event.category === category)
  }

  if (location) {
    filteredEvents = filteredEvents.filter((event) => event.location.toLowerCase().includes(location.toLowerCase()))
  }

  if (date) {
    filteredEvents = filteredEvents.filter((event) => event.date === date)
  }

  if (search) {
    const searchLower = search.toLowerCase()
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.category.toLowerCase().includes(searchLower),
    )
  }

  if (featured !== undefined) {
    filteredEvents = filteredEvents.filter((event) => event.featured === featured)
  }

  if (exclude) {
    filteredEvents = filteredEvents.filter((event) => event.id !== exclude)
  }

  // Calculate pagination
  const totalEvents = filteredEvents.length
  const totalPages = Math.ceil(totalEvents / limit)
  const offset = (page - 1) * limit

  // Get paginated events
  const paginatedEvents = filteredEvents.slice(offset, offset + limit)

  return {
    events: paginatedEvents,
    totalEvents,
    totalPages,
  }
}

// Function to get a single event by ID
export async function getEvent(id: string) {
  // Simulate API delay
  await delay(300)

  return eventsData.find((event) => event.id === id) || null
}

// Function to get a category by slug
export async function getCategoryBySlug(slug: string) {
  // Simulate API delay
  await delay(200)

  return categoriesData.find((category) => category.slug === slug) || null
}

