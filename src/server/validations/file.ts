import { z } from 'zod'

import { MAX_FILE_SIZE } from '@/server/utils/constants'

export const FileValidation = z.object({
  type: z.string().startsWith('image/'),
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 1MB'),
  name: z.string().refine(
    (name) => {
      const ext = name.toLowerCase()
      return (
        ext.endsWith('.jpg') ||
        ext.endsWith('.jpeg') ||
        ext.endsWith('.png') ||
        ext.endsWith('.gif') ||
        ext.endsWith('.webp')
      )
    },
    { message: 'Only image files are allowed (jpg, jpeg, png, gif, webp)' }
  )
})
