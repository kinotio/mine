'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

const NotFound = () => {
  const { userId } = useAuth()
  const router = useRouter()

  return (
    <div style={{ height: '100vh' }}>
      <div className='w-full flex flex-col items-center justify-center h-full'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>404 - Page Not Found</h1>
          <p className='text-gray-500 dark:text-gray-400'>
            {` The page you re looking for doesn't exist or has been moved.`}
          </p>

          <div className='flex items-center justify-center space-x-4'>
            <Button variant='neutral' onClick={() => router.push('/')}>
              Go to Home
            </Button>
            {userId ? (
              <Button onClick={() => router.push('/')}>Go to Profile</Button>
            ) : (
              <Button onClick={() => router.push('/sign-in')}> Create an Account</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
