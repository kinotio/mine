import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string().optional()
})

export const profileSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  profile_url: z.string(),
  avatar_url: z.string().optional(),
  banner_url: z.string().optional(),
  name: z.string(),
  title: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  email: z.string(),
  website: z.string().optional(),
  github: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional(),
  bluesky: z.string().optional()
})

export const fileSchema = z.object({
  id: z.string().optional(),
  profile_id: z.string(),
  file_name: z.string(),
  file_url: z.string(),
  file_type: z.string(),
  file_size: z.string(),
  tag: z.string()
})

export type User = z.infer<typeof userSchema>
export type Profile = z.infer<typeof profileSchema>
export type File = z.infer<typeof fileSchema>
