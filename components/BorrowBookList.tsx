import React from 'react'
import BookCard from './BookCard';
import { db } from '@/database/drizzle';
import { books, borrowRecords } from '@/database/schema';
import { eq, or } from 'drizzle-orm';

interface Props {
    title: string;
    borrowedBooks: typeof borrowRecords.$inferSelect[];
}

const BorrowBookList = async ({
    title,
    borrowedBooks,
}: Props) => {
    if (borrowedBooks.length === 0) {
        return (
            <section className={''}>
                <h2 className='text-4xl text-gray-200'>{title}</h2>
                <p className='text-gray-400 mt-4'>No borrowed books found.</p>
            </section>
        );
    }

    // Get unique book IDs
    const bookIds = [...new Set(borrowedBooks.map(record => record.bookId))];

    // Fetch books data - we'll do individual queries for now since we need to handle multiple IDs
    const bookPromises = bookIds.map(async (bookId) => {
        const bookData = await db.select().from(books).where(eq(books.id, bookId)).limit(1);
        return bookData[0] || null;
    });

    const booksData = (await Promise.all(bookPromises)).filter(book => book !== null);

    // Create a map for quick lookup
    const booksMap = new Map(booksData.map(book => [book.id, book]));

    // Combine borrow records with book data
    const bookList = borrowedBooks.map((record) => {
        const bookData = booksMap.get(record.bookId);
        if (!bookData) return null;

        return {
            ...bookData,
            isLoanedBook: true,
            // Additional borrow record data if needed for future use
            borrowRecord: {
                dueDate: record.dueDate,
                status: record.status,
                borrowDate: record.borrowDate,
                returnDate: record.returnDate
            }
        };
    }).filter(book => book !== null) as (Book & {
        isLoanedBook: boolean;
        borrowRecord: {
            dueDate: string;
            status: "BORROWED" | "RETURNED";
            borrowDate: Date;
            returnDate: string | null;
        }
    })[];

    return (
        <section className={''}>
            <h2 className='text-4xl text-gray-200'>{title}</h2>

            <ul className='flex flex-wrap gap-5 mt-10 sm:gap-10'>
                {bookList.map((book) => (
                    <BookCard key={book.id} {...book} />
                ))}
            </ul>
        </section >
    )
}

export default BorrowBookList