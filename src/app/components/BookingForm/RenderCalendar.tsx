"use client";
import Calendar from "./Calendar";
import {
  today,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
} from "@internationalized/date";
import { DateValue } from "@react-types/calendar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface AppProps {
  availability: {
    day: string;
    isActive: boolean;
  }[];
}

export function RenderCalender({ availability }: AppProps) {
  const searchparams = useSearchParams();
  const router = useRouter();
  const isDateUnavailable = (date: DateValue) => {
    const dayOfWeek = date.toDate(getLocalTimeZone()).getDay();
    const adjustIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return !availability[adjustIndex].isActive;
  };
  const [date, setDate] = useState(() => {
    const dateParam = searchparams.get("date");
    return dateParam ? parseDate(dateParam) : today(getLocalTimeZone());
  });
  const handleDateChange = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set("date", date.toString());
    router.push(url.toString());
  };
  useEffect(() => {
    const dateParam = searchparams.get("date");
    if (dateParam) {
      setDate(parseDate(dateParam));
    }
  }, [searchparams]);

  return (
    <Calendar
      minValue={today(getLocalTimeZone())}
      isDateUnavailable={isDateUnavailable}
      value={date}
      onChange={handleDateChange}
    />
  );
}
