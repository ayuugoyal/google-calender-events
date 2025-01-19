"use client"

import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex sm:flex-row sm:gap-0 flex-col gap-6 justify-between items-center">
        <h1 className="text-2xl font-bold">Google Calendar Events</h1>
        {session && (
          <div className="flex items-center gap-4">
            <span>Welcome, {session.user?.name}</span>
            <Button
              variant="secondary"
              className="hover:bg-red-500"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
            <ModeToggle />
          </div>
        )}
      </div>
    </header>
  )
}

