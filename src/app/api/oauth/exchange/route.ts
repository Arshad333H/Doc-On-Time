import userRequire from "@/app/lib/hooks";
import { nylas, nylasConfig } from "@/app/lib/nyals";
import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await userRequire();
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we did not get a code", {
      status: 400,
    });
  }
  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientSecret: nylasConfig.apiKey,
      clientId: nylasConfig.clientId as string,
      redirectUri: nylasConfig.redirectUri,
      code: code,
    });
    const { grantId, email } = response;
    await prisma.user.update({
      where: {
        id: session.user?.id,
      },
      data: {
        grantID: grantId,
        grantEmail: email,
      },
    });
  } catch (error) {
    console.log("Error: Something went wrong", error);
  }
  redirect("/dashboard");
}
