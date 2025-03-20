'use client'

import { MapPin, Briefcase, Award } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { getColorFromString, getTextColorForBackground } from '@/lib/colors'
import { AdaptedProfile } from '@/app/(root)/explore/page'

interface CardProps {
  profile: AdaptedProfile
  viewMode: 'grid' | 'list'
  onClick: () => void
}

export const Card = ({ profile, viewMode, onClick }: CardProps) => {
  const avatarColor = getColorFromString(profile.name)
  const textColor = getTextColorForBackground(avatarColor)

  // Get initials for avatar fallback
  const getInitials = () => {
    return profile.name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }

  // Check if avatar is valid
  const hasValidAvatar = profile.avatar && profile.avatar !== ''

  if (viewMode === 'grid') {
    return (
      <div
        className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer'
        onClick={onClick}
      >
        <div className='p-6'>
          <div className='flex items-center mb-4'>
            <Avatar className='w-16 h-16 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mr-4'>
              {hasValidAvatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : (
                <AvatarFallback
                  style={{ backgroundColor: avatarColor, color: textColor }}
                  className='text-xl font-bold'
                >
                  {getInitials()}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className='text-xl font-bold'>{profile.name}</h3>
              <p className='text-gray-700'>{profile.title}</p>
            </div>
          </div>

          <div className='flex items-center mb-4 text-sm'>
            <MapPin className='h-4 w-4 mr-1' />
            <span>{profile.location}</span>
          </div>

          <div className='grid grid-cols-2 gap-2 mb-4'>
            <div className='bg-[#f8f8f8] border-[2px] border-black p-2 text-center'>
              <div className='text-lg font-bold'>{profile.stats.experience || 0}+</div>
              <div className='text-xs'>Years Exp.</div>
            </div>
            <div className='bg-[#f8f8f8] border-[2px] border-black p-2 text-center'>
              <div className='text-lg font-bold'>{profile.stats.projects}</div>
              <div className='text-xs'>Projects</div>
            </div>
          </div>

          <div className='mb-4'>
            <h4 className='font-bold mb-2 text-sm'>Top Skills</h4>
            <div className='flex flex-wrap gap-2'>
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className='bg-[#f8f8f8] border-[2px] border-black px-2 py-1 text-xs font-bold'
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='bg-[#4cc9f0] text-black font-bold border-t-[3px] border-black p-3 text-center'>
          View Profile
        </div>
      </div>
    )
  } else {
    return (
      <div
        className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer p-4 flex flex-col md:flex-row'
        onClick={onClick}
      >
        <div className='flex items-center mb-4 md:mb-0 md:mr-6'>
          <Avatar className='w-16 h-16 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
            {hasValidAvatar ? (
              <AvatarImage src={profile.avatar} alt={profile.name} />
            ) : (
              <AvatarFallback
                style={{ backgroundColor: avatarColor, color: textColor }}
                className='text-xl font-bold'
              >
                {getInitials()}
              </AvatarFallback>
            )}
          </Avatar>
        </div>

        <div className='flex-1'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-2'>
            <div>
              <h3 className='text-xl font-bold'>{profile.name}</h3>
              <p className='text-gray-700'>{profile.title}</p>
            </div>
            <div className='flex items-center mt-2 md:mt-0 text-sm'>
              <MapPin className='h-4 w-4 mr-1' />
              <span>{profile.location}</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-4 mb-4'>
            <div className='flex items-center'>
              <Briefcase className='h-4 w-4 mr-1' />
              <span className='text-sm'>{profile.stats.experience || 0}+ years experience</span>
            </div>
            <div className='flex items-center'>
              <Award className='h-4 w-4 mr-1' />
              <span className='text-sm'>{profile.stats.projects} projects</span>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {profile.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className='bg-[#f8f8f8] border-[2px] border-black px-2 py-1 text-xs font-bold'
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>

        <div className='mt-4 md:mt-0 md:ml-4 flex items-center'>
          <div className='bg-[#4cc9f0] text-black font-bold border-[2px] border-black px-4 py-2 text-center whitespace-nowrap'>
            View Profile
          </div>
        </div>
      </div>
    )
  }
}
