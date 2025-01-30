import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import videogif from "@/public/work-is-almost-over-happy.gif";
import { CalendarCheck2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function onboardingRouteTwo() {
  return (
    <div className="min-h-screen items-center justify-center flex ">
      <Card>
        <CardHeader>
          <CardTitle>Your are almost Done!</CardTitle>
          <CardDescription>
            We have to now connect calendar to your account
          </CardDescription>
          <Image
            src={videogif}
            alt="Gif"
            className="w-full rounded-lg justify-center items-center"
          />
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="../api/auth">
              <CalendarCheck2 className="size-4 mr-2" /> Connect callander to
              your account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
