import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'
import BorrowBook from './BorrowBook'
import { db } from '@/database/drizzle'
import { users } from '@/database/schema'
import { eq } from 'drizzle-orm'

interface Props extends Book {
    userId: string
}
const BookOverview = async({
    id,
    title,
    author,
    genre,
    rating,
    totalCopies,
    availableCopies,
    description,
    coverColor,
    coverUrl,
    userId
}: Props) => {

    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user) {
        return null;
    }

    const borrowingEligibility = {
        isEligible: availableCopies >0 && user.status === 'APPROVED',
        message: availableCopies <= 0 ? "Book is not available for borrowing." : user.status !== 'APPROVED' ? "You are not eligible to borrow books." : ""
    }
    return (
        <section className='flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8'>
            <div className='flex gap-20 md:flex-row sm:flex-col sm:flex-col-reverse'>

                <div className='flex flex-col gap-4 text-xl text-gray-100 mt-7 '>
                    <h1 className='text-5xl font-semibold text-white md:text-7xl'>{title}</h1>
                    <div className='flex flex-row gap-3'>
                        <p>By <span className='font-semibold text-gray-200'>{author}</span></p>
                        <p>Category: <span className='font-semibold text-gray-200'>{genre}</span></p>
                        <div className="flex flex-row gap-1">
                            <Image src="/icons/star.svg" alt="star" width={22} height={22} />
                            <p>{rating}</p>
                        </div>
                    </div>
                    <div className='flex flex-row gap-1'>
                        <p>
                            Total Books: <span>{totalCopies}</span>
                        </p>
                        <p>
                            Available Books: <span>{availableCopies}</span>
                        </p>
                    </div>
                    <div>
                        <p className='max-w-2xl mt-2 text-xl text-justify'>
                            Description: <span>{description}</span>
                        </p>
                    </div>
                    <BorrowBook bookId={id} userId={userId} borrowingEligibility={borrowingEligibility}/>

                </div>
                <div className="relative flex justify-center flex-1">
                    <div className="relative">
                        <BookCover
                            variant="wide"
                            className="z-10"
                            coverColor={coverColor}
                            coverImage={coverUrl}
                        />

                        <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden blur-md">
                            <BookCover
                                variant="wide"
                                coverColor={coverColor}
                                coverImage={coverUrl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookOverview