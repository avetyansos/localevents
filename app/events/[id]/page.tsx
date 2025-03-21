"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Share2, Heart, Users, Mail } from "lucide-react"
import { EventMap } from "@/components/event-map"
import { RelatedEvents } from "@/components/related-events"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

// Mock data for events
const events = [
  {
    id: "1",
    title: "Summer Music Festival",
    description:
      "A three-day music festival featuring top artists from around the world. Join us for an unforgettable weekend of live performances across multiple stages, featuring a diverse lineup of musical genres including rock, pop, electronic, hip-hop, and more. The festival will also include food vendors, art installations, and interactive experiences.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "Aug 15-17, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, New York",
    address: "Central Park, New York, NY 10022",
    organizer: "NYC Events",
    price: "$149 - $299",
    category: "Music",
    attendees: 1240,
    coordinates: { lat: 40.785091, lng: -73.968285 },
  },
  {
    id: "2",
    title: "Food & Wine Expo",
    description:
      "Sample delicious cuisine and fine wines from local and international vendors. This premier culinary event brings together renowned chefs, wineries, and food artisans for a weekend of tastings, demonstrations, and workshops. Discover new flavors, learn cooking techniques, and enjoy a sophisticated gastronomic experience.",
    image: "/placeholder.svg?height=600&width=1200",
    date: "Jul 22-23, 2024",
    time: "11:00 AM - 7:00 PM",
    location: "Convention Center, Chicago",
    address: "2301 S Lake Shore Dr, Chicago, IL 60616",
    organizer: "Taste of Chicago",
    price: "$75 - $120",
    category: "Food & Drink",
    attendees: 850,
    coordinates: { lat: 41.851, lng: -87.6298 },
  },
]

export default function EventPage({ params }: { params: { id: string } }) {
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    )
  }

  const handleGetTickets = () => {
    toast({
      title: "Tickets",
      description: `You're being redirected to purchase tickets for ${event.title}`,
    })
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? `${event.title} has been removed from your favorites`
        : `${event.title} has been added to your favorites`,
    })
  }

  const handleShare = () => {
    // In a real app, you would use the Web Share API if available
    // or copy the URL to clipboard
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast({
          title: "Link copied",
          description: "Event link has been copied to your clipboard",
        })
      })
      .catch(() => {
        toast({
          title: "Share",
          description: "Share this event with your friends",
        })
      })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
          </div>

          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              <Badge size="lg">{event.category}</Badge>
            </div>

            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Users className="h-5 w-5 mr-2" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <p className="text-muted-foreground mb-4">{event.address}</p>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <EventMap coordinates={event.coordinates} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border p-6 sticky top-20">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Price</h3>
              <p className="text-2xl font-bold">{event.price}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-1">Organizer</h3>
              <p className="text-muted-foreground">{event.organizer}</p>
            </div>

            <div className="space-y-3">
              <Button className="w-full" onClick={handleGetTickets}>
                Get Tickets
              </Button>
              <div className="flex gap-2">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  className={`flex-1 ${isFavorite ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Contact Event Organizer</DialogTitle>
                    <DialogDescription>
                      Send a message to {event.organizer} about {event.title}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message to the organizer"
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() => {
                        toast({
                          title: "Message Sent",
                          description: `Your message has been sent to ${event.organizer}`,
                        })
                      }}
                    >
                      Send Message
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <RelatedEvents currentEventId={event.id} category={event.category} />
    </div>
  )
}

