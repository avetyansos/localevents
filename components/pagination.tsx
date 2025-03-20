"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { Suspense } from "react"

interface PaginationProps {
  totalPages: number
  currentPage: number
}

function PaginationContent({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function createPageURL(pageNumber: number | string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <a href={createPageURL(currentPage - 1)}>
          <Button variant="outline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
        </a>
      ) : (
        <Button variant="outline" disabled>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <a key={page} href={createPageURL(page)}>
            <Button variant={currentPage === page ? "default" : "outline"} size="icon">
              {page}
            </Button>
          </a>
        ))}
      </div>

      {currentPage < totalPages ? (
        <a href={createPageURL(currentPage + 1)}>
          <Button variant="outline">
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </a>
      ) : (
        <Button variant="outline" disabled>
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  )
}

export function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<PaginationFallback totalPages={props.totalPages} currentPage={props.currentPage} />}>
      <PaginationContent {...props} />
    </Suspense>
  )
}

function PaginationFallback({ totalPages, currentPage }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button variant="outline" disabled>
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button key={page} variant={currentPage === page ? "default" : "outline"} size="icon" disabled>
            {page}
          </Button>
        ))}
      </div>

      <Button variant="outline" disabled>
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  )
}

