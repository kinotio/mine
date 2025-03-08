import { Mail } from 'lucide-react'
import { Github, Linkedin, X, Bluesky } from '@/components/icons'

interface ProfileContactProps {
  email: string
  github?: string
  x?: string
  linkedin?: string
  bluesky?: string
}

export const ProfileSidebarContact = ({
  email,
  github,
  x,
  linkedin,
  bluesky
}: ProfileContactProps) => {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-bold mb-3'>Contact & Social</h2>
      <div className='space-y-3'>
        <div className='flex items-center'>
          <Mail className='w-5 h-5 mr-2' />
          <a href={`mailto:${email}`} className='underline font-medium'>
            {email}
          </a>
        </div>
        <div className='flex items-center'>
          <Github className='w-5 h-5 mr-2' />
          <a
            href={`https://${github}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline font-medium'
          >
            {github}
          </a>
        </div>
        <div className='flex items-center'>
          <X className='w-5 h-5 mr-2' />
          <a
            href={`https://${x}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline font-medium'
          >
            {x}
          </a>
        </div>
        <div className='flex items-center'>
          <Linkedin className='w-5 h-5 mr-2' />
          <a
            href={`https://${linkedin}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline font-medium'
          >
            {linkedin}
          </a>
        </div>
        <div className='flex items-center'>
          <Bluesky className='w-5 h-5 mr-2' />
          <a
            href={`https://${bluesky}`}
            target='_blank'
            rel='noopener noreferrer'
            className='underline font-medium'
          >
            {bluesky}
          </a>
        </div>
      </div>
    </div>
  )
}
