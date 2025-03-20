import { Separator } from '@/components/ui/separator'

import { UserProfile } from '@/lib/types/profile'
import { calculateProfileStats } from '@/lib/utils'

interface ProfileStatsProps {
  profile: UserProfile
}

export const ProfileSidebarStats = ({ profile }: ProfileStatsProps) => {
  const calculatedStats = calculateProfileStats(profile)

  return (
    <>
      <div className='grid grid-cols-2 gap-3 mb-6'>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{calculatedStats.projects}</div>
          <div className='text-sm font-bold'>Projects</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{calculatedStats.experience}+</div>
          <div className='text-sm font-bold'>Years Exp.</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{calculatedStats.clients}</div>
          <div className='text-sm font-bold'>Clients</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{calculatedStats.awards}</div>
          <div className='text-sm font-bold'>Awards</div>
        </div>
      </div>

      <Separator className='bg-black h-[3px] my-4' />
    </>
  )
}
