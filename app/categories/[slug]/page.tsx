import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getCategoryBySlug } from "@/lib/data"
import EventsList from "@/components/events-list"
import { EventsSkeleton } from "@/components/skeletons"
import { Music, Ticket, Utensils, Users, BookOpen, Palette, Trophy, Mic } from "lucide-react"
import type { Metadata } from "next"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    location?: string
    date?: string
    search?: string
    page?: string
  }
}

// Helper function to get the icon component based on the icon name
function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "music":
      return <Music className="h-6 w-6" />
    case "ticket":
      return <Ticket className="h-6 w-6" />
    case "utensils":
      return <Utensils className="h-6 w-6" />
    case "users":
      return <Users className="h-6 w-6" />
    case "book-open":
      return <BookOpen className="h-6 w-6" />
    case "palette":
      return <Palette className="h-6 w-6" />
    case "trophy":
      return <Trophy className="h-6 w-6" />
    case "mic":
      return <Mic className="h-6 w-6" />
    default:
      return <Music className="h-6 w-6" />
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    return {
      title: "Category Not Found | LocalEvents",
    }
  }

  return {
    title: `${category.name} Events | LocalEvents`,
    description: `Browse ${category.name.toLowerCase()} events near you.`,
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const iconComponent = getCategoryIcon(category.icon)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className={`rounded-full p-3 ${category.color}`}>{iconComponent}</div>
        <h1 className="text-3xl font-bold">{category.name} Events</h1>
      </div>

      <Suspense fallback={<EventsSkeleton />}>
        <EventsList searchParams={{ ...searchParams, category: params.slug }} />
      </Suspense>
    </div>
  )
}

