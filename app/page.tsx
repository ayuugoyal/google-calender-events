import { getServerSession } from "next-auth/next"
import CalendarEvents from "@/components/calendar-events"
import { Header } from "@/components/header"
import LoginButton from "@/components/login-button"

export default async function Home() {
  const session = await getServerSession()

  return (
    <main className="container mx-auto">
      {session == null ?
        <div
          className="relative flex flex-col h-screen gap-4 items-center justify-center px-4"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Google Calander Events Viewer
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
            You first have to login with google
          </div>
          <LoginButton />
        </div> :
        <>
          <Header />
          <h1 className="text-3xl font-bold mb-8 text-center">Your Google Calendar Events</h1>
          <CalendarEvents />
        </>
      }
    </main>
  )
}

