import { ExternalLink, Code } from 'lucide-react'
import Image from 'next/image'

import { Github } from '@/components/icons'
import { ProjectData } from '@/lib/types/profile'

interface ProjectCardProps {
  project: ProjectData
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className='w-[300px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out'>
      <div className='h-[150px] border-b-[3px] border-black overflow-hidden relative group'>
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            className='w-full h-full object-cover'
            fill
          />
        ) : (
          <div
            className='w-full h-full flex items-center justify-center'
            style={{ backgroundColor: '#4cc9f0' }}
          >
            <div className='flex flex-col items-center'>
              <Code className='h-10 w-10 text-black mb-2' />
            </div>
          </div>
        )}
        <div className='absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'>
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
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
              className='bg-[#4fc3f7] hover:bg-[#29b6f6] text-black font-bold border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-2 rounded-md hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
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
          {Array.isArray(project.tags) && project.tags.length > 0
            ? project.tags?.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className='bg-[#f8f8f8] border-[2px] border-black px-2 py-1 text-xs font-bold'
                >
                  {tag}
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  )
}
