import * as z from 'zod'

const blueskyPattern = /^[a-zA-Z0-9_-]+\.(bsky\.social|[a-zA-Z0-9-]+)$/

export const basicInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  location: z.string().min(2, { message: 'Location is required' }),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional()
})

export const bioSchema = z.object({
  bio: z.string().optional()
})

export const contactSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  website: z.string().url({ message: 'Please enter a valid website url' }).optional(),
  github: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional(),
  bluesky: z
    .string()
    .regex(blueskyPattern, 'Invalid Bluesky handle format (e.g., username.bsky.social)')
    .optional()
    .or(z.literal(''))
})

export const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...bioSchema.shape,
  ...contactSchema.shape
})

export type FormSchema = z.infer<typeof formSchema>
