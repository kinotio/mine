'use client'

import { Camera, Edit, MapPin } from 'lucide-react'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

interface ProfileHeaderProps {
  profile: {
    name: string
    title: string
    location: string
    avatarUrl: string
    bannerUrl: string
  }
  isScrolled: boolean
}

export const ProfileSidebarHeader = ({ profile, isScrolled }: ProfileHeaderProps) => {
  const [showBannerEdit, setShowBannerEdit] = useState(false)

  return (
    <div
      className='sticky top-0 bg-white z-10 border-b-[3px] border-black transition-all duration-300 ease-in-out overflow-hidden'
      style={{
        backgroundImage: `url(${profile.bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${showBannerEdit ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => setShowBannerEdit(true)}
        onMouseLeave={() => setShowBannerEdit(false)}
      >
        <Button className='bg-white hover:bg-gray-100 text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
          <Camera className='mr-2 h-5 w-5' /> Change Banner
        </Button>
      </div>

      <div className='relative bg-white/80 backdrop-blur-sm'>
        <div className='absolute top-2 right-4 z-20'>
          <Button
            className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all h-10 w-10 p-0'
            aria-label='Edit Profile'
          >
            <Edit className='h-5 w-5' />
          </Button>
        </div>

        <div className='flex flex-col items-center pt-4 pb-4 px-6'>
          <Avatar
            className={`transition-all duration-300 ease-in-out ${isScrolled ? 'w-16 h-16' : 'w-24 h-24'} border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105`}
          >
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className='bg-[#ff6b6b] text-3xl font-bold'>
              {profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className='text-xl font-black mt-3 transition-colors duration-300 ease-in-out'>
            {profile.name}
          </h1>
          <p className='font-bold transition-colors duration-300 ease-in-out'>{profile.title}</p>
          <div className='flex items-center mt-1 transition-colors duration-300 ease-in-out'>
            <MapPin className='w-4 h-4 mr-1' />
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
