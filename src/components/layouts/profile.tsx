'use client'

import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { UserButton, useAuth, SignedOut, SignUpButton, SignInButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Mine } from '@/components/icons'
import { ProfileProvider } from '@/components/profile/provider'
import { ProfileWrapper } from '@/components/profile/wrapper'
import { Toaster } from '@/components/ui/toaster'
import { FeedbackDialog } from '@/components/profile/feedback/dialog'
import { Settings } from '@/components/profile/page/dialog/settings'

export const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProfileProvider>
      <Header />
      <ProfileWrapper>{children}</ProfileWrapper>
      <Toaster />
    </ProfileProvider>
  )
}

const Header = () => {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  return (
    <header className='fixed top-0 z-40 bg-[#f0f0f0] w-full'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6 w-full'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <Mine width={100} height={50} />
          </Link>
        </div>

        {isSignedIn ? (
          <div className='flex items-center gap-5'>
            <FeedbackDialog />

            <Settings />

            <div className='relative'>
              <UserButton />
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-4 justify-between'>
            <SignedOut>
              <Button className='bg-sky-300' onClick={() => router.push('/explore')}>
                <Rocket className='w-5 h-5' />
                <span>Explore</span>
              </Button>
            </SignedOut>

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
        )}
      </div>
    </header>
  )
}

export default ProfileLayout
