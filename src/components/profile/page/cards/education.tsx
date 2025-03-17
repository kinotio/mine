import { GraduationCap } from 'lucide-react'

interface EducationCardProps {
  education: {
    institution: string
    degree: string
    period: string
    description: string
  }
}

export const EducationCard = ({ education }: EducationCardProps) => {
  return (
    <div className='w-[350px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='flex justify-between items-start mb-3'>
        <div className='flex items-center'>
          <div className='w-10 h-10 bg-[#7209b7] rounded-full border-[2px] border-black mr-3 flex items-center justify-center'>
            <GraduationCap className='h-5 w-5 text-white' />
          </div>
          <h3 className='text-xl font-bold'>{education.degree}</h3>
        </div>
        <div className='bg-[#7209b7] text-white px-3 py-1 font-bold border-[2px] border-black text-sm'>
          {education.period}
        </div>
      </div>
      <h4 className='text-lg font-medium mb-3 text-gray-700'>{education.institution}</h4>
      <p className='text-gray-700'>{education.description}</p>
    </div>
  )
}
