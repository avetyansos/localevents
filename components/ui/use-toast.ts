"use client"

import { useState } from "react"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { ...props, id }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)

    return { id }
  }

  const dismiss = (id?: string) => {
    setToasts((prevToasts) => (id ? prevToasts.filter((toast) => toast.id !== id) : []))
  }

  return { toast, dismiss, toasts }
}

