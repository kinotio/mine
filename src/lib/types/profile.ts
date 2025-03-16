export type Skill = {
  id: string
  name: string
  level: number // 1-5
  category: string
}

export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  imageUrl: string
  liveUrl?: string
  repoUrl?: string
  featured: boolean
}

export type WorkExperience = {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  technologies: string[]
}

export type CustomSection = {
  id: string
  title: string
  items: CustomSectionItem[]
}

export type CustomSectionItem = {
  id: string
  title: string
  description: string
  date?: string
  url?: string
}

export type Stats = {
  projects: number
  experience: number
  clients: number
  awards: number
}

export type UserProfile = {
  id: string
  user_id: string
  name: string
  title: string | null
  location: string | null
  bio: string
  email: string
  avatar_url: string | null
  banner_url: string | null
  profile_url: string
  website: string | null
  github: string | null
  x: string | null
  linkedin: string | null
  bluesky: string | null
  user_profile_sections: {
    id: string
    user_profile_id: string
    profile_section_template_id: string
    name: string
    slug: string
    user_profile_section_items: {
      id: string
      user_profile_id: string
      user_profile_section_id: string
      metadata: { [key: string]: string }
    }[]
  }[]
}

export interface ProjectData {
  title: string
  description: string
  tags: string[]
  image: string
  sourceUrl?: string
  liveUrl?: string
}

export interface ExperienceData {
  company: string
  position: string
  period: string
  description: string
}

export interface SkillData {
  name: string
  level: number
}

export interface CertificationData {
  name: string
  issuer: string
  date: string
  image: string
}

export interface DefaultData {
  id: string
  name: string
  description: string
}
