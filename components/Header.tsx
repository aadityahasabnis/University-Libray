"use server"
import { BsFillBookFill } from "react-icons/bs";
import React from "react";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  return (
    <header className="flex justify-between gap-5 my-10">
      <Link href="/" className="flex items-center gap-2 text-4xl text-white">
        {" "}
        <BsFillBookFill /> <span>BookWise</span>
      </Link>
      <ul className="flex flex-row items-center gap-8">

        <li>
          <LogoutBtn />
        </li>
      </ul>
    </header>
  );
};
export default Header;
