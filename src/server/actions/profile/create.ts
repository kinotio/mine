'use server'

import slugify from 'slugify'

import { userProfiles, userProfileSections } from '@/server/databases/tables'
import { UserProfile, UserProfileSection } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import { ProfileValidation } from '@/server/services/validation/profile'
import database from '@/server/services/drizzle'

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
