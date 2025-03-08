'use client'

import { PlusCircle, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useClipboard } from '@/hooks/use-clipboard'

interface ProfileActionsProps {
  onAddNewSection: () => void
}

export const ProfileSidebarActions = ({ onAddNewSection }: ProfileActionsProps) => {
  const { copyToClipboard, copied } = useClipboard()

  return (
    <div className='mt-8 mb-6'>
      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3 flex items-center'>
          <User className='mr-2' /> Profile Actions
        </h2>
        <div className='grid grid-cols-1 gap-3'>
          <Button className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
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
          <Button className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
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
            onClick={() => copyToClipboard('https://portfolio.dev/janedeveloper')}
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
        onClick={onAddNewSection}
        className='w-full bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
      >
        <PlusCircle className='mr-2 h-5 w-5' /> Add New Section
      </Button>
    </div>
  )
}
