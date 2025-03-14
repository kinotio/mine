'use client'

import { useState, useEffect } from 'react'
import { MapPin } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfileDialogEdit } from '@/components/profile/dialog'

import { getColorFromString, getTextColorForBackground } from '@/lib/colors'
import { getBackgroundStyleByProfile, cn } from '@/lib/utils'

interface ProfileHeaderProps {
  profile: {
    name: string
    title: string
    location: string
    avatar_url: string
    banner_url: string
  }
  isScrolled: boolean
}

export const ProfileSidebarHeader = ({ profile, isScrolled }: ProfileHeaderProps) => {
  const [avatarColor, setAvatarColor] = useState('')
  const [textColor, setTextColor] = useState('#000000')

  // Generate a consistent color based on the user's name
  useEffect(() => {
    if (isEmpty(profile.avatar_url)) {
      const color = getColorFromString(profile.name)
      setAvatarColor(color)
      setTextColor(getTextColorForBackground(color))
    }
  }, [profile.name, profile.avatar_url])

  return (
    <div
      className='sticky top-0 bg-white z-10 border-b-[3px] border-black transition-all duration-300 ease-in-out overflow-hidden'
      style={getBackgroundStyleByProfile({
        avatarColor: avatarColor,
        bannerUrl: profile.banner_url
      })}
    >
      <div className='relative'>
        <div className='absolute top-2 right-4 z-20'>
          <ProfileDialogEdit />
        </div>

        <div className='flex flex-col items-center pt-4 pb-4 px-6'>
          <Avatar
            className={`transition-all duration-300 ease-in-out ${isScrolled ? 'w-16 h-16' : 'w-24 h-24'} border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:scale-105`}
          >
            {isEmpty(profile.avatar_url) ? (
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
              <AvatarImage src={profile.avatar_url} alt={profile.name} />
            )}
          </Avatar>
          <h1
            className={cn(
              'text-xl font-black mt-3 transition-colors duration-300 ease-in-out',
              !isEmpty(profile.banner_url) && 'text-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]'
            )}
          >
            {profile.name}
          </h1>

          {profile.title && (
            <p
              className={cn(
                'text-xl font-black mt-3 transition-colors duration-300 ease-in-out',
                !isEmpty(profile.banner_url) &&
                  'text-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]'
              )}
            >
              {profile.title}
            </p>
          )}

          {profile.location && (
            <div
              className={cn(
                'text-xl font-black mt-3 transition-colors duration-300 ease-in-out',
                !isEmpty(profile.banner_url) &&
                  'text-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.8)]'
              )}
            >
              <MapPin className='w-4 h-4 mr-1' />
              <span>{profile.location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
