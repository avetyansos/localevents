export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  address: string
  venue: string
  category: string
  price: number
  image: string
  featured: boolean
  organizer: string
  lineup?: string[]
}

export interface Category {
  name: string
  slug: string
  icon: string
  color: string
}

