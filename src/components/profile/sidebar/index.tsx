'use client'

import { useState, useEffect } from 'react'

import { useProfile } from '@/components/profile/provider'
import { ProfileSidebarHeader } from '@/components/profile/sidebar/header'

import { ProfileSidebarBio } from '@/components/profile/sidebar/bio'
import { ProfileSidebarContact } from '@/components/profile/sidebar/contact'
import { ProfileSidebarActions } from '@/components/profile/sidebar/actions'

export const ProfileSidebar = () => {
  const { profile } = useProfile()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const sidebar = document.querySelector('.sidebar-container')

    if (sidebar) {
      const handleScroll = () => {
        if (sidebar.scrollTop > 10) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      sidebar.addEventListener('scroll', handleScroll)
      return () => sidebar.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='w-full lg:fixed lg:left-10 lg:top-10 lg:w-[350px] h-fit z-10 mt-16'>
      <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] relative lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto scroll-smooth sidebar-container'>
        <ProfileSidebarHeader profile={profile} isScrolled={isScrolled} />

        <div className='p-6 pt-4'>
          <ProfileSidebarBio bio={profile?.bio} />

          <ProfileSidebarContact
            email={profile.email}
            website={profile.website}
            github={profile.github}
            x={profile.x}
            linkedin={profile.linkedin}
            bluesky={profile.bluesky}
          />

          <ProfileSidebarActions onAddNewSection={() => {}} />
        </div>
      </div>
    </div>
  )
}
