'use client'

import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

const Page = () => {
  return (
    <section className='scroll-mt-20'>
      <motion.div
        className='bg-white border-4 border-black'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className='bg-teal-400 p-6 border-b-4 border-black flex items-center gap-4'>
          <FileText className='h-8 w-8' />
          <h2 className='text-3xl font-extrabold'>Terms of Service</h2>
        </div>

        <div className='p-8'>
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform rotate-1'>
                1. Agreement to Terms
              </h3>
              <p className='mb-4'>
                By accessing or using Mine by kinotio.io, you agree to be bound by these Terms of
                Service and all applicable laws and regulations. If you do not agree with any of
                these terms, you are prohibited from using or accessing this site.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform -rotate-1'>
                2. Use License
              </h3>
              <p className='mb-4'>
                Permission is granted to temporarily use Mine by kinotio.io for personal,
                non-commercial purposes only. This is the grant of a license, not a transfer of
                title, and under this license you may not:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>
                  Attempt to decompile or reverse engineer any software contained on kinotio.io
                </li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>
                  {`Transfer the materials to another person or "mirror" the materials on any other server`}
                </li>
              </ul>
              <p className='mt-4'>
                This license shall automatically terminate if you violate any of these restrictions
                and may be terminated by kinotio.io at any time.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform rotate-1'>
                3. User Accounts
              </h3>
              <p className='mb-4'>
                When you create an account with us, you must provide accurate, complete, and current
                information at all times. Failure to do so constitutes a breach of the Terms, which
                may result in immediate termination of your account.
              </p>
              <p className='mb-4'>
                {`You are responsible for safeguarding the password that you use to access Mine by kinotio.io and for any activities or actions under your password. We encourage you to use "strong" passwords (passwords that use a combination of upper and lower case letters, numbers, and symbols) with your account.`}
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform -rotate-1'>
                4. User Content
              </h3>
              <p className='mb-4'>
                {`Our platform allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or through Mine by kinotio.io, including its legality, reliability, and appropriateness.`}
              </p>
              <p className='mb-4'>
                By posting Content on or through Mine by kinotio.io, you represent and warrant that:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  The Content is yours (you own it) or you have the right to use it and grant us the
                  rights and license as provided in these Terms
                </li>
                <li>
                  The posting of your Content on or through Mine by kinotio.io does not violate the
                  rights, publicity rights, copyrights, contract rights or any other rights of any
                  person
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform rotate-1'>
                5. Prohibited Activities
              </h3>
              <p className='mb-4'>
                You may not access or use Mine by kinotio.io for any purpose other than that for it
                available. The following activities are prohibited:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  Engaging in any activity that disrupts, diminishes the quality of, interferes with
                  the performance of, or impairs the functionality of, the platform
                </li>
                <li>
                  Using the platform in any manner that could disable, overburden, damage, or impair
                  the site
                </li>
                <li>
                  Using any robot, spider, or other automatic device, process, or means to access
                  the platform for any purpose
                </li>
                <li>
                  Introducing any viruses, trojan horses, worms, logic bombs, or other material
                  which is malicious or technologically harmful
                </li>
                <li>
                  Attempting to gain unauthorized access to, interfere with, damage, or disrupt any
                  parts of the platform
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform -rotate-1'>
                6. Limitation of Liability
              </h3>
              <p className='mb-4'>
                In no event shall Mine by kinotio.io, nor its directors, employees, partners, or
                affiliates, be liable for any indirect, incidental, special, consequential or
                punitive damages, including without limitation, loss of profits, data, use,
                goodwill, or other intangible losses, resulting from:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Your access to or use of or inability to access or use the platform</li>
                <li>Any conduct or content of any third party on the platform</li>
                <li>Any content obtained from the platform</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform rotate-1'>
                7. Changes to Terms
              </h3>
              <p className='mb-4'>
                {`We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.`}
              </p>
              <p>
                By continuing to access or use our platform after those revisions become effective,
                you agree to be bound by the revised terms. If you do not agree to the new terms,
                please stop using the platform.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-teal-300 inline-block px-2 border-2 border-black transform -rotate-1'>
                8. Contact Us
              </h3>
              <p>
                If you have any questions about these Terms, please contact us at:{' '}
                <a href='mailto:contact@kinotio.io' className='text-teal font-bold underline'>
                  contact@kinotio.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Page
