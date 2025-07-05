"use client";
import { BsFillBookFill } from "react-icons/bs";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  const userName: string = session?.user?.name || "IN";
  const IN = getInitials(userName);
  return (
    <header className="flex justify-between gap-5 my-10">
      <Link href="/" className="flex items-center gap-2 text-4xl text-white">
        {" "}
        <BsFillBookFill /> <span>BookWise</span>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Link
            href="/library"
            className={cn(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-gray-100" : "text-gray-50",
            )}
          >
            Library
          </Link>
        </li>

        <li>
          <Link href="/my-profile">
            <Avatar>
              {/*<AvatarImage src="https://github.com/shadcn.png" />*/}
              <AvatarFallback className="bg-amber-100">{IN}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
