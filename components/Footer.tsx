import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Footer = () => {
  return (
    <footer className='bg-gray-100 pt-16 mt-10'>
        <p className='text-center text-gray-500 text-sm mb-4'>© 2023 Bookworm&apos;s Paradise. All rights reserved.</p>
        <div className='flex items-center justify-center gap-x-5'>
            <Link href="/about">
                <Button variant="link">About Us</Button>
            </Link>
            <Link href="/contact">
                <Button variant="link">Contact</Button>
            </Link>
            <Link href="/privacy-policy">
                <Button variant="link">Privacy Policy</Button>
            </Link>
        </div>
    </footer>
  )
}

export default Footer