import { User } from 'lucide-react'

interface ProfileBioProps {
  bio: string
}

export const ProfileSidebarBio = ({ bio }: ProfileBioProps) => {
  return (
    <div className='mb-6'>
      <h2 className='text-xl font-bold mb-2 flex items-center'>
        <User className='mr-2' /> About Me
      </h2>
      <p>{bio}</p>
    </div>
  )
}
