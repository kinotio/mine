import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs'

import { Loader } from '@/components/loader'

const Page = () => {
  return (
    <div className='w-full py-28 flex justify-center items-center'>
      <ClerkLoading>
        <Loader size='xl' />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </div>
  )
}

export default Page
