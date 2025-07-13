import { useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'

export default function Header() {
    return (
        <div className="flex justify-end items-center px-10 py-2 h-15 bg-gray-950 text-gray-300">
            <div className="flex items-center gap-4">
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}