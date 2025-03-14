'use server'

import database from '@/server/services/drizzle'
import { files, File } from '@/server/databases'

export const saveFile = async (file: File) => {
  return await database.drizzle.insert(files).values(file).returning()
}
