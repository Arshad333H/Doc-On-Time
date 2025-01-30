import { SettingsForm } from "@/app/components/SettingsForm"
import userRequire from "@/app/lib/hooks"
import { prisma } from "@/app/lib/prisma"
import { notFound } from "next/navigation"
import React from "react"

async function getData(id:string){
    const data =await prisma.user.findUnique({
        where:{
            id:id,
        },
        select:{
            name:true,
            email:true,
            image:true
        }
    })
    if(!data){
        return notFound();
    }
    return data;
}

export default async function SettingsRoute() {
    const session= await userRequire()
    const data=await getData(session.user?.id as string)
  return (
    <SettingsForm fullName={data.name as string} email={data.email} profileImage={data.image as string} />
  )
}
