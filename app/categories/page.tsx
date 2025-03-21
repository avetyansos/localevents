import CategoryList from "@/components/category-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Categories | LocalEvents",
  description: "Browse events by category.",
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse by Category</h1>
      <CategoryList />
    </div>
  )
}

