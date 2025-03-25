"use client"

import { useEffect, useState } from "react"
import EventDetail from "@/components/event-detail"
import type { Event } from "@/lib/types"

interface EventDetailWrapperProps {
  event: Event
}

export default function EventDetailWrapper({ event }: EventDetailWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return <EventDetail event={event} />
}

