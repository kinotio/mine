interface ExperienceCardProps {
  experience: {
    company: string
    position: string
    period: string
    description: string
  }
}

export const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  return (
    <div className='w-[350px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='bg-[#f72585] text-white inline-block px-3 py-1 mb-3 font-bold border-[2px] border-black'>
        {experience.period}
      </div>
      <h3 className='text-xl font-bold'>{experience.position}</h3>
      <h4 className='text-lg font-medium mb-3 text-gray-700'>{experience.company}</h4>
      <p className='text-gray-700'>{experience.description}</p>
    </div>
  )
}
