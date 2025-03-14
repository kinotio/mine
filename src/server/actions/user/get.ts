'use server'

import database, { eq } from '@/server/services/drizzle'
import { users } from '@/server/databases'
import { ActionResponse } from '@/server/utils/types'
import { cleanParamsUsername } from '@/lib/utils'
import type { User } from '@/server/databases'

export type CreateUserInput = {
  username: string
  email: string
  first_name: string
  last_name: string
}

export type UpdateUserInput = Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>

export type UserWithProfile = User & {
  profile: {
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
  }
}

export const getUserByUsername = async (
  username: string
): Promise<ActionResponse<UserWithProfile>> => {
  try {
    const user = await database.drizzle.query.users.findFirst({
      where: eq(users.username, cleanParamsUsername(username)),
      with: {
        profile: true
      }
    })

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
