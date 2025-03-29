'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Github } from '@/components/icons'

import { getColorFromString, getTextColorForBackground } from '@/lib/colors'
import { getUserProfileInitial } from '@/lib/utils'

import showcaseData from '@/data/showcase.json'

export const Showcase = () => {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <section id='showcase' className='bg-yellow-200 py-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='inline-block bg-white border-4 border-black px-6 py-2 transform rotate-1 mb-4'>
            <h2 className='text-3xl font-extrabold'>Developer Showcase</h2>
          </div>
          <p className='text-xl max-w-3xl mx-auto mt-4'>
            See how developers are using Mine to showcase their skills and projects.
          </p>
        </motion.div>

        <motion.div
          className='grid gap-12 md:grid-cols-2 lg:grid-cols-3'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {showcaseData.showcase_profiles.map((profile, index) => {
            // Get a consistent color for this profile
            const profileColor = getColorFromString(profile.name)
            // Determine if text should be black or white
            const textColor = getTextColorForBackground(profileColor)

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className='bg-white border-4 border-black p-6 transform hover:rotate-1 transition-transform'
                whileHover={{
                  scale: 1.02,
                  boxShadow: '10px 10px 0 rgba(0, 0, 0, 1)'
                }}
              >
                <div className='flex items-center gap-4 mb-6'>
                  <div
                    className='h-16 w-16 flex items-center justify-center rounded-full border-4 border-black font-bold text-xl'
                    style={{
                      backgroundColor: profileColor,
                      color: textColor
                    }}
                  >
                    {getUserProfileInitial(profile.name)}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>{profile.name}</h3>
                    <p className='text-gray-600'>{profile.role}</p>
                  </div>
                </div>

                <div className='mb-6'>
                  <h4 className='font-bold mb-2'>Skills</h4>
                  <div className='flex flex-wrap gap-2'>
                    {profile.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className='bg-orange-300 border-2 border-black px-3 py-1 text-sm font-medium'
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className='font-bold mb-2'>Featured Project</h4>
                  {profile.projects.map((project, projectIndex) => {
                    // Generate a unique color for the project
                    const projectColor = getColorFromString(project.title)
                    const projectTextColor = getTextColorForBackground(projectColor)

                    return (
                      <div key={projectIndex} className='border-2 border-black'>
                        <div className='relative h-48 w-full overflow-hidden border-b-2 border-black'>
                          {/* Styled div replacing Image component */}
                          <div
                            className='absolute inset-0 flex items-center justify-center'
                            style={{ backgroundColor: projectColor }}
                          >
                            <div className='relative'>
                              <svg
                                className='h-24 w-24 opacity-20'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              ></svg>
                            </div>
                          </div>
                          <div
                            className='absolute top-0 right-0 border-l-2 border-b-2 border-black px-3 py-1'
                            style={{ backgroundColor: projectColor, color: projectTextColor }}
                          >
                            <span className='font-bold'>{project.title}</span>
                          </div>
                        </div>
                        <div className='p-4'>
                          <p className='mb-4'>{project.description}</p>
                          <div className='flex gap-2'>
                            <Button variant='neutral' size='sm' className='border-2 border-black'>
                              <Github className='mr-2 h-4 w-4' />
                              Code
                            </Button>
                            <Button variant='neutral' size='sm' className='border-2 border-black'>
                              <ExternalLink className='mr-2 h-4 w-4' />
                              Demo
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className='mt-12 text-center'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button
            className='bg-main text-white border-4 border-black font-bold px-8 py-6 text-xl transform hover:rotate-1 transition-transform'
            onClick={() => router.push('/explore')}
          >
            View More Developers
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
