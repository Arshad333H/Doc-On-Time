import { nylas } from "@/app/lib/nyals";
import { prisma } from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";
import Link from "next/link";
import { GetFreeBusyRequest, GetFreeBusyResponse, NylasResponse } from "nylas";

interface AppProps {
  selectedDate: Date;
  userName: string;
  duration: number;
}
async function getData(userName: string, selectedDate: Date) {
  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const currentDay = format(selectedDate, "EEEE");
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      user: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      user: {
        select: {
          grantEmail: true,
          grantID: true,
        },
      },
    },
  });
  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.user?.grantID as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.user?.grantEmail as string],
    },
  });
  return { data, nylasCalendarData };
}

function calculateAvailableTimeSlots(
  date: string,
  dbAvailablity: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  duration: number
) {
  const now = new Date();
  const availableForm = parse(
    `${date} ${dbAvailablity.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const availableTill = parse(
    `${date} ${dbAvailablity.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  //@ts-ignore
  const busySlots = nylasData.data[0].timeSlots.map((slot: any) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  const allSlots = [];
  let currentSlot = availableForm;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }
  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);

    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });
  return freeSlots.map((slot) => format(slot, "HH:mm"));
}

export async function TimeTable({
  selectedDate,
  userName,
  duration,
}: AppProps) {
  const { data, nylasCalendarData } = await getData(userName, selectedDate);
  const dbAvailability = {
    fromTime: data?.fromTime,
    tillTime: data?.tillTime,
  };
  const formatedDate = format(selectedDate, "yyyy-MM-dd");
  const availableSlots = calculateAvailableTimeSlots(
    formatedDate,
    dbAvailability,
    nylasCalendarData,
    duration
  );
  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM.d")}
        </span>
      </p>
      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
              key={index}
            >
              <Button variant="outline" className="w-full mb-2">
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No time Slots Available</p>
        )}
      </div>
    </div>
  );
}
