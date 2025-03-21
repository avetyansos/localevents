import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    id: "music",
    name: "Music",
    description: "Concerts, festivals, live performances, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 42,
    color: "from-red-500/20 to-red-500/5",
  },
  {
    id: "food-drink",
    name: "Food & Drink",
    description: "Food festivals, wine tastings, cooking classes, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 38,
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    id: "arts",
    name: "Arts",
    description: "Exhibitions, galleries, performances, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 27,
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    id: "sports",
    name: "Sports",
    description: "Games, tournaments, fitness classes, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 31,
    color: "from-green-500/20 to-green-500/5",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, theater, comedy shows, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 35,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    id: "culture",
    name: "Culture",
    description: "Museums, historical tours, cultural celebrations, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 24,
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    id: "workshops",
    name: "Workshops",
    description: "Classes, seminars, conferences, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 29,
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    id: "community",
    name: "Community",
    description: "Meetups, networking events, volunteer opportunities, and more.",
    image: "/placeholder.svg?height=300&width=600",
    eventCount: 33,
    color: "from-pink-500/20 to-pink-500/5",
  },
]

export function CategoryList() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-to-r ${category.color} z-10`} />
            <div className="relative h-48 overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20" />
            </div>
            <div className="absolute bottom-0 left-0 p-4 z-30 text-white">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-sm opacity-90">{category.eventCount} events</p>
            </div>
          </div>
          <CardContent className="p-5">
            <p className="text-muted-foreground mb-5">{category.description}</p>
            <Button
              asChild
              variant="outline"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            >
              <Link href={`/events?category=${category.id}`} className="flex items-center">
                Browse Events
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

