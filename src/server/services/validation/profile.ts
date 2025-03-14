import { z } from 'zod'

export const ProfileValidation = z.object({
  name: z.string().min(2).max(100).optional(),
  title: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  email: z.string().email().optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().nullable().optional(),
  banner_url: z.string().url().nullable().optional(),
  website: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  x: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  bluesky: z.string().nullable().optional()
})
