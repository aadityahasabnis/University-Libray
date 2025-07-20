'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import toast from 'react-hot-toast';
import { borrowBook } from '@/lib/actions/book';
import { useRouter } from 'next/navigation';

interface Props {
    userId: string;
    bookId: string;
    borrowingEligibility: {
        isEligible: boolean;
        message: string;
    };
}
const BorrowBook = ({ userId, bookId, borrowingEligibility: { isEligible, message } }: Props) => {
    const router = useRouter();
    const [borrowing, setBorrowing] = useState(false);
    const handleBorrow = async () => {
        if (!isEligible) {
            toast(message)
        }
        setBorrowing(true);
        try {
            const result = await borrowBook({ bookId, userId });
            if (result.success) {
                toast.success("Book borrowed successfully!");
                router.push('/my-profile')
            } else {
                toast.error(result.error || "Failed to borrow book");
            }
        }
        catch (error) {
            console.error("Error borrowing book:", error);
            toast.error("Failed to borrow book");
        } finally {
            setBorrowing(false);
        }
    }
    return (
        <Button className='max-w-50 bg-cyan-200' onClick={handleBorrow} disabled={borrowing} >
            <Image src="/icons/book.svg" alt='book' width={20} height={20}></Image>
            <p className='text-xl text-gray-900'>{borrowing ? "Borrowing..." : "Borrow Book"}</p>
        </Button>
    )
}

export default BorrowBook