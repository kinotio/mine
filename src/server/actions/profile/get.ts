'use server'

import { ActionResponse } from '@/server/utils/types'
import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'
import { ProfileSectionTemplate, UserProfile } from '@/server/databases/types'

export const getProfileSectionTemplates = async (): Promise<
  ActionResponse<ProfileSectionTemplate[]>
> => {
  try {
    const cacheKey = `profile:section:templates`

    // Use the getOrSet helper to handle caching
    const templates = await cache.getOrSet<ProfileSectionTemplate[] | null>(
      cacheKey,
      async () => {
        // This function will be called only on cache miss
        const templates = await database.query.profileSectionTemplates.findMany()
        return (templates as ProfileSectionTemplate[]) || null
      },
      // Cache for 30 minutes (1800 seconds)
      1800
    )

    if (!templates) {
      return {
        success: false,
        error: 'An error occurred while fetching templates.'
      }
    }

    return {
      success: true,
      data: templates
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching templates.'
    }
  }
}

export const getAllProfiles = async (): Promise<ActionResponse<UserProfile[]>> => {
  try {
    const cacheKey = 'profile:all'

    // Use the getOrSet helper to handle caching
    const profiles = await cache.getOrSet<UserProfile[] | null>(
      cacheKey,
      async () => {
        // This function will be called only on cache miss
        // Fetch all user profiles with related data
        const profiles = await database.query.userProfiles.findMany({
          with: {
            user_profile_sections: {
              with: {
                user_profile_section_items: true
              },
              orderBy: (sections, { asc }) => [asc(sections.order)]
            }
          }
        })

        return (profiles as UserProfile[]) || null
      },
      // Cache for 5 minutes (300 seconds) since profile data changes more frequently
      300
    )

    if (!profiles) {
      return {
        success: false,
        error: 'An error occurred while fetching profiles.'
      }
    }

    return {
      success: true,
      data: profiles
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching profiles.'
    }
  }
}
