'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { ProfileProvider } from '@/components/mods/profile/profile-provider'
import { Mine } from '@/components/icons/mine'
import { ProfileSidebar } from '@/components/mods/profile/profile-sidebar'

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProfileProvider>
      <Header />
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10'>
        <div className='flex flex-col lg:block'>
          <ProfileSidebar />

          <div className='flex-1 overflow-hidden lg:ml-[380px] mt-4'>{children}</div>
        </div>
      </div>
    </ProfileProvider>
  )
}

const Header = () => {
  return (
    <header className='fixed top-0 z-40 bg-[#f0f0f0] w-full'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6 w-full'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='flex items-center gap-2'>
            <Mine width={125} height={50} />
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <div className='relative'>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default ProfileLayout
