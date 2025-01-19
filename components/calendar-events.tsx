"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface CalendarEvent {
  id: string
  summary: string
  start: { dateTime?: string, date?: string }
  end: { dateTime?: string, date?: string }
}


export default function CalendarEvents() {
  const { toast } = useToast()
  const { data: session } = useSession()

  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>([])
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (session?.accessToken) {
      fetchEvents()
    }
  }, [session])

  useEffect(() => {
    if (date) {
      const filtered = events.filter((event) => {
        const eventDate = new Date(event.start.dateTime || event.start.date || "")
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        )
      })
      if (filtered.length == 0) {
        toast({
          title: "No Event Found",
          description: new Date(date).toLocaleString(),
        })

      }
      setFilteredEvents(filtered)
    } else {
      setFilteredEvents(events)
    }
  }, [date])

  const fetchEvents = async () => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${new Date().toISOString()}&maxResults=10&singleEvents=true&orderBy=startTime`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    )
    const data = await response.json()
    setEvents(data.items)
    setFilteredEvents(data.items)
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-center sm:flex-row flex-col gap-5 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {
        loading ?
          <div className="flex justify-center items-center w-full h-96">
            <Loader2 className="animate-spin" size={100} />
          </div>
          :
          <Table>
            <TableCaption>{events.length == 0 ? "No Events in your account" : "Your upcoming events"}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Start Time (MM/DD/YYYY)</TableHead>
                <TableHead>End Time (MM/DD/YYYY)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.length == 0 ?
                events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.summary}</TableCell>
                    <TableCell>{new Date(event.start.dateTime || event.start.date || "No Date").toLocaleString()}</TableCell>
                    <TableCell>{new Date(event.end.dateTime || event.end.date || "No Date").toLocaleString()}</TableCell>
                  </TableRow>
                )) :
                filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.summary}</TableCell>
                    <TableCell>{new Date(event.start.dateTime || event.start.date || "No Date").toLocaleString()}</TableCell>
                    <TableCell>{new Date(event.end.dateTime || event.end.date || "No Date").toLocaleString()}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>}
    </div>
  )
}

