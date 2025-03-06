import { Card } from '@/components/ui/card'

const Page = () => {
  return (
    <Card className='max-w-3xl mx-auto p-6 bg-white my-12'>
      <h1 className='text-2xl font-bold mb-4'>Terms of Service</h1>
      <p className='text-sm text-gray-600'>Effective Date: March 6, 2025</p>
      <h2 className='text-xl font-semibold mt-4'>1. Acceptance of Terms</h2>
      <p>{`By using our Service, you agree to be bound by these terms. If you disagree with any part of these terms, you may not use our Service.`}</p>
      <h2 className='text-xl font-semibold mt-4'>2. User Responsibilities</h2>
      <ul className='list-disc ml-6'>
        <li>You must be at least 13 years old to use our Service.</li>
        <li>Do not misuse, hack, or disrupt our Service.</li>
      </ul>
      <h2 className='text-xl font-semibold mt-4'>3. Limitation of Liability</h2>
      <p>We are not responsible for any damages resulting from the use of our Service.</p>
      <h2 className='text-xl font-semibold mt-4'>4. Changes to These Terms</h2>
      <p>We reserve the right to update these terms at any time.</p>
      <p className='mt-4'>For questions, contact us at contact@kinotio.io.</p>
    </Card>
  )
}

export default Page
