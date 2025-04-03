'use server'

import { eq } from 'drizzle-orm'

import {
  userProfiles,
  users,
  userProfileSections,
  userProfileSectionItems
} from '@/server/databases/tables'
import { UserProfile, UserProfileSection, UserProfileSectionItem } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { ProfileValidation } from '@/server/validations/profile'

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

export const updateProfileSectionItem = async (
  userId: string,
  sectionId: string,
  itemId: string,
  payload: Record<string, unknown>
): Promise<ActionResponse<UserProfileSectionItem>> => {
  'use server'

  try {
    // Perform validation if needed
    const validation = ProfileValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // First ensure the user exists
    const user = await database.query.users.findFirst({
      where: eq(users.id, userId)
    })

    if (!user) {
      return {
        success: false,
        error: 'User not found'
      }
    }

    // Check if section exists and belongs to the user's profile
    const section = await database.query.userProfileSections.findFirst({
      where: eq(userProfileSections.id, sectionId),
      with: {
        user_profile: true
      }
    })

    if (!section || section.user_profile.user_id !== userId) {
      return {
        success: false,
        error: 'Section not found or access denied'
      }
    }

    // Update the section item
    const updated = await database
      .update(userProfileSectionItems) // Assuming this table is imported
      .set({
        metadata: payload,
        updated: new Date()
      })
      .where(eq(userProfileSectionItems.id, itemId))
      .returning()

    if (!updated.length) {
      return {
        success: false,
        error: 'An error occurred while finding profile section item'
      }
    }

    // Invalidate the cache
    await cache.invalidate(`user:${user.username}`)

    return {
      success: true,
      data: updated[0] as UserProfileSectionItem
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred while updating profile section item'
    }
  }
}
