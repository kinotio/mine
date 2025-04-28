'use client'

import { motion } from 'framer-motion'
import { Cookie } from 'lucide-react'

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
        <div className='bg-yellow-400 p-6 border-b-4 border-black flex items-center gap-4'>
          <Cookie className='h-8 w-8' />
          <h2 className='text-3xl font-extrabold'>Cookie Policy</h2>
        </div>

        <div className='p-8'>
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                1. What Are Cookies
              </h3>
              <p className='mb-4'>
                Cookies are small pieces of text sent by your web browser by a website you visit. A
                cookie file is stored in your web browser and allows the platform or a third-party
                to recognize you and make your next visit easier and more useful to you.
              </p>
              <p>
                {`Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your
                personal computer or mobile device when you go offline, while session cookies are
                deleted as soon as you close your web browser.`}
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform rotate-1'>
                2. How We Use Cookies
              </h3>
              <p className='mb-4'>
                When you use and access Mine by kinotio, we may place a number of cookie files in
                your web browser. We use cookies for the following purposes:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <span className='font-bold'>Essential cookies:</span> These are required for the
                  operation of our platform. They include, for example, cookies that enable you to
                  log into secure areas.
                </li>
                <li>
                  <span className='font-bold'>Analytical/performance cookies:</span> These allow us
                  to recognize and count the number of visitors and to see how visitors move around
                  our platform when they are using it. This helps us to improve the way our platform
                  works.
                </li>
                <li>
                  <span className='font-bold'>Functionality cookies:</span> These are used to
                  recognize you when you return to our platform. This enables us to personalize our
                  content for you and remember your preferences.
                </li>
                <li>
                  <span className='font-bold'>Targeting cookies:</span> These record your visit to
                  our platform, the pages you have visited and the links you have followed. We will
                  use this information to make our platform and the advertising displayed on it more
                  relevant to your interests.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                3. Third-Party Cookies
              </h3>
              <p className='mb-4'>
                In addition to our own cookies, we may also use various third-party cookies to
                report usage statistics of the platform, deliver advertisements on and through the
                platform, and so on.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform rotate-1'>
                4. What Are Your Choices Regarding Cookies
              </h3>
              <p className='mb-4'>
                {`If you'd like to delete cookies or instruct your web browser to delete or refuse
                cookies, please visit the help pages of your web browser.`}
              </p>
              <p className='mb-4'>
                Please note, however, that if you delete cookies or refuse to accept them, you might
                not be able to use all of the features we offer, you may not be able to store your
                preferences, and some of our pages might not display properly.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                5. Where Can You Find More Information About Cookies
              </h3>
              <p className='mb-4'>
                You can learn more about cookies and the following third-party websites:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  AllAboutCookies:{' '}
                  <a href='http://www.allaboutcookies.org/' className='text-yellow-800 underline'>
                    http://www.allaboutcookies.org/
                  </a>
                </li>
                <li>
                  Network Advertising Initiative:{' '}
                  <a
                    href='http://www.networkadvertising.org/'
                    className='text-yellow-800 underline'
                  >
                    http://www.networkadvertising.org/
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform rotate-1'>
                6. Changes to Our Cookie Policy
              </h3>
              <p className='mb-4'>
                We may update our Cookie Policy from time to time. We will notify you of any changes
                by posting the new Cookie Policy on this page.
              </p>
              <p className='mb-4'>
                You are advised to review this Cookie Policy periodically for any changes. Changes
                to this Cookie Policy are effective when they are posted on this page.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-yellow-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                7. Contact Us
              </h3>
              <p>
                If you have any questions about our Cookie Policy, please contact us at:{' '}
                <a href='mailto:contact@kinotio.io' className='text-yellow-800 font-bold underline'>
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
