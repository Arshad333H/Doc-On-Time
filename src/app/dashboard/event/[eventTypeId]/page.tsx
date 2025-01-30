import EvnetTypeForm from "@/app/components/EvnetTypeForm";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

async function getData(eventTypeId: string) {
  const data = await prisma.eventType.findUnique({
    where: {
      id: eventTypeId,
    },
    select: {
      title: true,
      description: true,
      duration: true,
      url: true,
      id: true,
      VideoCallSoftware: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}
const EditEventTypePage = async ({
  params,
}: {
  params: { eventTypeId: string };
}) => {
  const data = await getData(params.eventTypeId);

  return (
    <EvnetTypeForm
      description={data.description}
      duration={data.duration}
      title={data.title}
      url={data.url}
      key={data.id}
      id={data.id}
      callProvider={data.VideoCallSoftware}
    />
  );
};

export default EditEventTypePage;
