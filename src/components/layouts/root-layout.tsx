'use client'

import Link from 'next/link'
import { SignInButton, SignedOut, SignUpButton } from '@clerk/nextjs'

import { Github } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Mine } from '@/components/icons/mine'
import { Kinotio } from '@/components/icons/kinotio'
import { Heart } from '@/components/icons/heart'

export const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

const Header = () => {
  return (
    <header className='sticky top-0 z-40 border-b-4 border-black bg-white'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <Mine width={125} height={50} />
        </Link>
        <div className='flex items-center gap-4'>
          <Button variant='neutral'>
            <Github />
          </Button>

          <SignedOut>
            <SignInButton>
              <Button variant='neutral'>Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className='transform -rotate-2 hover:rotate-0 transition-transform'>
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  )
}

const Footer = () => {
  return (
    <footer className='bg-black text-white py-12 border-t-4 border-white'>
      <div className='px-4 md:px-6'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <Kinotio width={125} height={50} />
            <p className='text-gray-400 max-w-xs mt-6 text-sm'>
              The platform for developers to showcase their skills, projects, and connect with
              opportunities.
            </p>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Features
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Resources</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Community
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Connect</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  X (Formerly Twitter)
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Blueksy
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href='#' className='text-gray-400 hover:text-white text-sm'>
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center'>
          <div className='flex items-center space-x-3 text-gray-400'>
            <div className='h-6 w-6 opacity-50'>
              <Heart />
            </div>
            <p className='text-sm'>crafted with care and dedication.</p>
          </div>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <Link href='#' className='text-gray-400 hover:text-white text-sm'>
              Privacy Policy
            </Link>
            <Link href='#' className='text-gray-400 hover:text-white text-sm'>
              Terms of Service
            </Link>
            <Link href='#' className='text-gray-400 hover:text-white text-sm'>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
