"use client"

import { useState, useEffect } from "react"
import { CustomToast } from "./custom-toast"

export type ToastProps = {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
  onUndo?: () => void
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastProps[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Set up event listener for custom toast events
    const handleToastEvent = (event: CustomEvent<ToastProps>) => {
      const newToast = event.detail
      setToasts((prev) => [...prev, newToast])
    }

    window.addEventListener("add-toast" as any, handleToastEvent as EventListener)

    return () => {
      window.removeEventListener("add-toast" as any, handleToastEvent as EventListener)
    }
  }, [])

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-4 w-full max-w-md">
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onUndo={toast.onUndo}
          onDismiss={dismissToast}
        />
      ))}
    </div>
  )
}

// Helper function to show a toast
export function showToast(props: Omit<ToastProps, "id">) {
  const id = Math.random().toString(36).substring(2, 9)
  const event = new CustomEvent("add-toast", {
    detail: {
      id,
      ...props,
    },
  })
  window.dispatchEvent(event)
  return id
}

