// Function to get events with filtering and pagination

// Simulate API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

// Helper function to get a beautiful placeholder image for a category
function getCategoryImage(category: string): string {
  const categoryMap: Record<string, string> = {
    Technology: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&h=600&auto=format&fit=crop",
    Outdoors: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&h=600&auto=format&fit=crop",
    "Food & Drink": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&h=600&auto=format&fit=crop",
    Music: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&h=600&auto=format&fit=crop",
    Arts: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&h=600&auto=format&fit=crop",
    Networking: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&h=600&auto=format&fit=crop",
    Wellness: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&h=600&auto=format&fit=crop",
    Workshops: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=600&auto=format&fit=crop",
    Film: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&h=600&auto=format&fit=crop",
    Literature: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&h=600&auto=format&fit=crop",
    concerts: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&h=600&auto=format&fit=crop",
    festivals: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?q=80&w=1200&h=600&auto=format&fit=crop",
    "food-drink": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&h=600&auto=format&fit=crop",
    networking: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&h=600&auto=format&fit=crop",
    workshops: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=600&auto=format&fit=crop",
    arts: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&h=600&auto=format&fit=crop",
    sports: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&h=600&auto=format&fit=crop",
    comedy: "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1200&h=600&auto=format&fit=crop",
  }

  return (
    categoryMap[category] ||
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&h=600&auto=format&fit=crop"
  )
}

const eventsData = [
  {
    id: "1",
    title: "Tech Conference 2024",
    description:
      "Join us for the leading tech conference of the year! Network with industry leaders, attend workshops, and learn about the latest innovations in technology. This two-day event features keynote speakers, panel discussions, and hands-on demonstrations of cutting-edge products.",
    location: "New York",
    date: "2024-03-15",
    time: "10:00 AM",
    address: "123 Main St",
    venue: "Convention Center",
    category: "Technology",
    price: 99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: true,
    organizer: "Tech Events Inc.",
    lineup: ["Speaker 1", "Speaker 2", "Speaker 3"],
  },
  {
    id: "2",
    title: "Outdoor Adventure Meetup",
    description:
      "Explore the great outdoors with fellow adventurers. This guided hiking trip takes you through some of the most beautiful trails in the region. Suitable for all experience levels, this event includes lunch and transportation from the meeting point.",
    location: "Colorado",
    date: "2024-04-20",
    time: "9:00 AM",
    address: "456 Mountain Rd",
    venue: "Rocky Mountains",
    category: "Outdoors",
    price: 0,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: false,
    organizer: "Adventure Group",
  },
  {
    id: "3",
    title: "Culinary Arts Workshop",
    description:
      "Learn to cook delicious meals from around the world. This hands-on workshop is led by professional chefs who will guide you through preparing a three-course meal. All ingredients and equipment are provided, and you'll get to enjoy your creations at the end!",
    location: "Paris",
    date: "2024-05-10",
    time: "6:00 PM",
    address: "789 Food St",
    venue: "Cooking School",
    category: "Food & Drink",
    price: 49,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: true,
    organizer: "Culinary Institute",
  },
  {
    id: "4",
    title: "Music Festival",
    description:
      "Enjoy live music from top artists across multiple genres. This three-day festival features over 50 performers on five stages, plus food vendors, art installations, and camping options. Don't miss the biggest music event of the year!",
    location: "London",
    date: "2024-06-22",
    time: "2:00 PM",
    address: "101 Music Ave",
    venue: "Hyde Park",
    category: "Music",
    price: 79,
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: false,
    organizer: "Music Events Ltd.",
  },
  {
    id: "5",
    title: "Art Exhibition",
    description:
      "Discover the latest in contemporary art at this curated exhibition featuring works from emerging and established artists. The exhibition includes paintings, sculptures, digital art, and interactive installations that challenge conventional perspectives.",
    location: "Berlin",
    date: "2024-07-05",
    time: "11:00 AM",
    address: "222 Art Ln",
    venue: "Art Gallery",
    category: "Arts",
    price: 19,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: true,
    organizer: "Art Society",
  },
  {
    id: "6",
    title: "AI Summit",
    description:
      "Discuss the future of artificial intelligence with industry experts, researchers, and entrepreneurs. This summit includes keynote presentations, panel discussions, and networking opportunities focused on the latest developments and ethical considerations in AI.",
    location: "San Francisco",
    date: "2024-08-12",
    time: "9:30 AM",
    address: "333 Tech Dr",
    venue: "Tech Center",
    category: "Networking",
    price: 149,
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: false,
    organizer: "AI Innovations",
  },
  {
    id: "7",
    title: "Yoga Retreat",
    description:
      "Relax and rejuvenate with yoga and meditation in a peaceful natural setting. This weekend retreat includes daily yoga sessions, meditation workshops, healthy meals, and accommodations. Suitable for all levels, from beginners to advanced practitioners.",
    location: "Bali",
    date: "2024-09-18",
    time: "7:00 AM",
    address: "444 Yoga Rd",
    venue: "Yoga Studio",
    category: "Wellness",
    price: 99,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: true,
    organizer: "Wellness Retreats",
  },
  {
    id: "8",
    title: "Photography Workshop",
    description:
      "Improve your photography skills with expert guidance from professional photographers. This workshop covers composition, lighting, editing, and more. Bring your own camera or use one provided by the organizers. All skill levels welcome!",
    location: "Rome",
    date: "2024-10-25",
    time: "10:30 AM",
    address: "555 Photo St",
    venue: "Photography School",
    category: "Workshops",
    price: 59,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: false,
    organizer: "Photo Academy",
  },
  {
    id: "9",
    title: "Film Festival",
    description:
      "Watch the latest independent films from around the world at this prestigious film festival. The program includes feature films, documentaries, short films, and animated works, with Q&A sessions with directors and actors after select screenings.",
    location: "Cannes",
    date: "2024-11-08",
    time: "1:00 PM",
    address: "666 Film Ave",
    venue: "Cinema",
    category: "Film",
    price: 29,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: true,
    organizer: "Film Society",
  },
  {
    id: "10",
    title: "Book Fair",
    description:
      "Meet authors and discover new books at this annual literary event. Browse thousands of titles from publishers big and small, attend author readings and book signings, and participate in literary discussions and workshops.",
    location: "Frankfurt",
    date: "2024-12-14",
    time: "10:00 AM",
    address: "777 Book Ln",
    venue: "Exhibition Hall",
    category: "Literature",
    price: 0,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&h=600&auto=format&fit=crop",
    featured: false,
    organizer: "Book Events",
  },
  // Add more events for each location to fix the location filter
  {
    id: "11",
    title: "New York Tech Meetup",
    description: "Monthly gathering of tech enthusiasts in New York City.",
    location: "New York",
    date: "2024-05-15",
    time: "6:00 PM",
    address: "123 Broadway",
    venue: "Tech Hub",
    category: "Networking",
    price: 0,
    image: "",
    featured: false,
    organizer: "NYC Tech",
  },
  {
    id: "12",
    title: "Los Angeles Film Screening",
    description: "Exclusive screening of upcoming independent films.",
    location: "Los Angeles",
    date: "2024-06-10",
    time: "7:00 PM",
    address: "456 Hollywood Blvd",
    venue: "Downtown Theater",
    category: "Film",
    price: 15,
    image: "",
    featured: false,
    organizer: "LA Film Society",
  },
  {
    id: "13",
    title: "Chicago Jazz Festival",
    description: "Annual jazz festival featuring local and international artists.",
    location: "Chicago",
    date: "2024-07-20",
    time: "2:00 PM",
    address: "789 Michigan Ave",
    venue: "Millennium Park",
    category: "Music",
    price: 25,
    image: "",
    featured: true,
    organizer: "Chicago Music Association",
  },
  {
    id: "14",
    title: "Miami Beach Party",
    description: "Summer beach party with DJs and live performances.",
    location: "Miami",
    date: "2024-08-05",
    time: "8:00 PM",
    address: "101 Ocean Drive",
    venue: "South Beach",
    category: "Music",
    price: 30,
    image: "",
    featured: false,
    organizer: "Miami Nights",
  },
  {
    id: "15",
    title: "Austin Music Showcase",
    description: "Showcase of local Austin musicians and bands.",
    location: "Austin",
    date: "2024-09-12",
    time: "7:30 PM",
    address: "222 6th Street",
    venue: "Music Hall",
    category: "Music",
    price: 20,
    image: "",
    featured: false,
    organizer: "Austin Music Foundation",
  },
  {
    id: "16",
    title: "Seattle Coffee Festival",
    description: "Celebration of coffee culture with tastings and workshops.",
    location: "Seattle",
    date: "2024-10-08",
    time: "10:00 AM",
    address: "333 Pike Street",
    venue: "Convention Center",
    category: "Food & Drink",
    price: 15,
    image: "",
    featured: true,
    organizer: "Seattle Coffee Association",
  },
  {
    id: "17",
    title: "San Francisco Tech Conference",
    description: "Conference focusing on the latest in tech innovation.",
    location: "San Francisco",
    date: "2024-11-15",
    time: "9:00 AM",
    address: "444 Market Street",
    venue: "Moscone Center",
    category: "Technology",
    price: 99,
    image: "",
    featured: true,
    organizer: "SF Tech Group",
  },
  {
    id: "18",
    title: "Boston Book Reading",
    description: "Author readings and book signings with renowned writers.",
    location: "Boston",
    date: "2024-12-05",
    time: "6:30 PM",
    address: "555 Boylston Street",
    venue: "Public Library",
    category: "Literature",
    price: 0,
    image: "",
    featured: false,
    organizer: "Boston Literary Society",
  },
]

