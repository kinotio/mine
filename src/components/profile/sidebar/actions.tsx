'use client'

import { useState } from 'react'
import { PlusCircle, User, Check, Copy, Download, Share2, Mail, Send } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, Linkedin, Facebook, Whatsapp } from '@/components/icons'
import { useProfile } from '@/components/profile/provider'
import { useClipboard } from '@/hooks/use-clipboard'

interface ProfileActionsProps {
  onAddNewSection: () => void
}

export const ProfileSidebarActions = ({ onAddNewSection }: ProfileActionsProps) => {
  const { profile } = useProfile()
  const { isSignedIn } = useAuth()
  const { copyToClipboard, copied } = useClipboard()
  const [isShareOpen, setIsShareOpen] = useState(false)

  const SHARE_MESSAGES = {
    default: '🚀 Check out my professional portfolio on Mine',
    social: '🚀 Explore my work and achievements on Mine',
    linkedin: '🎯 View my professional experience and portfolio on Mine',
    email: {
      subject: 'Professional Portfolio on Mine',
      body: `Hi there,

  I wanted to share my professional portfolio with you. You can explore my work, experience, and achievements on Mine.`
    }
  }

  const shareOptions = [
    {
      name: 'X',
      icon: X,
      onClick: () => {
        window.open(
          `https://x.com/intent/tweet?text=${encodeURIComponent(
            SHARE_MESSAGES.social
          )}&url=${encodeURIComponent(profile.profile_url)}`,
          '_blank'
        )
        setIsShareOpen(false)
      }
    },
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            profile.profile_url
          )}&quote=${encodeURIComponent(SHARE_MESSAGES.social)}`,
          '_blank'
        )
        setIsShareOpen(false)
      }
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            profile.profile_url
          )}&summary=${encodeURIComponent(SHARE_MESSAGES.linkedin)}`,
          '_blank'
        )
        setIsShareOpen(false)
      }
    },
    {
      name: 'WhatsApp',
      icon: Whatsapp,
      onClick: () => {
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            `${SHARE_MESSAGES.default}\n\n${profile.profile_url}`
          )}`,
          '_blank'
        )
        setIsShareOpen(false)
      }
    },
    {
      name: 'Telegram',
      icon: Send,
      onClick: () => {
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            profile.profile_url
          )}&text=${encodeURIComponent(SHARE_MESSAGES.default)}`,
          '_blank'
        )
        setIsShareOpen(false)
      }
    },
    {
      name: 'Email',
      icon: Mail,
      onClick: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          SHARE_MESSAGES.email.subject
        )}&body=${encodeURIComponent(`${SHARE_MESSAGES.email.body}\n\n${profile.profile_url}`)}`
        setIsShareOpen(false)
      }
    }
  ]

  return (
    <div className='mt-8 mb-6'>
      {/* Profile Actions Section */}
      <div className='bg-[#f8f8f8] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 mb-6'>
        <h2 className='text-xl font-bold mb-3 flex items-center'>
          <User className='mr-2' /> Profile Actions
        </h2>
        <div className='grid grid-cols-1 gap-3'>
          <Button className='w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
            <Download className='h-5 w-5 mr-2' />
            Download Resume
          </Button>
          <Button
            onClick={() => setIsShareOpen(true)}
            className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'
          >
            <Share2 className='h-5 w-5 mr-2' />
            Share Profile
          </Button>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
        <DialogContent className='sm:max-w-[425px] bg-white p-6 border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
          <h2 className='text-xl font-bold mb-4'>Share Profile</h2>
          <div className='grid grid-cols-2 gap-3'>
            {shareOptions.map((option) => (
              <Button
                key={option.name}
                variant='neutral'
                className='w-full justify-center items-center font-medium hover:bg-gray-100 py-4 border-2 border-black'
                onClick={option.onClick}
              >
                <div className='flex items-center justify-center gap-3'>
                  <option.icon className='h-6 w-6' />
                  <span>{option.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
      {isSignedIn && (
        <Button
          onClick={onAddNewSection}
          className='w-full bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
        >
          <PlusCircle className='mr-2 h-5 w-5' /> Add New Section
        </Button>
      )}
    </div>
  )
}
