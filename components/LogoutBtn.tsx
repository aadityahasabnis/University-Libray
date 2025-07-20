"use server"
import React from 'react'
import { Button } from './ui/button';
import { signOut } from '@/auth';

const LogoutBtn = () => {
    return (
        <form
            action={async () => {

                await signOut();
            }}
        >
            <Button> Logout </Button>
        </form>
    )
}

export default LogoutBtn