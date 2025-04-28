'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

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
        <div className='bg-main p-6 border-b-4 border-black flex items-center gap-4'>
          <Shield className='h-8 w-8' />
          <h2 className='text-3xl font-extrabold'>Privacy Policy</h2>
        </div>

        <div className='p-8'>
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                1. Introduction
              </h3>
              <p className='mb-4'>
                At Mine by kinotio, we take your privacy seriously. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our
                website and use our platform.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of
                this Privacy Policy, please do not access the site or use our services.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform rotate-1'>
                2. Information We Collect
              </h3>
              <p className='mb-4'>
                We may collect information about you in a variety of ways including:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <span className='font-bold'>Personal Data:</span> Personally identifiable
                  information, such as your name, email address, and telephone number, that you
                  voluntarily give to us when you register or when you choose to participate in
                  various activities related to our platform.
                </li>
                <li>
                  <span className='font-bold'>Derivative Data:</span> Information our servers
                  automatically collect when you access our platform, such as your IP address,
                  browser type, operating system, access times, and the pages you have viewed.
                </li>
                <li>
                  <span className='font-bold'>Financial Data:</span> Financial information, such as
                  data related to your payment method (e.g., valid credit card number, card brand,
                  expiration date) that we may collect when you purchase a subscription or make a
                  payment on our platform.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                3. How We Use Your Information
              </h3>
              <p className='mb-4'>
                We may use the information we collect about you for various purposes, including to:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>Create and manage your account</li>
                <li>Provide and deliver the services you request</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>
                  Communicate with you about products, services, offers, and events offered by Mine
                  by kinotio
                </li>
                <li>
                  Monitor and analyze trends, usage, and activities in connection with our platform
                </li>
                <li>
                  Detect, investigate, and prevent fraudulent transactions and other illegal
                  activities
                </li>
                <li>Personalize your experience on our platform</li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform rotate-1'>
                4. Disclosure of Your Information
              </h3>
              <p className='mb-4'>
                We may share information we have collected about you in certain situations. Your
                information may be disclosed as follows:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <span className='font-bold'>By Law or to Protect Rights:</span> If we believe the
                  release of information about you is necessary to respond to legal process, to
                  investigate or remedy potential violations of our policies, or to protect the
                  rights, property, and safety of others, we may share your information as permitted
                  or required by any applicable law, rule, or regulation.
                </li>
                <li>
                  <span className='font-bold'>Third-Party Service Providers:</span> We may share
                  your information with third parties that perform services for us or on our behalf,
                  including payment processing, data analysis, email delivery, hosting services,
                  customer service, and marketing assistance.
                </li>
                <li>
                  <span className='font-bold'>Business Transfers:</span> We may share or transfer
                  your information in connection with, or during negotiations of, any merger, sale
                  of company assets, financing, or acquisition of all or a portion of our business
                  to another company.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                5. Security of Your Information
              </h3>
              <p className='mb-4'>
                We use administrative, technical, and physical security measures to help protect
                your personal information. While we have taken reasonable steps to secure the
                personal information you provide to us, please be aware that despite our efforts, no
                security measures are perfect or impenetrable, and no method of data transmission
                can be guaranteed against any interception or other type of misuse.
              </p>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform rotate-1'>
                6. Your Rights and Choices
              </h3>
              <p className='mb-4'>
                You have certain rights regarding the personal information we collect about you:
              </p>
              <ul className='list-disc pl-6 space-y-2'>
                <li>
                  <span className='font-bold'>Access and Update:</span> You can review and change
                  your personal information by logging into your account and visiting your account
                  profile page.
                </li>
                <li>
                  <span className='font-bold'>Email Communications:</span> You can opt out of
                  receiving our marketing emails at any time by following the unsubscribe
                  instructions included in these emails.
                </li>
                <li>
                  <span className='font-bold'>Data Subject Rights:</span> Depending on your
                  location, you may have additional rights regarding your personal data, such as the
                  right to request access, correction, deletion, or restriction of your data.
                </li>
              </ul>
            </div>

            <div>
              <h3 className='text-xl font-bold mb-3 bg-orange-400 inline-block px-2 border-2 border-black transform -rotate-1'>
                7. Contact Us
              </h3>
              <p>
                If you have questions or comments about this Privacy Policy, please contact us at:{' '}
                <a href='mailto:contact@kinotio.io' className='text-orange font-bold underline'>
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
