import Image from 'next/image'

import { CertificationData } from '@/lib/types/profile'

interface CertificationCardProps {
  certification: CertificationData
}

export const CertificationCard = ({ certification }: CertificationCardProps) => {
  return (
    <div className='w-[250px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='flex items-center mb-3'>
        <div className='w-12 h-12 bg-[#f8f8f8] rounded-full border-[2px] border-black mr-3 overflow-hidden'>
          <Image
            src={certification.image || '/placeholder.svg'}
            alt={certification.issuer}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='bg-[#7209b7] text-white px-2 py-1 text-sm font-bold border-[2px] border-black'>
          {certification.date}
        </div>
      </div>
      <h3 className='text-lg font-bold'>{certification.name}</h3>
      <p className='text-sm text-gray-700'>Issued by {certification.issuer}</p>
    </div>
  )
}
