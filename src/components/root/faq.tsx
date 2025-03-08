'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

type FAQItem = {
  question: string
  answer: string
}

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: 'What is Mine?',
      answer:
        'Mine is a platform for developers to showcase their skills, projects, and connect with other developers and potential employers. It allows you to create a professional profile highlighting your technical expertise and portfolio.'
    },
    {
      question: 'Is Mine free to use?',
      answer:
        'Mine is free to use for developers and other users. No subscription required. You can create a basic profile and showcase up your projects.'
    },
    {
      question: 'How do I add projects to my profile?',
      answer:
        "After logging in, navigate to your profile and click on 'Add Project'. You can then enter details about your project including title, description, technologies used, and links to live demos or repositories. You can also upload screenshots or videos of your project."
    }
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id='faq' className='bg-white py-20'>
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
            Get answers to the most common questions about Mine.
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
        </div>
      </div>
    </section>
  )
}
