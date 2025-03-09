'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { UserButton, useAuth } from '@clerk/nextjs'

import { ProfileProvider } from '@/components/profile/provider'
import { ProfileSidebar } from '@/components/profile/sidebar'
import { Mine } from '@/components/icons'

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileProvider>
      <Header />
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
        <div className='flex flex-col lg:block'>
          <ProfileSidebar />
          <div className='flex-1 overflow-hidden lg:ml-[380px] mt-6 lg:mt-0'>{children}</div>
        </div>
      </div>
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
          <div className='flex items-center gap-4'>
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
