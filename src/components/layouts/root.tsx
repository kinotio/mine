'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { SignInButton, SignedOut, SignUpButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heart, Kinotio, Mine, Github } from '@/components/icons'

import { DATA } from '@/data'

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
  const router = useRouter()

  return (
    <header className='sticky top-0 z-40 border-b-4 border-black bg-white'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link href='/' className='flex items-center gap-2'>
          <Mine width={100} height={50} />
        </Link>

        <nav className='hidden gap-6 lg:flex'>
          {DATA.shared.quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className='text-lg font-medium transition-colors hover:text-primary'
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-4 justify-between'>
          <Button className='bg-sky-300' onClick={() => router.push('/explore')}>
            <Rocket className='w-5 h-5' />
            <span>Explore</span>
          </Button>

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
    <footer className='bg-black text-white py-12 border-t-4 border-black'>
      <div className='px-4 md:px-6'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <Link href={DATA.kinotio.url}>
              <Kinotio width={125} height={50} />
            </Link>
            <p className='text-gray-400 max-w-xs mt-6'>
              The platform for developers to showcase their skills, projects, and connect with
              opportunities.
            </p>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              {DATA.shared.quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className='text-gray-400 hover:text-white'>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Resources</h3>
            <ul className='space-y-2'>
              {DATA.shared.resources.map((resource, index) => (
                <li key={index}>
                  <Link href={resource.href} className='text-gray-400 hover:text-white'>
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='font-bold mb-4'>Connect</h3>
            <ul className='space-y-2'>
              {DATA.shared.connect.map((connect, index) => (
                <li key={index}>
                  <Link href={connect.href} className='text-gray-400 hover:text-white'>
                    {connect.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center'>
          <div className='flex items-center space-x-3 text-gray-400'>
            <div className='h-6 w-6 opacity-50'>
              <Heart />
            </div>
            <p>crafted with care and dedication.</p>
          </div>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            {DATA.shared.legal.map((legal, index) => (
              <Link key={index} href={legal.href} className='text-gray-400 hover:text-white'>
                {legal.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
