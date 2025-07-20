import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { BsFillBookFill } from "react-icons/bs";
import LogoutBtn from "@/components/LogoutBtn";
import { Button } from "@/components/ui/button";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.user?.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10))
      return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session?.user?.id));
  });
  return (
    <main className="root-container">
      <header className="flex justify-between gap-5 my-10">
        <Link href="/" className="flex items-center gap-2 text-4xl text-white">
          {" "}
          <BsFillBookFill /> <span>BookWise</span>
        </Link>
        <ul className="flex flex-row items-center gap-8">

          <li>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button> Logout </Button>
            </form>          </li>
        </ul>
      </header>
      <div className="mx-auto max-w-7xl">
        <div className="pb-20 mt-20">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
