"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { ThemeProvider } from "@/components/theme-provider"

type ToastProps = {
  id?: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: React.ReactNode
}

type ToastContextType = {
  toasts: ToastProps[]
  toast: (props: ToastProps) => { id: string }
  dismiss: (id?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
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

  return <ToastContext.Provider value={{ toasts, toast, dismiss }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  )
}

