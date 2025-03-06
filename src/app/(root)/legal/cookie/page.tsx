import { Card } from '@/components/ui/card'

const Page = () => {
  return (
    <Card className='max-w-3xl mx-auto p-6 bg-white my-12'>
      <h1 className='text-2xl font-bold mb-4'>Cookie Policy</h1>
      <p className='text-sm text-gray-600'>Effective Date: March 6, 2025</p>
      <h2 className='text-xl font-semibold mt-4'>1. What Are Cookies?</h2>
      <p>Cookies are small text files stored on your device to enhance your experience.</p>
      <h2 className='text-xl font-semibold mt-4'>2. How We Use Cookies</h2>
      <ul className='list-disc ml-6'>
        <li>
          <strong>Essential Cookies</strong>: Required for basic functionality.
        </li>
        <li>
          <strong>Analytics Cookies</strong>: Help us analyze usage and improve the Service.
        </li>
        <li>
          <strong>Third-Party Cookies</strong>: Used by third-party tools like Google Analytics.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-4'>3. Managing Cookies</h2>
      <p>You can control cookies through your browser settings.</p>
      <p className='mt-4'>For more details, contact us at contact@kinotio.io.</p>
    </Card>
  )
}

export default Page
