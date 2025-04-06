import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string().optional()
})

export const userProfileSchema = z.object({
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

export const userProfileFileSchema = z.object({
  id: z.string().optional(),
  user_profile_id: z.string(),
  file_name: z.string(),
  file_url: z.string(),
  file_type: z.string(),
  file_size: z.string(),
  tag: z.string()
})

export const userProfileSectionSchema = z.object({
  id: z.string().optional(),
  user_profile_id: z.string(),
  profile_section_template_id: z.string(),
  name: z.string(),
  slug: z.string()
})

export const userProfileSectionItemSchema = z.object({
  id: z.string().optional(),
  user_profile_id: z.string(),
  user_profile_section_id: z.string(),
  metadata: z.object({}).optional()
})

export const userProfileSettingSchema = z.object({
  id: z.string().optional(),
  user_profile_id: z.string(),
  metadata: z
    .object({
      general: z
        .object({
          showPreviewResume: z.boolean().optional(),
          showDownloadButton: z.boolean().optional()
        })
        .optional()
    })
    .optional()
})

export type User = z.infer<typeof userSchema>
export type UserProfile = z.infer<typeof userProfileSchema>
export type UserProfileFile = z.infer<typeof userProfileFileSchema>
export type UserProfileSection = z.infer<typeof userProfileSectionSchema>
export type UserProfileSectionItem = z.infer<typeof userProfileSectionItemSchema>
export type UserProfileSetting = z.infer<typeof userProfileSettingSchema>

export type ProfileSectionTemplate = {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
}
