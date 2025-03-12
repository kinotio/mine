'use client'

import { isEmpty } from 'lodash'

import { ProfileSidebar } from '@/components/profile/sidebar'
import { useProfile } from '@/components/profile/provider'
import { ProfileNotFound } from '@/components/profile/not-found'
import { ProfileLoader } from '@/components/profile/loader'

export const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const { profile, loading } = useProfile()

  if (loading) {
    return (
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
        <ProfileLoader />
      </div>
    )
  }

  if (!profile && isEmpty(profile)) {
    return (
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
        <ProfileNotFound />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
      <div className='flex flex-col lg:block'>
        <ProfileSidebar />
        <div className='flex-1 overflow-hidden lg:ml-[380px] mt-6 lg:mt-0'>{children}</div>
      </div>
    </div>
  )
}
