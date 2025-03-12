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
  url: string
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
    { url: website, Icon: Globe, label: website },
    { url: github, Icon: Github, label: github },
    { url: x, Icon: X, label: x },
    { url: linkedin, Icon: Linkedin, label: linkedin },
    { url: bluesky, Icon: Bluesky, label: bluesky }
  ].filter((link): link is SocialLink => {
    return link.url != null && link.url !== ''
  })

  const renderLink = ({ url, Icon, label }: SocialLink) => (
    <div key={url} className='flex items-center'>
      <Icon className='w-5 h-5 mr-2' />
      <a
        href={`https://${url}`}
        target='_blank'
        rel='noopener noreferrer'
        className='underline font-medium'
      >
        {label}
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
