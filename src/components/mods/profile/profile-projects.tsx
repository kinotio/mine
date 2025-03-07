'use client'

import Image from 'next/image'
import { Code, ExternalLink, Github, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/mods/profile/profile-provider'

export const ProfileProjects = () => {
  const { profile } = useProfile()

  const handleAddProject = () => {
    console.log('Add Project')
  }

  return (
    <section className='mb-10'>
      <div className='flex justify-between items-center mb-6 mr-6 mt-2'>
        <h2 className='text-3xl font-black flex items-center'>
          <Code className='mr-2' /> Projects
        </h2>
        <Button
          onClick={handleAddProject}
          className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
        >
          <Plus className='mr-2 h-5 w-5' /> Add Project
        </Button>
      </div>
      <div className='overflow-x-auto pb-4 -mx-4 px-4 pt-4' style={{ overflowY: 'hidden' }}>
        <div className='flex gap-6 min-w-max'>
          {profile.projects.map((project, index) => (
            <div
              key={index}
              className='w-[300px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'
            >
              <div className='h-[150px] border-b-[3px] border-black overflow-hidden relative group'>
                <Image
                  src={project.imageUrl || '/placeholder.svg'}
                  alt={project.title}
                  className='w-full h-full object-cover'
                  layout='fill'
                />
                <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity'>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 rounded-md hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
                    >
                      <Github className='h-5 w-5' />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-[#ff6b6b] hover:bg-[#ff5252] text-black font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 rounded-md hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
                    >
                      <ExternalLink className='h-5 w-5' />
                    </a>
                  )}
                </div>
              </div>
              <div className='p-4'>
                <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
                <p className='mb-3 text-gray-700'>{project.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((techno, technoIndex) => (
                    <span
                      key={technoIndex}
                      className='bg-[#f8f8f8] border-[2px] border-black px-2 py-1 text-xs font-bold'
                    >
                      {techno}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
