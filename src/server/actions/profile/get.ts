'use server'

import { ActionResponse } from '@/server/utils/types'
import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

export type ProfileSectionTemplate = {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

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
