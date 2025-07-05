import React from 'react'
import BookCard from './BookCard';
interface Props {
    title: string;
    books: Book[];
    containerClassName?: string
}
const BookList = ({
    title,
    books,
    containerClassName
}: Props) => {
    return (
        <section className={containerClassName}>
            <h2 className='text-4xl text-gray-200'>{title}</h2>
            
            <ul className='flex flex-wrap gap-5 mt-10 sm:gap-10'>
                {books.map((book)=> (
                    <BookCard key={book.id} {...book}/>
                ))}
            </ul>
        </section >
    )
}

export default BookList