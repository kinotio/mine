'use client'

import { createContext, useContext, useState, type ReactNode, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

import { getUserByUsername } from '@/server/actions/user'
import { UserProfile } from '@/lib/types/profile'
import { ClerkUserMinimal } from '@/lib/types/clerk'

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

  useEffect(() => {
    getUserByUsername(params.username)
      .then((user) => setProfile(user?.profile as unknown as UserProfile))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [params.username])

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
