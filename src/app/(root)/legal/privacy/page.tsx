import { Card } from '@/components/ui/card'

const Page = () => {
  return (
    <Card className='max-w-3xl mx-auto p-6 bg-white my-12'>
      <h1 className='text-2xl font-bold mb-4'>Privacy Policy</h1>
      <p className='text-sm text-gray-600'>Effective Date: March 6, 2025</p>
      <p className='mt-4'>
        {`
        This Privacy Policy explains how kinotio.io ("we," "us," or "our") collects, uses, and
        protects your personal data when you use our services.`}
      </p>
      <h2 className='text-xl font-semibold mt-4'>1. Information We Collect</h2>
      <ul className='list-disc ml-6'>
        <li>
          <strong>Personal Information</strong>: If you register or interact with our app, we may
          collect your name, email address, and other necessary details.
        </li>
        <li>
          <strong>Usage Data</strong>: We collect data such as IP address, browser type, and
          interactions with our app.
        </li>
        <li>
          <strong>Cookies and Tracking</strong>: We use cookies and analytics tools to improve our
          service.
        </li>
      </ul>
      <h2 className='text-xl font-semibold mt-4'>2. How We Use Your Information</h2>
      <ul className='list-disc ml-6'>
        <li>To provide and improve our services.</li>
        <li>To communicate updates or respond to inquiries.</li>
        <li>To comply with legal obligations.</li>
      </ul>
      <h2 className='text-xl font-semibold mt-4'>3. Data Sharing and Security</h2>
      <ul className='list-disc ml-6'>
        <li>We do not sell or rent your personal data.</li>
        <li>We implement security measures to protect your data.</li>
      </ul>
      <h2 className='text-xl font-semibold mt-4'>4. Your Rights</h2>
      <p>
        Depending on your location, you may have rights to access, correct, or delete your data.
      </p>
      <p className='mt-4'>For any inquiries, contact us at contact@kinotio.io.</p>
    </Card>
  )
}

export default Page
