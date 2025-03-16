'use client'

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { getUserByUsername } from '@/server/actions'
import { UserProfile } from '@/lib/types/profile'
import { ClerkUserMinimal } from '@/lib/types/clerk'

import { useEventSubscription } from '@/hooks/use-event'

type ProfileContextType = {
  user: ClerkUserMinimal
  profile: UserProfile
  loading: boolean
}

const initialState = { user: {} as ClerkUserMinimal, profile: {} as UserProfile, loading: true }

const ProfileContext = createContext<ProfileContextType>(initialState)

// Provider component
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser() as { user: ClerkUserMinimal }

  const params = useParams<{ username: string }>()

  const [profile, setProfile] = useState<UserProfile>()
  const [loading, setLoading] = useState(true)

  const value = { user, profile, loading }

  const fetchProfile = () => {
    getUserByUsername(params.username)
      .then(({ data }) => setProfile(data?.user_profile as unknown as UserProfile))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchProfile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.username])

  useEventSubscription('profile:updated', () => fetchProfile())

  return (
    <ProfileContext.Provider value={value as ProfileContextType}>
      {children}
    </ProfileContext.Provider>
  )
}

// Custom hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
