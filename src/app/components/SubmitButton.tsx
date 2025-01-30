"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import GoogleLogo from "@/public/google.svg";
import GitHubLogo from "@/public/github.svg";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appprops {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  className?: string;
}

export function SubmitButton({ text, variant, className }: Appprops) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={(cn("w-fit"), className)}>
          <Loader2 className="size-2 mr-2 animate-spin" />
        </Button>
      ) : (
        <Button
          className={(cn("w-fit"), className)}
          type="submit"
          variant={variant}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GoogleLogo} alt="Logo" className="size-4 mr-2" />
          Sign In with Google
        </Button>
      )}
    </>
  );
}
export function GitHubAuthButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className="w-full">
          <Loader2 className="size-4 mr-2 animate-spin" />
          please wait
        </Button>
      ) : (
        <Button variant="outline" className="w-full">
          <Image src={GitHubLogo} alt="Logo" className="size-4 mr-2" />
          Sign In with Github
        </Button>
      )}
    </>
  );
}
