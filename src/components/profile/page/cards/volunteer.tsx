interface VolunteerCardProps {
  volunteer: {
    organization: string
    role: string
    period: string
    description: string
  }
}

export const VolunteerCard = ({ volunteer }: VolunteerCardProps) => {
  return (
    <div className='w-[350px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='bg-[#e63946] text-white inline-block px-3 py-1 mb-3 font-bold border-[2px] border-black'>
        {volunteer.period}
      </div>
      <h3 className='text-xl font-bold'>{volunteer.role}</h3>
      <h4 className='text-lg font-medium mb-3 text-gray-700'>{volunteer.organization}</h4>
      <p className='text-gray-700'>{volunteer.description}</p>
    </div>
  )
}
