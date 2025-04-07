'use client'

import { motion } from 'framer-motion'
import { UserPlus, FileCode, Share2, MessageSquare } from 'lucide-react'

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: <UserPlus className='h-8 w-8' />,
      title: 'Create Your Profile',
      description:
        'Sign up and build your developer profile with your skills, experience, and portfolio.',
      color: 'bg-orange-500'
    },
    {
      icon: <FileCode className='h-8 w-8' />,
      title: 'Add Your Projects',
      description: 'Showcase your best work with detailed project descriptions, images, and links.',
      color: 'bg-yellow-500'
    },
    {
      icon: <Share2 className='h-8 w-8' />,
      title: 'Share Your Profile',
      description:
        'Get a personalized URL to share with potential employers, clients, or collaborators.',
      color: 'bg-teal-500'
    },
    {
      icon: <MessageSquare className='h-8 w-8' />,
      title: 'Connect & Grow',
      description: 'Network with other developers, receive feedback, and find new opportunities.',
      color: 'bg-orange-500'
    }
  ]

  return (
    <section id='how-it-works' className='bg-sky-500 py-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='inline-block bg-white border-4 border-black px-6 py-2 transform -rotate-1 mb-4'>
            <h2 className='text-3xl font-extrabold'>How It Works</h2>
          </div>
          <p className='text-xl max-w-3xl mx-auto mt-4'>
            Getting started with Mine is simple. Follow these steps to create your developer
            presence.
          </p>
        </motion.div>

        <div className='relative'>
          {/* Connection line */}
          <div className='absolute left-1/2 top-0 bottom-0 w-1 bg-black hidden md:block'></div>

          <div className='space-y-12 relative'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`md:flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Desktop version - hidden on mobile */}
                <div
                  className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}
                >
                  <motion.div
                    className='bg-white border-4 border-black p-6 inline-block transform hover:rotate-1 transition-transform'
                    whileHover={{
                      scale: 1.05,
                      boxShadow: '8px 8px 0 rgba(0, 0, 0, 1)'
                    }}
                  >
                    <h3 className='text-2xl font-bold mb-2'>{step.title}</h3>
                    <p className='text-gray-700'>{step.description}</p>
                  </motion.div>
                </div>

                {/* Center icon - only visible on desktop */}
                <div className='hidden md:flex items-center justify-center relative z-10'>
                  <motion.div
                    className={`${step.color} p-4 border-4 border-black rounded-full`}
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, delay: index * 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Mobile version - hidden on desktop */}
                <div className='w-full md:hidden'>
                  <div
                    className={`${step.color} p-4 border-4 border-black rounded-full w-fit mb-4`}
                  >
                    {step.icon}
                  </div>
                  <div className='bg-white border-4 border-black p-6'>
                    <h3 className='text-2xl font-bold mb-2'>{step.title}</h3>
                    <p className='text-gray-700'>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
