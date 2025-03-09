'use client'

import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ProfileDialogEdit } from '@/components/profile/dialog/edit'

import { getColorFromString, getGradientFromColor, getTextColorForBackground } from '@/lib/colors'

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
  const [avatarColor, setAvatarColor] = useState('')
  const [textColor, setTextColor] = useState('#000000')

  // Generate a consistent color based on the user's name
  useEffect(() => {
    const color = getColorFromString(profile.name)
    setAvatarColor(color)
    setTextColor(getTextColorForBackground(color))
  }, [profile.name])

  // Determine background style based on whether a banner image exists
  const backgroundStyle = isEmpty(profile.bannerUrl)
    ? { background: getGradientFromColor(avatarColor) }
    : {
        backgroundImage: `url(${profile.bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }

  return (
    <div
      className='sticky top-0 bg-white z-10 border-b-[3px] border-black transition-all duration-300 ease-in-out overflow-hidden'
      style={backgroundStyle}
    >
      <div className='relative bg-white/80 backdrop-blur-sm'>
        <div className='absolute top-2 right-4 z-20'>
          <ProfileDialogEdit />
        </div>

        <div className='flex flex-col items-center pt-4 pb-4 px-6'>
          <Avatar
            className={`transition-all duration-300 ease-in-out ${isScrolled ? 'w-16 h-16' : 'w-24 h-24'} border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105`}
          >
            {isEmpty(profile.avatarUrl) ? (
              <AvatarFallback
                style={{ backgroundColor: avatarColor, color: textColor }}
                className='text-3xl font-bold'
              >
                {profile.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            ) : (
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            )}
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
