'use client'

import { motion } from 'framer-motion'
import { Code, Users, Briefcase, Award, Rocket, Globe } from 'lucide-react'

export const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  const features = [
    {
      icon: <Code className='h-10 w-10' />,
      title: 'Showcase Skills',
      description:
        'Display your technical skills, languages, and frameworks with visual indicators of proficiency.',
      color: 'bg-orange-500'
    },
    {
      icon: <Briefcase className='h-10 w-10' />,
      title: 'Project Portfolio',
      description:
        'Create detailed project showcases with images, descriptions, and links to live demos or repositories.',
      color: 'bg-yellow-500'
    },
    {
      icon: <Users className='h-10 w-10' />,
      title: 'Connect & Collaborate',
      description:
        'Find and connect with other developers for collaboration, mentorship, or job opportunities.',
      color: 'bg-teal-500'
    },
    {
      icon: <Award className='h-10 w-10' />,
      title: 'Achievements',
      description:
        'Highlight certifications, awards, and educational milestones in your developer journey.',
      color: 'bg-orange-300'
    },
    {
      icon: <Rocket className='h-10 w-10' />,
      title: 'Career Growth',
      description:
        'Track your progress and set goals for your development career with our built-in tools.',
      color: 'bg-teal-300'
    },
    {
      icon: <Globe className='h-10 w-10' />,
      title: 'Global Visibility',
      description:
        'Get discovered by companies and clients looking for your specific skill set worldwide.',
      color: 'bg-orange-700'
    }
  ]

  return (
    <section id='features' className='bg-white py-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='inline-block bg-main border-4 border-black px-6 py-2 transform rotate-1 mb-4'>
            <h2 className='text-3xl font-extrabold'>Amazing Features</h2>
          </div>
          <p className='text-xl max-w-3xl mx-auto mt-4'>
            Everything you need to build your developer brand and connect with opportunities.
          </p>
        </motion.div>

        <motion.div
          className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='border-4 border-black bg-white p-6 transform hover:rotate-1 transition-transform'
              whileHover={{
                scale: 1.03,
                boxShadow: '10px 10px 0 rgba(0, 0, 0, 1)'
              }}
            >
              <div className={`${feature.color} p-3 border-4 border-black w-fit mb-4`}>
                {feature.icon}
              </div>
              <h3 className='text-2xl font-bold mb-2'>{feature.title}</h3>
              <p className='text-gray-700'>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
