'use server'

import { drizzle, eq } from '@/server/drizzle'
import { profiles, type Profile } from '@/server/db/schemas/profile'

export const getProfileById = async (id: string) => {
  return await drizzle.query.profiles.findFirst({
    where: eq(profiles.id, id)
  })
}

export const saveProfile = async (profile: Profile) => {
  return await drizzle.insert(profiles).values(profile).returning()
}

export const updateProfile = async (id: string, profile: Partial<Profile>) => {
  return await drizzle.update(profiles).set(profile).where(eq(profiles.id, id)).returning()
}
