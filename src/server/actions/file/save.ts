'use server'

import { userProfileFiles } from '@/server/databases/tables'
import { UserProfileFile } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export const saveFile = async (file: UserProfileFile): Promise<ActionResponse<UserProfileFile>> => {
  try {
    const saved = await database.insert(userProfileFiles).values(file).returning()

    if (!saved.length) {
      return {
        success: false,
        error: 'An error occurred while saving file.'
      }
    }

    return {
      success: true,
      data: saved[0]
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while saving file.'
    }
  }
}
