import { EventCategories } from "@/components/event-categories"
import { CategoryList } from "@/components/category-list"

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Event Categories</h1>
      <p className="text-muted-foreground mb-8">Browse events by category to find exactly what you're looking for</p>

      <div className="mb-12">
        <EventCategories />
      </div>

      <div>
        <CategoryList />
      </div>
    </div>
  )
}

