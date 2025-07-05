import React, { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="flex flex-col flex-1 min-h-screen px-5 bg-top bg-cover bg-pattern bg-dark-100 xs:px-10 md:px-16">
      <Header session={session} />
      <div className="mx-auto max-w-7xl">
        <div className="pb-20 mt-20">{children}</div>
      </div>
    </main>
  );
};
export default Layout;
