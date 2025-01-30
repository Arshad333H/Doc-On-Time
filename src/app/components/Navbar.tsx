import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import AuthModel from "./AuthModel";
import { ThemeToggle } from "./ThemeToggle";

function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex flex-row items-center">
        <Image src={Logo} alt="Logo" className="size-11 mx-5" />
        <h4 className="text-2xl font-semibold">
          DOC
          <span className="text-primary"> ON Time</span>
        </h4>
      </Link>
      <div className="hidden md:flex md:justify-end md:space-x-4 ">
        <ThemeToggle />
        <AuthModel text="Get Started" />
      </div>
    </div>
  );
}

export default Navbar;
