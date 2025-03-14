'use server'

import { drizzle } from '@/server/drizzle'
import { files, File } from '@/server/db/schemas/file'

export const saveFile = async (file: File) => {
  return await drizzle.insert(files).values(file).returning()
}
