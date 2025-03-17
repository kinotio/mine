'use server'

import { eq } from 'drizzle-orm'
import slugify from 'slugify'

import {
  users,
  userProfiles,
  userProfileSections,
  userProfileSectionItems
} from '@/server/databases/tables'
import { UserProfile, UserProfileSection } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import { ProfileValidation } from '@/server/services/validation/profile'
import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

export const createProfile = async (payload: UserProfile): Promise<ActionResponse<UserProfile>> => {
  try {
    const validation = ProfileValidation.safeParse(payload)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Check if user already has a profile
    const existingProfile = await database.query.userProfiles.findFirst({
      where: (profiles, { eq }) => eq(profiles.user_id, payload.user_id)
    })

    if (existingProfile) {
      return {
        success: false,
        error: 'Profile already exists for this user'
      }
    }

    // Create profile with defaults
    const data: UserProfile = {
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

    const created = await database.insert(userProfiles).values(data).returning()

    return {
      success: true,
      data: created[0] as UserProfile
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while creating profile.'
    }
  }
}

export const createProfileSection = async (
  user_id: string,
  user_profile_id: string,
  profile_section_template_id: string,
  name: string
): Promise<ActionResponse<UserProfileSection>> => {
  try {
    if (!user_profile_id || !profile_section_template_id || !name) {
      return {
        success: false,
        error: 'Missing required fields'
      }
    }

    // Generate slug from title
    const slug = slugify(name, {
      lower: true,
      strict: true
    })

    // Check if section with this slug already exists for the profile
    const existingSection = await database.query.userProfileSections.findFirst({
      where: (sections, { and, eq }) =>
        and(eq(sections.user_profile_id, user_profile_id), eq(sections.slug, slug))
    })

    if (existingSection) {
      return {
        success: false,
        error: 'A section with this slug already exists'
      }
    }

    // Create the section
    const data = {
      user_profile_id,
      profile_section_template_id,
      name,
      slug
    }

    const created = await database.insert(userProfileSections).values(data).returning()
    const user = await database.query.users.findFirst({
      where: eq(users.id, user_id)
    })

    await cache.invalidate(`user:${user?.username}`)

    return {
      success: true,
      data: created[0]
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An error occurred while creating profile section.'
    }
  }
}

export const createProfileSectionItem = async (
  user_id: string,
  user_profile_id: string,
  user_profile_section_id: string,
  payload: Record<string, unknown>
) => {
  try {
    // Validate required fields
    if (!user_profile_id || !user_profile_section_id || !payload || !user_id) {
      return {
        success: false,
        error: 'Missing required fields'
      }
    }

    // Basic validation that payload is a valid JSON object
    if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
      return {
        success: false,
        error: 'Invalid payload format. Expected a JSON object.'
      }
    }

    // Check if section exists and get its template ID
    const existingSection = await database.query.userProfileSections.findFirst({
      where: (sections, { eq }) => eq(sections.id, user_profile_section_id)
    })

    if (!existingSection) {
      return {
        success: false,
        error: 'Section not found'
      }
    }

    // Check if section belongs to the profile
    if (existingSection.user_profile_id !== user_profile_id) {
      return {
        success: false,
        error: 'Section does not belong to this profile'
      }
    }

    // Sanitize payload: Remove any null or undefined values
    const sanitizedPayload = Object.fromEntries(
      Object.entries(payload).filter(([, value]) => value !== null && value !== undefined)
    )

    // Create the section item with JSONB data
    const data = {
      user_profile_id,
      user_profile_section_id,
      metadata: sanitizedPayload // This will be stored as JSONB in PostgreSQL
    }

    // Insert the item
    const created = await database.insert(userProfileSectionItems).values(data).returning()

    // Invalidate cache
    const user = await database.query.users.findFirst({
      where: eq(users.id, user_id)
    })

    if (user?.username) await cache.invalidate(`user:${user.username}`)

    return {
      success: true,
      data: created[0]
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'An error occurred while creating profile section item.'
    }
  }
}
