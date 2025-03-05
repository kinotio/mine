'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type FAQItem = {
  question: string
  answer: string
}

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: 'What is DevHub?',
      answer:
        'DevHub is a platform for developers to showcase their skills, projects, and connect with other developers and potential employers. It allows you to create a professional profile highlighting your technical expertise and portfolio.'
    },
    {
      question: 'Is DevHub free to use?',
      answer:
        'DevHub offers both free and premium plans. The free plan allows you to create a basic profile and showcase up to 5 projects. Premium plans offer additional features like custom domains, advanced analytics, and unlimited projects.'
    },
    {
      question: 'How do I add projects to my profile?',
      answer:
        "After logging in, navigate to your dashboard and click on 'Add Project'. You can then enter details about your project including title, description, technologies used, and links to live demos or repositories. You can also upload screenshots or videos of your project."
    },
    {
      question: 'Can I import my projects from GitHub?',
      answer:
        'Yes, DevHub allows you to connect your GitHub account and import repositories directly. This makes it easy to showcase your existing work without manually entering all the details.'
    },
    {
      question: 'How can employers or clients contact me?',
      answer:
        'When you create your profile, you can choose to display contact information or enable the built-in messaging system. Interested parties can reach out to you directly through the platform without exposing your personal email address.'
    }
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id='home-faq' className='bg-white py-20'>
      <div className='px-4 md:px-6'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='inline-block bg-main border-4 border-black px-6 py-2 transform rotate-1 mb-4'>
            <h2 className='text-3xl font-extrabold'>Frequently Asked Questions</h2>
          </div>
          <p className='text-xl max-w-3xl mx-auto mt-4'>
            Get answers to the most common questions about DevHub.
          </p>
        </motion.div>

        <div className='max-w-3xl mx-auto'>
          <motion.div
            className='space-y-4'
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}
          >
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                className='border-4 border-black bg-white'
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className={`w-full flex justify-between items-center p-5 text-left font-bold text-lg ${
                    activeIndex === index ? 'bg-sky-500' : 'hover:bg-sky-400'
                  }`}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 flex items-center justify-center border-2 border-black bg-white rounded-full transform ${activeIndex === index ? 'rotate-0' : 'rotate-0'}`}
                  >
                    {activeIndex === index ? (
                      <ChevronUp className='h-5 w-5' />
                    ) : (
                      <ChevronDown className='h-5 w-5' />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='overflow-hidden border-t-4 border-black'
                    >
                      <div className='p-5 bg-white'>
                        <p className='text-lg'>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className='mt-10 text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Link href='/faq'>
              <Button className='bg-main text-black border-4 border-black font-bold px-8 py-6 text-xl transform hover:rotate-1 transition-transform'>
                View All FAQs
                <HelpCircle className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
