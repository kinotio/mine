'use client'

import { useState } from 'react'
import { Copy, Mail, Share2 } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, X, Whatsapp, Bluesky, Telegram } from '@/components/icons'

import { useToast } from '@/hooks/use-toast'

interface ShareProfileDialogProps {
  profileUrl: string
  profileName: string
  trigger?: React.ReactNode
}

export const ShareProfileDialog = ({
  profileUrl,
  profileName,
  trigger
}: ShareProfileDialogProps) => {
  const { toast } = useToast()

  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        setCopied(true)
        toast({
          title: 'URL copied',
          description: 'Profile URL has been copied to clipboard'
        })
        setTimeout(() => setCopied(false), 2000)
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
        toast({
          title: 'Copy failed',
          description: 'Could not copy URL to clipboard',
          variant: 'destructive'
        })
      })
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className='h-5 w-5' />,
      color: '#1877F2',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`
    },
    {
      name: 'X (Twitter)',
      icon: <X className='h-5 w-5' />,
      color: '#000000',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=Check out ${profileName}'s profile`
    },
    {
      name: 'Bluesky',
      icon: <Bluesky className='h-5 w-5' />,
      color: '#0085FF',
      url: `https://bsky.app/intent/compose?text=Check out ${profileName}'s profile: ${profileUrl}`
    },
    {
      name: 'Telegram',
      icon: <Telegram className='h-5 w-5' />,
      color: '#0088cc',
      url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=Check out ${profileName}'s profile`
    },
    {
      name: 'WhatsApp',
      icon: <Whatsapp className='h-5 w-5' />,
      color: '#25D366',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out ${profileName}'s profile: ${profileUrl}`)}`
    },
    {
      name: 'Email',
      icon: <Mail className='h-5 w-5' />,
      color: '#D44638',
      url: `mailto:?subject=Check out ${encodeURIComponent(profileName)}'s profile&body=${encodeURIComponent(`I thought you might be interested in ${profileName}'s profile: ${profileUrl}`)}`
    }
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className='w-full bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
            <Share2 className='mr-2 h-5 w-5' />
            Share Profile
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[500px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Share Profile</DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          <div className='flex mb-6'>
            <Input
              value={profileUrl}
              readOnly
              className='flex-1 border-[3px] border-black focus-visible:ring-0 focus-visible:ring-offset-0'
            />
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
                <Copy className='h-5 w-5' />
              )}
            </Button>
          </div>

          <h3 className='font-bold text-lg mb-4'>Share on:</h3>

          <div className='grid grid-cols-3 gap-4'>
            {shareLinks.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex flex-col items-center'
              >
                <div
                  className='w-14 h-14 flex items-center justify-center border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all mb-2'
                  style={{
                    backgroundColor: platform.color,
                    color: platform.color === '#000000' ? 'white' : 'black'
                  }}
                >
                  {platform.icon}
                </div>
                <span className='text-sm font-medium text-center'>{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
