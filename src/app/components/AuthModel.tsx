import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Logo from "@/public/logo.png";

import React from "react";
import { signIn } from "../lib/auth";
import { GoogleAuthButton, GitHubAuthButton } from "./SubmitButton";

interface AppProps {
  text: string;
}

function AuthModel({ text }: AppProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>{text}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px] ">
        <DialogHeader className="flex flex-row items-center gap-2">
          <Image src={Logo} alt="Logo" className="size-10" />
          <h4 className="px-1 text-3xl font-semibold">
            DOC <span className="text-primary">ON TIME</span>
          </h4>
        </DialogHeader>
        <div className="flex flex-col mt-5 gap-3">
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <GoogleAuthButton />
          </form>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <GitHubAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AuthModel;
