'use server'

import { eq } from 'drizzle-orm'

import { users } from '@/server/databases/tables'
import { User } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

import { cleanParamsUsername } from '@/lib/utils'

export type CreateUserInput = {
  username: string
  email: string
  first_name: string
  last_name: string
}

export type UpdateUserInput = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>

export type UserWithProfile = User & {
  user_profile: {
    id: string
    name: string
    title: string | null
    location: string | null
    bio: string
    email: string
    avatar_url: string | null
    banner_url: string | null
    profile_url: string
    website: string | null
    github: string | null
    x: string | null
    linkedin: string | null
    bluesky: string | null
    user_profile_sections: {
      id: string
      user_profile_id: string
      profile_section_template_id: string
      name: string
      slug: string
      user_profile_section_items: {
        id: string
        user_profile_id: string
        user_profile_section_id: string
        metadata: { [key: string]: string }
      }[]
    }[]
    user_profile_settings: {
      id: string
      user_profile_id: string
      metadata: {
        general: {
          showPreviewResume: boolean
          showDownloadButton: boolean
        }
      }
    }
  }
}

export const getUserByUsername = async (
  username: string
): Promise<ActionResponse<UserWithProfile>> => {
  try {
    const cleanUsername = cleanParamsUsername(username)

    // User cache key based on username
    const cacheKey = `user:${cleanUsername}`

    // Use the getOrSet helper to handle caching
    const user = await cache.getOrSet<UserWithProfile | null>(
      cacheKey,
      async () => {
        // This function will be called only on cache miss
        const user = await database.query.users.findFirst({
          where: eq(users.username, cleanUsername),
          with: {
            user_profile: {
              with: {
                user_profile_sections: {
                  orderBy: (sections, { asc }) => [asc(sections.order)],
                  with: {
                    user_profile_section_items: {
                      orderBy: (items, { asc }) => [asc(items.order)]
                    }
                  }
                },
                user_profile_settings: true
              }
            }
          }
        })
        return user as unknown as UserWithProfile | null
      },
      // Cache for 30 minutes (1800 seconds)
      1800
    )

    if (!user) {
      return {
        success: false,
        error: 'An error occurred while fetching user.'
      }
    }

    return {
      success: true,
      data: user as UserWithProfile
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while fetching user.'
    }
  }
}
