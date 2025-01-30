"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useActionState } from "react";
import { Onbordingaction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { OnbordingSchema } from "../lib/ZodSchema";
import { SubmitButton } from "../components/SubmitButton";

export default function OnbordingRoute() {
  const [lastResult, action] = useActionState(Onbordingaction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: OnbordingSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            Welcome To DOC<span className="text-primary"> ON TIME</span>
          </CardTitle>
          <CardDescription>
            We need the following information to set up your profile!
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="grid gap-y-5">
            <div className="grid gap-y-2">
              <Label>Full Name</Label>
              <Input
                name={fields.FullName.name}
                defaultValue={fields.FullName.initialValue}
                key={fields.FullName.key}
                placeholder="John Smith"
              />
              <p className="text-red-500 text-sm">{fields.FullName.errors}</p>
            </div>
            <div className="grid gap-y-2">
              <Label>User Name</Label>
              <div className="flex rounded-md">
                <span className="inline-flex items-center px-3 rounded-l-md border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                  Docontime.com/
                </span>
                <Input
                  name={fields.userName.name}
                  defaultValue={fields.userName.initialValue}
                  key={fields.userName.key}
                  placeholder="example-user-1"
                  className="rounded-l-none"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.userName.errors}</p>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Submit" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
