import Link from "next/link"
import { Music, Ticket, Utensils, Users, BookOpen, Palette, Trophy, Mic } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    name: "Concerts",
    icon: <Music className="h-6 w-6" />,
    href: "/categories/concerts",
    color: "bg-pink-500/10 text-pink-500",
  },
  {
    name: "Festivals",
    icon: <Ticket className="h-6 w-6" />,
    href: "/categories/festivals",
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    name: "Food & Drink",
    icon: <Utensils className="h-6 w-6" />,
    href: "/categories/food-drink",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    name: "Networking",
    icon: <Users className="h-6 w-6" />,
    href: "/categories/networking",
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    name: "Workshops",
    icon: <BookOpen className="h-6 w-6" />,
    href: "/categories/workshops",
    color: "bg-green-500/10 text-green-500",
  },
  {
    name: "Arts",
    icon: <Palette className="h-6 w-6" />,
    href: "/categories/arts",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    name: "Sports",
    icon: <Trophy className="h-6 w-6" />,
    href: "/categories/sports",
    color: "bg-red-500/10 text-red-500",
  },
  {
    name: "Comedy",
    icon: <Mic className="h-6 w-6" />,
    href: "/categories/comedy",
    color: "bg-indigo-500/10 text-indigo-500",
  },
]

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.name} href={category.href}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
              <div className={`rounded-full p-3 mb-3 ${category.color}`}>{category.icon}</div>
              <h3 className="font-medium">{category.name}</h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

