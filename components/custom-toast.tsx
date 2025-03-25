"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface CustomToastProps {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
  onUndo?: () => void
  onDismiss: (id: string) => void
}

export function CustomToast({ id, title, description, variant = "default", onUndo, onDismiss }: CustomToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onDismiss(id), 300) // Allow time for fade-out animation
    }, 5000)

    return () => clearTimeout(timer)
  }, [id, onDismiss])

  if (!isVisible) {
    return null
  }

  return (
    <div
      className={`p-4 rounded-md shadow-lg border flex justify-between items-center transition-opacity duration-300 ${
        variant === "destructive"
          ? "bg-destructive text-destructive-foreground border-destructive"
          : "bg-background text-foreground border-border"
      }`}
    >
      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        {description && <div className="text-sm mt-1">{description}</div>}
      </div>
      <div className="flex items-center gap-2 ml-4">
        {onUndo && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onUndo()
              setIsVisible(false)
              setTimeout(() => onDismiss(id), 300)
            }}
          >
            Undo
          </Button>
        )}
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(() => onDismiss(id), 300)
          }}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

