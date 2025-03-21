import Link from "next/link"
import { Music, Utensils, Palette, Dumbbell, Ticket, Landmark, GraduationCap, Users } from "lucide-react"

const categories = [
  {
    name: "Music",
    icon: Music,
    href: "/events?category=music",
    color: "bg-red-100 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "group-hover:border-red-400",
    bgGradient: "group-hover:bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/10 dark:to-red-900/30",
  },
  {
    name: "Food & Drink",
    icon: Utensils,
    href: "/events?category=food-drink",
    color: "bg-orange-100 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "group-hover:border-orange-400",
    bgGradient:
      "group-hover:bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/10 dark:to-orange-900/30",
  },
  {
    name: "Arts",
    icon: Palette,
    href: "/events?category=arts",
    color: "bg-yellow-100 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
    borderColor: "group-hover:border-yellow-400",
    bgGradient:
      "group-hover:bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/10 dark:to-yellow-900/30",
  },
  {
    name: "Sports",
    icon: Dumbbell,
    href: "/events?category=sports",
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "group-hover:border-green-400",
    bgGradient: "group-hover:bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-900/30",
  },
  {
    name: "Entertainment",
    icon: Ticket,
    href: "/events?category=entertainment",
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "group-hover:border-blue-400",
    bgGradient: "group-hover:bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-900/30",
  },
  {
    name: "Culture",
    icon: Landmark,
    href: "/events?category=culture",
    color: "bg-indigo-100 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
    borderColor: "group-hover:border-indigo-400",
    bgGradient:
      "group-hover:bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/10 dark:to-indigo-900/30",
  },
  {
    name: "Workshops",
    icon: GraduationCap,
    href: "/events?category=workshops",
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "group-hover:border-purple-400",
    bgGradient:
      "group-hover:bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-900/30",
  },
  {
    name: "Community",
    icon: Users,
    href: "/events?category=community",
    color: "bg-pink-100 dark:bg-pink-900/20",
    textColor: "text-pink-600 dark:text-pink-400",
    borderColor: "group-hover:border-pink-400",
    bgGradient: "group-hover:bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/10 dark:to-pink-900/30",
  },
]

export function EventCategories() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="group flex flex-col items-center p-6 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-2px] hover:border-primary/40"
        >
          <div
            className={`p-4 rounded-full ${category.color} mb-4 transition-all duration-300 ${category.bgGradient} group-hover:scale-110`}
          >
            <category.icon className={`h-7 w-7 ${category.textColor}`} />
          </div>
          <span className="text-base font-medium group-hover:text-primary transition-colors">{category.name}</span>
          <div
            className={`mt-2 h-1 w-0 rounded-full ${category.textColor} transition-all duration-300 group-hover:w-12`}
          ></div>
        </Link>
      ))}
    </div>
  )
}

