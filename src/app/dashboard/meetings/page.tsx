import { CancelMeetingAction } from "@/app/action";
import EmptyState from "@/app/components/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButton";
import userRequire from "@/app/lib/hooks";
import { nylas } from "@/app/lib/nyals";
import { prisma } from "@/app/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantID: true,
      grantEmail: true,
    },
  });
  if (!userData) {
    throw new Error("User not found");
  }

  const data = nylas.events.list({
    identifier: userData.grantID as string,
    queryParams: {
      calendarId: userData.grantEmail as string,
    },
  });
  return data;
}

export default async function page() {
  const session = await userRequire();
  const data = await getData(session.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You dont have any details yet."
          buttonText="create a new event"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming events which were booked with you and see the
              eventType link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => (
              <form action={CancelMeetingAction} key={item.id}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div className="">
                    <p>
                      {/*@ts-ignore*/}
                      {format(fromUnixTime(item.when.startTime), "EEE,dd MMM")}
                    </p>
                    <p>
                      {/*@ts-ignore*/}
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")}-
                      {/*@ts-ignore*/}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-primary" />
                    
                      <a
                        className="text-xs text-primary underline underline-offset-4"
                        //@ts-ignore 
                        href={item.conferencing.details.url}
                        target="_blank"
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium">{item.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      You an {item.participants[0].name}
                    </p>
                  </div>
                  <div className="">
                    <SubmitButton
                      text="Cancel Meeting"
                      variant="destructive"
                      className="w-fit flex ml-auto"
                    />
                  </div>
                </div>
                <Separator className="my-3" />
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}
