import Image from "next/image";
import { Button } from "@/components/ui/button";
import BookOverview from "@/components/BookOverview";
import BookList from "@/components/BookList";
import { sampleBooks } from "@/constants";
import { db } from "@/database/drizzle";
import {books, users} from "@/database/schema";
import {auth} from "@/auth";
import {desc} from "drizzle-orm";

export default async function Home() {
  // const result = await db.select().from(users);
    const session = await auth();
    const latestBooks = (await db
        .select()
        .from(books)
        .limit(10)
        .orderBy(desc(books.createdAt))) as Book[];

  // console.log(JSON.stringify(result, null, 4));
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string}/>
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
