import { Separator } from '@/components/ui/separator'

interface ProfileStatsProps {
  stats: {
    projects: number
    experience: number
    clients: number
    awards: number
  }
}

export const ProfileSidebarStats = ({ stats }: ProfileStatsProps) => {
  return (
    <>
      <div className='grid grid-cols-2 gap-3 mb-6'>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{stats.projects}</div>
          <div className='text-sm font-bold'>Projects</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{stats.experience}+</div>
          <div className='text-sm font-bold'>Years Exp.</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{stats.clients}</div>
          <div className='text-sm font-bold'>Clients</div>
        </div>
        <div className='bg-[#f8f8f8] border-[3px] border-black p-3 text-center'>
          <div className='text-2xl font-black'>{stats.awards}</div>
          <div className='text-sm font-bold'>Awards</div>
        </div>
      </div>

      <Separator className='bg-black h-[3px] my-4' />
    </>
  )
}
