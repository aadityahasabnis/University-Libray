import React, { use } from "react";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import { borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import BorrowBookList from "@/components/BorrowBookList";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return <div>Please sign in to view your profile.</div>;
  }

  const borrowedBooks = await db.select().from(borrowRecords).where(eq(borrowRecords.userId, userId));

  return (
    <>
      <BorrowBookList title={"Borrowed Books"} borrowedBooks={borrowedBooks} />
    </>
  );
};

export default Page;
