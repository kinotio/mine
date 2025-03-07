'use client'

import { useState } from 'react'
import { Edit, Github, Linkedin, Mail, MapPin, PlusCircle, Twitter, User } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useProfile } from '@/components/mods/profile/profile-provider'

export const ProfileSidebar = () => {
  const { profile } = useProfile()
  const [copied, setCopied] = useState(false)
  const [customSections, setCustomSections] = useState([])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText('https://portfolio.dev/janedeveloper')
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  const addNewSection = () => {
    setCustomSections([
      ...customSections,
      {
        id: `section-${Date.now()}`,
        title: 'New Section',
        items: []
      }
    ])
  }

  return (
    <div className='w-full lg:fixed lg:left-10 lg:top-24 lg:w-[350px] h-fit z-10'>
      <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 pt-8 pb-8 relative lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto'>
        <div className='absolute top-4 right-4'>
          <Button
            className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all h-10 w-10 p-0'
            aria-label='Edit Profile'
          >
            <Edit className='h-5 w-5' />
          </Button>
        </div>

        <div className='flex flex-col items-center mb-6'>
          <Avatar className='w-32 h-32 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className='bg-[#ff6b6b] text-3xl font-bold'>
              {profile.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
          <h1 className='text-2xl font-black mt-4'>{profile.name}</h1>
          <p className='font-bold text-lg'>{profile.title}</p>
          <div className='flex items-center mt-2'>
            <MapPin className='w-4 h-4 mr-1' />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Profile Stats */}
        <div className='grid grid-cols-2 gap-3 mb-6'>
          <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
            <div className='text-2xl font-black'>{profile.stats.projects}</div>
            <div className='text-sm font-bold'>Projects</div>
          </div>
          <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
            <div className='text-2xl font-black'>{profile.stats.experience}+</div>
            <div className='text-sm font-bold'>Years Exp.</div>
          </div>
          <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
            <div className='text-2xl font-black'>{profile.stats.clients}</div>
            <div className='text-sm font-bold'>Clients</div>
          </div>
          <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
            <div className='text-2xl font-black'>{profile.stats.awards}</div>
            <div className='text-sm font-bold'>Awards</div>
          </div>
        </div>

        <Separator className='bg-black h-[3px] my-4' />

        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-2 flex items-center'>
            <User className='mr-2' /> Bio
          </h2>
          <p>{profile.bio}</p>
        </div>

        <Separator className='bg-black h-[3px] my-4' />

        <div className='mb-6'>
          <h2 className='text-xl font-bold mb-3'>Contact & Social</h2>
          <div className='space-y-3'>
            <div className='flex items-center'>
              <Mail className='w-5 h-5 mr-2' />
              <a href={`mailto:${profile.email}`} className='underline font-medium'>
                {profile.email}
              </a>
            </div>
            <div className='flex items-center'>
              <Github className='w-5 h-5 mr-2' />
              <a
                href={`https://${profile.github}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline font-medium'
              >
                {profile.github}
              </a>
            </div>
            <div className='flex items-center'>
              <Twitter className='w-5 h-5 mr-2' />
              <a
                href={`https://${profile.twitter}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline font-medium'
              >
                {profile.twitter}
              </a>
            </div>
            <div className='flex items-center'>
              <Linkedin className='w-5 h-5 mr-2' />
              <a
                href={`https://${profile.linkedin}`}
                target='_blank'
                rel='noopener noreferrer'
                className='underline font-medium'
              >
                {profile.linkedin}
              </a>
            </div>
          </div>
        </div>

        <div className='mt-8 mb-6'>
          <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
            <h2 className='text-xl font-bold mb-3 flex items-center'>
              <User className='mr-2' /> Profile Actions
            </h2>
            <div className='grid grid-cols-1 gap-3'>
              <Button className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                  />
                </svg>
                Download Resume
              </Button>
              <Button className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
                  />
                </svg>
                Share Profile
              </Button>
            </div>
          </div>

          <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
            <h2 className='text-xl font-bold mb-3'>Profile URL</h2>
            <div className='flex'>
              <div className='flex-1 bg-white border-[3px] border-black p-2 text-sm font-medium truncate'>
                https://portfolio.dev/janedeveloper
              </div>
              <Button
                onClick={copyToClipboard}
                className='ml-2 bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
              >
                {copied ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5 text-black'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={addNewSection}
            className='w-full bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
          >
            <PlusCircle className='mr-2 h-5 w-5' /> Add New Section
          </Button>
        </div>
      </div>
    </div>
  )
}
