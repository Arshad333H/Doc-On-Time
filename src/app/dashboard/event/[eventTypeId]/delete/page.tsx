import { DeleteEventTpyeAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DeleteEvent({
  params,
}: {
  params: {
    eventTypeId: string;
  };
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-[450px] w-full">
        <CardHeader>
          <CardTitle>Delete Event Type</CardTitle>
          <CardDescription>
            Are you sure you want to delete this evnet?
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex w-full justify-between">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">Cancel</Link>
          </Button>
          <form action={DeleteEventTpyeAction}>
            <input type="hidden" name="id" value={params.eventTypeId} />
            <SubmitButton text="Delete Event" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
