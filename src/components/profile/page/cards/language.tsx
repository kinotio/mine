import { Globe } from 'lucide-react'

interface LanguageCardProps {
  language: {
    name: string
    proficiency: string
    level: number
  }
}

export const LanguageCard = ({ language }: LanguageCardProps) => {
  return (
    <div className='w-[200px] h-[200px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='w-16 h-16 rounded-full border-[3px] border-black bg-[#06d6a0] flex items-center justify-center mb-3 relative'>
        <Globe className='h-8 w-8 text-black' />
      </div>
      <h3 className='text-lg font-bold text-center'>{language.name}</h3>
      <div className='mt-2 w-full bg-gray-200 h-3 border-[1px] border-black'>
        <div className='h-full bg-[#06d6a0]' style={{ width: `${language.level}%` }}></div>
      </div>
      <p className='mt-2 text-sm font-bold'>{language.proficiency}</p>
    </div>
  )
}
