'use server'

import database, { eq } from '@/server/services/drizzle'
import { profiles, type Profile } from '@/server/databases'

export const saveProfile = async (profile: Profile) => {
  return await database.drizzle.insert(profiles).values(profile).returning()
}

export const updateProfile = async (id: string, profile: Partial<Profile>) => {
  return await database.drizzle.update(profiles).set(profile).where(eq(profiles.id, id)).returning()
}
