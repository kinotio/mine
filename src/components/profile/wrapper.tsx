'use client'

import { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useRouter, useParams } from 'next/navigation'

import { ProfileSidebar } from '@/components/profile/sidebar'
import { useProfile } from '@/components/profile/provider'
import { ProfileNotFound } from '@/components/profile/not-found'
import { ProfileLoader } from '@/components/profile/loader'

import { useToast } from '@/hooks/use-toast'
import { cleanParamsUsername, decodeParamsUsername } from '@/lib/utils'

export const ProfileWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()

  const { profile, loading, user } = useProfile()
  const [usernameQuery, setUsernameQuery] = useState('')

  const onSearch = async (query: string) => {
    const username = user.username

    if (!query.trim().startsWith('@')) {
      toast({
        title: 'Invalid username format',
        description: 'Username must start with @',
        variant: 'destructive'
      })
      return
    }

    if (cleanParamsUsername(query) === username) {
      router.push(`/@${username}`)
      return
    }

    setUsernameQuery(query as string)
  }

  useEffect(() => {
    if (params.username) {
      setUsernameQuery(decodeParamsUsername(params?.username as string))
    }
  }, [params.username])

  if (loading) {
    return (
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
        <ProfileLoader />
      </div>
    )
  }

  if (!profile && isEmpty(profile)) {
    return (
      <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
        <ProfileNotFound username={usernameQuery} onSearch={onSearch} />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10 mt-8'>
      <div className='flex flex-col lg:block'>
        <ProfileSidebar />
        <div className='flex-1 overflow-hidden lg:ml-[380px] mt-6 lg:mt-0'>{children}</div>
      </div>
    </div>
  )
}
