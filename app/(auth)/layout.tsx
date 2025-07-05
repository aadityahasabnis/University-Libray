import Image from "next/image";
import React, { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main className="auth-container">
      <section className="auth-form bg-pattern">
        <div className="auth-box">
          <div className="flex flex-row gap-3">
            <Image src="/icons/logo.svg" alt="logo" width={37} height={37} />
            <h1 className="text-2xl font-semibold text-white">Bookwise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>
      <section className="auth-illustration">
        <Image
          className="object-cover size-full"
          src="/images/auth-illustration.png"
          alt="auth illustration"
          width={1000}
          height={1000}
        />
      </section>
    </main>
  );
};

export default layout;
