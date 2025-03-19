'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Home } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProfileNotFoundProps {
  username?: string
  onSearch?: (query: string) => void
}

export const ProfileNotFound = ({ username, onSearch }: ProfileNotFoundProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) onSearch(searchQuery.trim())
  }

  return (
    <div className='w-full max-w-3xl mx-auto p-6'>
      <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
        {/* Content */}
        <div className='p-6'>
          <div className='flex flex-col md:flex-row gap-8 items-center'>
            {/* Left - Illustration */}
            <div className='w-40 h-40 flex-shrink-0'>
              <div className='w-full h-full relative'>
                {/* Stylized octocat-inspired shape with neobrutalist design */}
                <div className='absolute inset-0 bg-[#f0f0f0] border-[3px] border-black rounded-full'></div>
                <div className='absolute w-16 h-16 top-6 left-6 bg-white border-[3px] border-black rounded-full flex items-center justify-center'>
                  <span className='text-2xl'>?</span>
                </div>
                <div className='absolute w-10 h-10 bottom-4 right-4 bg-[#4cc9f0] border-[3px] border-black rounded-full'></div>
                <div className='absolute w-8 h-8 top-2 right-8 bg-[#8ac926] border-[3px] border-black rounded-full'></div>
                <div className='absolute w-6 h-14 -bottom-2 left-10 bg-[#f0f0f0] border-[3px] border-black rounded-full transform rotate-45'></div>
                <div className='absolute w-6 h-14 -bottom-2 right-10 bg-[#f0f0f0] border-[3px] border-black rounded-full transform -rotate-45'></div>
              </div>
            </div>

            {/* Right - Content */}
            <div className='flex-1'>
              <h1 className='text-2xl font-black mb-4'>
                {username ? `${username} doesn't exist` : 'Profile not found'}
              </h1>

              <div className='bg-[#ffde5920] border-l-4 border-[#ffde59] p-4 mb-6'>
                <p className='text-gray-800'>
                  {`
                  The profile you're looking for doesn't exist or may have been removed. Make sure
                  you've entered the correct username.`}
                </p>
              </div>

              {/* Search form - GitHub style */}
              <form onSubmit={handleSearch} className='mb-6'>
                <div className='flex gap-2'>
                  <Input
                    type='text'
                    placeholder='@...'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='flex-1 border-[3px] border-black focus-visible:ring-0 focus-visible:ring-offset-0'
                  />
                  <Button
                    type='submit'
                    className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                  >
                    <Search className='h-5 w-5' />
                  </Button>
                </div>
              </form>

              {/* Suggestions - GitHub style */}
              <div className='space-y-4'>
                <h3 className='font-bold text-lg'>You might want to:</h3>
                <ul className='space-y-2'>
                  <li className='flex items-center'>
                    <div className='w-8 h-8 bg-[#8ac926] border-[2px] border-black rounded-md flex items-center justify-center mr-3'>
                      <Home className='h-4 w-4 text-black' />
                    </div>
                    <Link href='/' className='text-[#4cc9f0] hover:underline font-medium'>
                      Go to the homepage
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='bg-[#f6f8fa] border-t-[3px] border-black p-4 text-center'>
          <p className='text-sm'>
            If you believe this is an error, please{' '}
            <Link
              href='mailto:contact@kinotio.io'
              className='text-[#4cc9f0] hover:underline font-medium'
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
