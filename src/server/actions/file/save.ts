'use server'

import database from '@/server/services/drizzle'
import { files, File } from '@/server/databases'
import { ActionResponse } from '@/server/utils/types'

export const saveFile = async (file: File): Promise<ActionResponse<File>> => {
  try {
    const saved = await database.drizzle.insert(files).values(file).returning()

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
