'use client'

import { useRouter } from 'next/navigation'
import { Home, UserPlus, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const NotFound = () => {
  const router = useRouter()

  return (
    <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 flex items-center justify-center'>
      <div className='w-full max-w-2xl'>
        <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-8'>
          {/* Header */}
          <div className='mb-8 text-center'>
            <h1 className='text-4xl font-black mb-2'>Profile Not Found</h1>
            <div className='h-1 w-full bg-[#4cc9f0] mb-4'></div>
            <p className='text-lg'>
              {`The profile you're looking for doesn't exist or may have been removed.`}
            </p>
          </div>

          {/* Icon */}
          <div className='flex justify-center mb-8'>
            <div className='w-24 h-24 bg-[#f8f8f8] border-[3px] border-black rounded-full flex items-center justify-center'>
              <Search className='w-12 h-12' />
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              onClick={() => router.push('/')}
              className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              <Home className='mr-2 h-5 w-5' /> Return Home
            </Button>

            <Button
              onClick={() => router.push('/create-profile')}
              className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              <UserPlus className='mr-2 h-5 w-5' /> Create Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
