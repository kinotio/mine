import { Trophy } from 'lucide-react'

interface AchievementCardProps {
  achievement: {
    title: string
    issuer: string
    date: string
    description: string
  }
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  return (
    <div className='w-[300px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='flex items-center mb-3'>
        <div className='w-12 h-12 bg-[#ffde59] rounded-full border-[2px] border-black mr-3 flex items-center justify-center'>
          <Trophy className='h-6 w-6 text-black' />
        </div>
        <div className='bg-[#ffde59] text-black px-2 py-1 text-sm font-bold border-[2px] border-black'>
          {achievement.date}
        </div>
      </div>
      <h3 className='text-xl font-bold mb-1'>{achievement.title}</h3>
      <h4 className='text-md font-medium mb-3 text-gray-700'>Awarded by {achievement.issuer}</h4>
      <p className='text-gray-700'>{achievement.description}</p>
    </div>
  )
}
