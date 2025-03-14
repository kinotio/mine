'use server'

import database, { eq } from '@/server/services/drizzle'
import { profiles, type Profile } from '@/server/databases'
import { ActionResponse } from '@/server/utils/types'
import { ProfileValidation } from '@/server/services/validation/profile'

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

    const updated = await database.drizzle
      .update(profiles)
      .set(profile)
      .where(eq(profiles.id, id))
      .returning()

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
