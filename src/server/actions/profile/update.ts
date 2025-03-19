'use server'

import { eq } from 'drizzle-orm'

import { userProfiles, users, userProfileSections } from '@/server/databases/tables'
import { UserProfile, UserProfileSection } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { ProfileValidation } from '@/server/services/validation/profile'

import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

export const updateProfile = async (
  id: string,
  profile: Partial<UserProfile>
): Promise<ActionResponse<UserProfile>> => {
  try {
    const validation = ProfileValidation.safeParse(profile)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    const updated = await database
      .update(userProfiles)
      .set(profile)
      .where(eq(userProfiles.id, id))
      .returning()

    const user = await database.query.users.findFirst({
      where: eq(users.id, updated[0].user_id)
    })

    if (user) await cache.invalidate(`user:${user.username}`)

    if (!updated.length) {
      return {
        success: false,
        error: 'An error occurred while finding profile'
      }
    }

    return {
      success: true,
      data: updated[0] as UserProfile
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while updating profile'
    }
  }
}

export const updateProfileSection = async (
  userId: string,
  sectionId: string,
  section: Partial<UserProfileSection>
): Promise<ActionResponse<UserProfileSection>> => {
  try {
    const validation = ProfileValidation.safeParse(section)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    const updated = await database
      .update(userProfileSections) // Assuming userProfileSections table exists
      .set(section)
      .where(eq(userProfileSections.id, sectionId))
      .returning()

    if (!updated.length) {
      return {
        success: false,
        error: 'An error occurred while finding profile section'
      }
    }

    const user = await database.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (user) await cache.invalidate(`user:${user.username}`)

    return {
      success: true,
      data: updated[0]
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An error occurred while updating profile section'
    }
  }
}
