'use client'

import { Briefcase, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/mods/profile/profile-provider'

export const ProfileWorks = () => {
  const { profile } = useProfile()

  const handleAddWorkExperience = () => {
    console.log('Add Work Experience')
  }

  return (
    <section className='mb-10'>
      <div className='flex justify-between items-center mb-6 mt-2 mr-6'>
        <h2 className='text-3xl font-black flex items-center'>
          <Briefcase className='mr-2' /> Work Experience
        </h2>
        <Button
          onClick={handleAddWorkExperience}
          className='bg-[#f72585] hover:bg-[#e61a76] text-white font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
        >
          <Plus className='mr-2 h-5 w-5' /> Add Experience
        </Button>
      </div>
      <div className='overflow-x-auto pb-4 -mx-4 px-4 pt-4' style={{ overflowY: 'hidden' }}>
        <div className='flex gap-6 min-w-max'>
          {profile.workExperience.map((work, index) => (
            <div
              key={index}
              className='w-[350px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-5 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              <div className='bg-[#f72585] text-white inline-block px-3 py-1 mb-3 font-bold border-[2px] border-black'>
                {work.current ? 'Current' : 'Previous'}
              </div>
              <h3 className='text-xl font-bold'>{work.position}</h3>
              <h4 className='text-lg font-medium mb-3 text-gray-700'>{work.company}</h4>
              <p className='text-gray-700'>{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
