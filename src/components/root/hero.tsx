'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Palette, Share, Users } from 'lucide-react'
import Link from 'next/link'

import { floatingIcons, itemVariants, containerVariants } from '@/components/root/config'
import { getUserProfileInitial } from '@/lib/utils'

export const Hero = () => {
  return (
    <section className='relative overflow-hidden bg-main py-20 md:py-32'>
      <div className='absolute inset-0 z-0'>
        <div className='absolute top-20 left-10 bg-yellow-500 w-20 h-20 rounded-full border-4 border-black'></div>
        <div className='absolute bottom-20 right-10 bg-teal-100 w-32 h-32 border-4 border-black transform rotate-12'></div>
        <div className='absolute top-40 right-20 bg-orange-900 w-16 h-16 border-4 border-black transform -rotate-6'></div>
      </div>

      <div className='container relative z-10 px-4 md:px-6'>
        <motion.div
          className='grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.div variants={itemVariants} className='flex flex-col justify-center space-y-4'>
            <div className='inline-block bg-white border-4 border-black px-4 py-1 transform -rotate-2 w-fit'>
              <span className='text-lg font-bold'>Your Creative Hub</span>
            </div>

            <motion.h1
              className='text-5xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl'
              variants={itemVariants}
            >
              Where{' '}
              <span className='bg-yellow-500 px-2 border-4 border-black transform inline-block rotate-1'>
                Talents
              </span>{' '}
              Come Alive
            </motion.h1>

            <motion.div className='flex items-center justify-start gap-4 mt-4'>
              <span className='bg-[#4cc9f0] border-4 border-black px-4 py-1 text-xl font-bold text-white transform -rotate-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300'>
                Build
              </span>
              <span className='text-black font-bold'>•</span>
              <span className='bg-[#ff6b6b] border-4 border-black px-4 py-1 text-xl font-bold text-white transform rotate-2 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300'>
                Share
              </span>
              <span className='text-black font-bold'>•</span>
              <span className='bg-[#4eb778] border-4 border-black px-4 py-1 text-xl font-bold text-white transform -rotate-1 inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300'>
                Connect
              </span>
            </motion.div>

            <motion.p
              className='max-w-[600px] text-lg text-black md:text-xl font-medium'
              variants={itemVariants}
            >
              Create your professional portfolio, showcase your work, and connect with a vibrant
              community of creators and innovators.
            </motion.p>

            <motion.div className='flex flex-col gap-4 sm:flex-row' variants={itemVariants}>
              <Button className='bg-orange text-black border-4 border-black font-bold px-8 py-6 text-xl transform rotate-1 hover:rotate-0 transition-transform'>
                Get Started
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
              <Link
                href='#how-it-works'
                className='inline-flex h-12 items-center justify-center rounded-md border-4 border-black bg-white px-8 text-lg font-bold transform -rotate-1 hover:rotate-0 transition-transform'
              >
                Learn More
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className='flex items-center justify-center' variants={itemVariants}>
            <div className='relative bg-white border-4 border-black p-6 transform rotate-2 w-full max-w-md'>
              <div className='absolute -top-4 -right-4 bg-teal-500 border-4 border-black px-4 py-1 font-bold'>
                Portfolio
              </div>

              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-4'>
                  <div className='h-16 w-16 flex items-center justify-center rounded-full border-4 border-black font-bold text-xl bg-blue-400'>
                    {getUserProfileInitial('Sarah Creative')}
                  </div>
                  <div>
                    <h3 className='text-xl font-bold'>Sarah Creative</h3>
                    <p className='text-gray-600'>Digital Artist & Designer</p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex gap-2'>
                    <motion.div
                      variants={floatingIcons}
                      initial='initial'
                      animate='animate'
                      className='bg-blue-200 p-2 border-2 border-black'
                    >
                      <Palette className='h-5 w-5' />
                    </motion.div>
                    <span className='font-medium'>Creative Design</span>
                  </div>
                  <div className='flex gap-2'>
                    <motion.div
                      variants={floatingIcons}
                      initial='initial'
                      animate='animate'
                      className='bg-green-500 p-2 border-2 border-black'
                    >
                      <Share className='h-5 w-5' />
                    </motion.div>
                    <span className='font-medium'>Portfolio</span>
                  </div>
                  <div className='flex gap-2'>
                    <motion.div
                      variants={floatingIcons}
                      initial='initial'
                      animate='animate'
                      className='bg-blue-500 p-2 border-2 border-black'
                    >
                      <Users className='h-5 w-5' />
                    </motion.div>
                    <span className='font-medium'>Community</span>
                  </div>
                </div>

                <div className='bg-gray-100 border-2 border-black p-3'>
                  <p className='font-medium'>{`"I create digital experiences that inspire and engage. Let's connect and create something amazing!"`}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
