"use client";
import { Switch } from "@/components/ui/switch";
import { useActionState, useEffect, useTransition } from "react";
import { UpdateEventTypeStatusAction } from "../action";
import { toast } from "sonner";

export function MenuActiveSwitch({
  initialChecked,
  eventTypeId,
}: {
  initialChecked: boolean;
  eventTypeId: string;
}) {
  const [isPneding, startTransition] = useTransition();
  const [state, action] = useActionState(
    UpdateEventTypeStatusAction,
    undefined
  );
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Switch
      disabled={isPneding}
      defaultChecked={initialChecked}
      onCheckedChange={(isChecked) => {
        startTransition(() => {
          action({
            eventTypeId: eventTypeId,
            isChecked: isChecked,
          });
        });
      }}
    />
  );
}
