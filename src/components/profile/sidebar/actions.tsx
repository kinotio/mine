'use client'

import { PlusCircle, User, Check, Copy, Download, Share2 } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/profile/provider'

import { useClipboard } from '@/hooks/use-clipboard'

interface ProfileActionsProps {
  onAddNewSection: () => void
}

export const ProfileSidebarActions = ({ onAddNewSection }: ProfileActionsProps) => {
  const { profile } = useProfile()
  const { isSignedIn } = useAuth()

  const { copyToClipboard, copied } = useClipboard()

  return (
    <div className='mt-8 mb-6'>
      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3 flex items-center'>
          <User className='mr-2' /> Profile Actions
        </h2>
        <div className='grid grid-cols-1 gap-3'>
          <Button className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
            <Download className='h-5 w-5 mr-2' />
            Download Resume
          </Button>
          <Button className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
            <Share2 className='h-5 w-5' />
            Share Profile
          </Button>
        </div>
      </div>

      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3'>Profile URL</h2>
        <div className='flex'>
          <div className='flex-1 bg-white border-[3px] border-black p-2 text-sm font-medium truncate'>
            {profile.profileUrl}
          </div>
          <Button
            onClick={() => copyToClipboard(profile.profileUrl)}
            className='ml-2 bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
          >
            {copied ? <Check className='h-5 w-5' /> : <Copy className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {isSignedIn ? (
        <Button
          onClick={onAddNewSection}
          className='w-full bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
        >
          <PlusCircle className='mr-2 h-5 w-5' /> Add New Section
        </Button>
      ) : null}
    </div>
  )
}
