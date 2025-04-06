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
  user_profile_settings: {
    id: string
    user_profile_id: string
    metadata: {
      general: {
        showPreviewResume: boolean
        showDownloadButton: boolean
      }
    }
  }
}

export interface ProjectData {
  title: string
  description: string
  tags?: string[]
  image?: string
  sourceUrl?: string
  liveUrl?: string
}

export interface SkillData {
  name: string
  level: number // 1-100
}

export interface ExperienceData {
  company: string
  position: string
  period: string
  description: string
}

export interface CertificationData {
  title: string
  issuer: string
  date: string
  image?: string
}

export interface EducationData {
  institution: string
  degree: string
  period: string
  description: string
}

export interface AchievementData {
  title: string
  issuer: string
  date: string
  description: string
}

export interface PortfolioData {
  title: string
  category: string
  description: string
  image?: string
  url?: string
}

export interface PublicationData {
  title: string
  publisher: string
  date: string
  description: string
  url?: string
}

export interface LanguageData {
  name: string
  proficiency: string
  level: number // 1-100
}

export interface VolunteerData {
  organization: string
  role: string
  period: string
  description: string
}

export interface DefaultData {
  title: string
  description: string
}
