'use client'

import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'

import { Mine } from '@/components/icons'
import { ProfileProvider } from '@/components/profile/provider'
import { ProfileWrapper } from '@/components/profile/wrapper'
import { Toaster } from '@/components/ui/toaster'
import { FeedbackDialog } from '@/components/profile/feedback/dialog'

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

            <div className='relative'>
              <UserButton />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default ProfileLayout
