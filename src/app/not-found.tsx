'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

const NotFound = () => {
  const router = useRouter()

  return (
    <div style={{ height: '100vh' }}>
      <div className='w-full flex flex-col items-center justify-center h-full'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>404 - Page Not Found</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            {` The page you re looking for doesn't exist or has been moved.`}
          </p>
          <Button onClick={() => router.back()}>Go back</Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound
