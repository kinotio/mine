'use client'

import { User, Check, Copy } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/profile/provider'

import { ShareProfileDialog } from '@/components/profile/sidebar/share'
import { AddSectionDialog } from '@/components/profile/sidebar/section'
import { ResumeDialog } from '@/components/profile/sidebar/dialog/resume'

import { useClipboard } from '@/hooks/use-clipboard'

export const ProfileSidebarActions = () => {
  const { profile, hasPermission, isSignedIn } = useProfile()

  const { copyToClipboard, copied } = useClipboard()

  return (
    <div className='mt-8 mb-6'>
      {/* Profile Actions Section */}
      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3 flex items-center'>
          <User className='mr-2' /> Profile Actions
        </h2>
        <div className='grid grid-cols-1 gap-3'>
          <ResumeDialog profile={profile} />
          <ShareProfileDialog profileUrl={profile.profile_url} profileName={profile.name} />
        </div>
      </div>

      {/* Profile URL Section */}
      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3'>Profile URL</h2>
        <div className='flex'>
          <div className='flex-1 bg-white border-[3px] border-black p-2 text-sm font-medium truncate'>
            {profile.profile_url}
          </div>
          <Button
            onClick={() => copyToClipboard(profile.profile_url)}
            className='ml-2 bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
          >
            {copied ? <Check className='h-5 w-5' /> : <Copy className='h-5 w-5' />}
          </Button>
        </div>
      </div>

      {/* Add New Section Button (Only for signed-in users) */}
      {isSignedIn && hasPermission ? <AddSectionDialog /> : null}
    </div>
  )
}
