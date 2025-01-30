import Image from "next/image";
import NylasLogo from "@/public/nylas-logo.png";
import NextLogo from "@/public/nextjs-logo.svg";
import TypescriptLogo from "@/public/typescript-logo.png";
import SuperBaseLogo from "@/public/supabase.svg";
import Vercel from "@/public/vercel.svg";
import teamLogo from "@/public/teams.png";

export function Logos() {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the companies in the world
      </h2>
      <div
        className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 
      gap-y-10 sm:max-w-xl sm:grid-cols-5 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-col-5 "
      >
        <Image
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert "
          src={NylasLogo}
          alt="nylas-logo"
        />
        <Image
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert "
          src={NextLogo}
          alt="nylas-logo"
        />
        <Image
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert "
          src={Vercel}
          alt="nylas-logo"
        />
        <Image
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert "
          src={NextLogo}
          alt="nylas-logo"
        />
        <Image
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert "
          src={NylasLogo}
          alt="nylas-logo"
        />
      </div>
    </div>
  );
}
