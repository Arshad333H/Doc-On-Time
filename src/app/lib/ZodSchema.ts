import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";
export const OnbordingSchema = z.object({
  FullName: z.string().min(3).max(30),
  userName: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username can consist of letters, numbers and -",
    }),
});

export function OnbordingSchemaValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username can consist of letters, numbers and -",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }
          return options.isUsernameUnique().then((isUniqe) => {
            if (!isUniqe) {
              ctx.addIssue({
                code: "custom",
                message: "Username is already used",
              });
            }
          });
        })
      ),
    FullName: z.string().min(3).max(30),
  });
}

export const settingSchema = z.object({
  fullName: z.string().min(4).max(150),
  profileImage: z.string(),
});

export const eventTypeSchema = z.object({
  title: z.string().min(4).max(150),
  duration: z.number().min(15).max(60),
  url: z.string().min(4).max(150),
  description: z.string().min(6).max(350),
  videoCallSoftware: z.string().min(5),
});
