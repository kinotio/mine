import { User } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Separator } from '@/components/ui/separator'

interface ProfileBioProps {
  bio: string
}

export const ProfileSidebarBio = ({ bio }: ProfileBioProps) => {
  if (isEmpty(bio)) return null

  return (
    <>
      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2 flex items-center'>
          <User className='mr-2' /> Bio
        </h2>
        <p>{bio}</p>
      </div>

      <Separator className='bg-black h-[3px] my-4' />
    </>
  )
}
