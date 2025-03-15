'use server'

import { files } from '@/server/databases/tables'
import { File } from '@/server/databases/types'
import { ActionResponse } from '@/server/utils/types'

import database from '@/server/services/drizzle'

export const saveFile = async (file: File): Promise<ActionResponse<File>> => {
  try {
    const saved = await database.insert(files).values(file).returning()

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
