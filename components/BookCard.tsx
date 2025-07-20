import Link from 'next/link'
import React from 'react'
import BookCover from './BookCover'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

const BookCard = ({
    id,
    title,
    genre,
    coverColor,
    coverUrl,
    isLoanedBook = false,
}: Book) => <li className={cn(isLoanedBook && "sm:w-52 w-full") + ""}>
        <Link
            href={`/books/${id}`}
            className={cn(isLoanedBook && "w-full flex flex-col items-center")}
        >
            <BookCover coverColor={coverColor} coverImage={coverUrl} />

            <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
                <p className="mt-2 text-base font-semibold text-white line-clamp-1 sm:text-xl">{title}</p>
                <p className="mt-1 text-sm italic text-light-400 line-clamp-1 sm:text-base">{genre}</p>
            </div>

            {isLoanedBook && (
                <div className="mt-3">
                    <div className="flex flex-row items-center justify-center gap-1">
                        <Image
                            src="/icons/calendar.svg"
                            alt="calendar"
                            width={18}
                            height={18}
                            className="object-contain"
                        />
                        <p className="text-gray-100">11 days left to return</p>
                    </div>

                    <Button className="book-btn">Download receipt</Button>
                </div>
            )}
        </Link>
    </li>

export default BookCard