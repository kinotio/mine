'use server'

import { eq } from 'drizzle-orm'

import { profiles, users } from '@/server/databases/tables'
import { Profile } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'
import { ProfileValidation } from '@/server/services/validation/profile'

import database from '@/server/services/drizzle'
import cache from '@/server/services/redis'

export const updateProfile = async (
  id: string,
  profile: Partial<Profile>
): Promise<ActionResponse<Profile>> => {
  try {
    const validation = ProfileValidation.safeParse(profile)

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    const updated = await database
      .update(profiles)
      .set(profile)
      .where(eq(profiles.id, id))
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
      data: updated[0] as Profile
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while updating profile'
    }
  }
}
