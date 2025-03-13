import { SVGProps } from 'react'
import { Mail, Globe } from 'lucide-react'

import { Github, Linkedin, X, Bluesky } from '@/components/icons'
import { Separator } from '@/components/ui/separator'

interface ProfileContactProps {
  email: string
  website?: string
  github?: string
  x?: string
  linkedin?: string
  bluesky?: string
}

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

type SocialLink = {
  name: string
  Icon: IconComponent
  label: string
}

export const ProfileSidebarContact = ({
  email,
  website,
  github,
  x,
  linkedin,
  bluesky
}: ProfileContactProps) => {
  const socialLinks = [
    { name: website, Icon: Globe, label: 'website' },
    { name: github, Icon: Github, label: 'github' },
    { name: x, Icon: X, label: 'x' },
    { name: linkedin, Icon: Linkedin, label: 'linkedin' },
    { name: bluesky, Icon: Bluesky, label: 'bluesky' }
  ].filter((link): link is SocialLink => {
    return link.name != null && link.name !== ''
  })

  const getFullUrl = (platform: string, username: string) => {
    const urls = {
      github: `https://github.com/${username}`,
      linkedin: `https://linkedin.com/in/${username}`,
      x: `https://x.com/${username}`,
      bluesky: `https://bsky.app/profile/${username}`,
      website: username.startsWith('http') ? username : `https://${username}`
    }
    return urls[platform as keyof typeof urls] || username
  }

  const renderLink = ({ name, Icon, label }: SocialLink) => (
    <div key={name} className='flex items-center'>
      <Icon className='w-5 h-5 mr-2' />
      <a
        href={getFullUrl(label.toLowerCase(), name)}
        target='_blank'
        rel='noopener noreferrer'
        className='underline font-medium'
      >
        {name}
      </a>
    </div>
  )

  return (
    <>
      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-3'>Contact & Social</h2>
        <div className='space-y-3'>
          <div className='flex items-center'>
            <Mail className='w-5 h-5 mr-2' />
            <a href={`mailto:${email}`} className='underline font-medium'>
              {email}
            </a>
          </div>
          {socialLinks.map(renderLink)}
        </div>
      </div>

      <Separator className='bg-black h-[3px] my-4' />
    </>
  )
}
