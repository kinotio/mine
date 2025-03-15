'use server'

import database from '@/server/services/drizzle'
import { profiles } from '@/server/databases/tables'
import { Profile } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { ProfileValidation } from '@/server/services/validation/profile'

export const createProfile = async (payload: Profile): Promise<ActionResponse<Profile>> => {
  try {
    const validation = ProfileValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Check if user already has a profile
    const existingProfile = await database.query.profiles.findFirst({
      where: (profiles, { eq }) => eq(profiles.user_id, payload.user_id)
    })

    if (existingProfile) {
      return {
        success: false,
        error: 'Profile already exists for this user'
      }
    }

    // Create profile with defaults
    const data: Profile = {
      user_id: payload.user_id,
      title: payload.title,
      name: payload.name,
      email: payload.email,
      location: payload.location,
      bio: payload.bio || 'Welcome to my profile! 👋',
      avatar_url: payload.avatar_url,
      banner_url: payload.banner_url,
      profile_url: payload.profile_url,
      website: payload.website,
      github: payload.github,
      x: payload.x,
      linkedin: payload.linkedin,
      bluesky: payload.bluesky
    }

    const created = await database.insert(profiles).values(data).returning()

    return {
      success: true,
      data: created[0] as Profile
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating profile.'
    }
  }
}
