"use client"

import { useToast } from "@/components/providers"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4 w-full max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-md shadow-lg border flex justify-between items-center ${
            toast.variant === "destructive"
              ? "bg-destructive text-destructive-foreground border-destructive"
              : "bg-background text-foreground border-border"
          }`}
        >
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm mt-1">{toast.description}</div>}
          </div>
          <div className="flex items-center gap-2 ml-4">
            {toast.action}
            <button
              onClick={() => dismiss(toast.id)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close toast"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

