import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import BookCover from './BookCover'

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  total_copies,
  available_copies,
  description,
  color: coverColor,
  cover: coverUrl
}: Book) => {
  return (
    <section className='flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8'>
      <div className='flex gap-20 md:flex-row sm:flex-col'>

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
              Total Books: <span>{total_copies}</span>
            </p>
            <p>
              Available Books: <span>{available_copies}</span>
            </p>
          </div>
          <div>
            <p className='max-w-2xl mt-2 text-xl text-justify'>
              Description: <span>{description}</span>
            </p>
          </div>
          <Button className='max-w-50 bg-cyan-200' >
            <Image src="/icons/book.svg" alt='book' width={20} height={20}></Image>
            <p className='text-xl text-gray-900'>Borrow</p>
          </Button>

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