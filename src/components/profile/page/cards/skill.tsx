interface SkillCardProps {
  skill: {
    name: string
    level: number
  }
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className='w-[200px] h-[200px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'>
      <div className='w-24 h-24 rounded-full border-[3px] border-black bg-[#f8f8f8] flex items-center justify-center mb-3 relative'>
        <div className='text-2xl font-black'>{skill.level}%</div>
        <svg className='absolute inset-0' width='100%' height='100%' viewBox='0 0 100 100'>
          <circle cx='50' cy='50' r='40' fill='none' stroke='#e0e0e0' strokeWidth='8' />
          <circle
            cx='50'
            cy='50'
            r='40'
            fill='none'
            stroke={skill.level >= 80 ? '#8ac926' : skill.level >= 60 ? '#4cc9f0' : '#ff6b6b'}
            strokeWidth='8'
            strokeDasharray={`${(2 * Math.PI * 40 * skill.level) / 100} ${2 * Math.PI * 40 * (1 - skill.level / 100)}`}
            strokeDashoffset={2 * Math.PI * 40 * 0.25}
            transform='rotate(-90 50 50)'
          />
        </svg>
      </div>
      <h3 className='text-lg font-bold text-center'>{skill.name}</h3>
    </div>
  )
}
