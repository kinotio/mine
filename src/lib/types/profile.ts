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
  name: string
  title: string
  bio: string
  location: string
  email: string
  website?: string
  github?: string
  linkedin?: string
  x?: string
  bluesky?: string
  avatar_url: string
  banner_url: string
  profile_url: string
  stats: Stats
  skills: Skill[]
  projects: Project[]
  workExperience: WorkExperience[]
  customSections: CustomSection[]
}
