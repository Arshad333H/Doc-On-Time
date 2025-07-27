import { CreateMeetingAction } from "@/app/action"
import { RenderCalender } from "@/app/components/BookingForm/RenderCalendar"
import { SubmitButton } from "@/app/components/SubmitButton"
import { TimeTable } from "@/app/components/BookingForm/TimeTable"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { prisma } from "@/app/lib/prisma"
import { CalendarX2, Clock, VideoIcon } from "lucide-react"
import { notFound } from "next/navigation"
import userRequire from "@/app/lib/hooks"

async function getData(username: string, eventName: string) {
  const session = userRequire()
  const eventType = await prisma.eventType.findFirst({
    where: {
      url: eventName,
      User: {
        userName: username,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      VideoCallSoftware: true,
      User: {
        select: {
          image: true,
          name: true,
          availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  })

  if (!eventType) {
    return notFound()
  }

  return eventType
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: Promise<{ username: string; eventUrl: string }>
  searchParams: Promise<{ date?: string; time?: string }> // Now also a Promise
}) {
  // Await both params and searchParams
  const { username, eventUrl } = await params
  const { date, time } = await searchParams

  const selectedDate = date ? new Date(date) : new Date()

  const data = await getData(username, eventUrl)

  const formatedDate = new Intl.DateTimeFormat("en-Us", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate)

  const showForm = !!date && !!time

  return (
    <div className="min-h-screen w-screen flex items-center justify-center ">
      {showForm ? (
        <Card className="max-w-[600px] w-full ">
          <CardContent className="p-5 md:grid gap-4 md:grid-cols-[1fr,auto,1fr]">
            <div>
              <img
                src={(data.User?.image as string) || "/placeholder.svg"}
                alt="Profile Image of User"
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
              <div className="mt-5 flex flex-col gap-y-3 ">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{formatedDate}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{data.VideoCallSoftware}</span>
                </p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-[1px]" />
            <form action={CreateMeetingAction} className="flex flex-col gap-y-4">
              <input type="hidden" name="eventTypeId" value={data.id} />
              <input type="hidden" name="username" value={username} />
              <input type="hidden" name="fromTime" value={time} />
              <input type="hidden" name="eventDate" value={date} />
              <input type="hidden" name="meetingLength" value={data.duration} />
              <div className="flex flex-col gap-y-2">
                <Label>Your Name</Label>
                <Input name="name" placeholder="Your Name" />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input name="email" placeholder="johnsmit@example.com" />
              </div>
              <SubmitButton className="w-full mt-5" text="Book Meeting" />
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-[1000px] w-full mx-auto">
          <CardContent className="p-5 md:grid gap-4 md:grid-cols-[1fr,auto,1fr,auto,1fr]">
            <div>
              <img
                src={(data.User?.image as string) || "/placeholder.svg"}
                alt="Profile Image of User"
                className="size-10 rounded-full"
              />
              <p className="text-sm font-medium text-muted-foreground mt-1">{data.User?.name}</p>
              <h1 className="text-xl font-semibold mt-2">{data.title}</h1>
              <p className="text-sm font-medium text-muted-foreground">{data.description}</p>
              <div className="mt-5 flex flex-col gap-y-3 ">
                <p className="flex items-center">
                  <CalendarX2 className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{formatedDate}</span>
                </p>
                <p className="flex items-center">
                  <Clock className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{data.duration} Minutes</span>
                </p>
                <p className="flex items-center">
                  <VideoIcon className="size-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">{data.VideoCallSoftware}</span>
                </p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-full w-[1px]" />
            <RenderCalender availability={data.User?.availability as any} />
            <Separator orientation="vertical" className="h-full w-[1px]" />
            <TimeTable duration={data.duration} selectedDate={selectedDate} userName={username} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
