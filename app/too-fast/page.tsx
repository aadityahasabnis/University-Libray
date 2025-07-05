import React from "react";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center justify-center gap-10">
      <h1 className={"font-bebas-neue text-6xl text-white"}>Too Fast!</h1>
      <p className={"mt-3 max-w-xl text-primary"}>
        {/*Text about rate limiting here.*/}
        Too many requests. Please try again later.
      </p>
    </main>
  );
};
export default Page;
