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
import { SubmitButton } from "./SubmitButton";
import { useActionState, useState } from "react";
import { SettingsAction } from "../action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { settingSchema } from "../lib/ZodSchema";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { UploadDropzone } from "../lib/uploadthing";
import { toast } from "sonner";

interface AppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: AppProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentprofileImage, setCurrentProfileImage] = useState(profileImage);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>manage your settings</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              defaultValue={fullName}
              placeholder="john smith"
            />
            <p className="text-red-500 text-sm">{fields.fullName.errors}</p>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <Input
              disabled
              defaultValue={email}
              placeholder="test@exmaple.com"
            />
          </div>
          <div className="grid gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentprofileImage}
            />
            {currentprofileImage ? (
              <div className="relative size-16">
                <img
                  src={currentprofileImage}
                  alt="profile img"
                  className="size-16 rounded-full"
                />
                <Button
                  onClick={handleDeleteImage}
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-3 -right-3"
                >
                  <X className="size-4" />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("profile image has been uploaded");
                }}
                onUploadError={(error) => {
                  console.log("someting went wrong", error);
                  toast.error(error.message);
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.profileImage.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save changes" />
        </CardFooter>
      </form>
    </Card>
  );
}