const categoriesData = [
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

export async function getEvents({
  categories,
  location,
  date,
  search,
  featured,
  exclude,
  page = 1,
  limit = 10,
}: {
  categories?: string[]
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
  if (categories && categories.length > 0) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        categories.includes(event.category) || categories.includes(event.category.toLowerCase().replace(/ /g, "-")),
    )
  }

  if (location) {
    // Convert location value from URL format (e.g., "new-york") to display format (e.g., "New York")
    const locationValue = location
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    filteredEvents = filteredEvents.filter((event) => event.location === locationValue)
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

  const event = eventsData.find((event) => event.id === id)

  if (!event) {
    return null
  }

  // Ensure all required fields are present
  return {
    id: event.id,
    title: event.title || "Untitled Event",
    description: event.description || "No description available",
    date: event.date || new Date().toISOString().split("T")[0],
    time: event.time || "TBA",
    location: event.location || "TBA",
    address: event.address || "TBA",
    venue: event.venue || "TBA",
    category: event.category || "Other",
    price: typeof event.price === "number" ? event.price : 0,
    image: event.image || getCategoryImage(event.category) || "/placeholder.svg?height=600&width=1200",
    featured: !!event.featured,
    organizer: event.organizer || "Unknown Organizer",
    lineup: Array.isArray(event.lineup) ? event.lineup : [],
  }
}

export async function getCategoryBySlug(slug: string) {
  await delay(500)
  return categoriesData.find((category) => category.slug === slug)
}

