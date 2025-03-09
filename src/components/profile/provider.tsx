'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

// Define types for our profile data
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
  avatarUrl: string
  bannerUrl: string
  stats: Stats
  skills: Skill[]
  projects: Project[]
  workExperience: WorkExperience[]
  customSections: CustomSection[]
}

// Sample initial data
const initialProfile: UserProfile = {
  name: 'Jane Developer',
  title: 'Full Stack Engineer',
  bio: 'Passionate developer with 5+ years of experience building web applications. I specialize in React, Node.js, and TypeScript. Always eager to learn new technologies and contribute to open-source projects.',
  location: 'San Francisco, CA',
  email: 'jane@example.com',
  website: 'https://janedeveloper.com',
  github: 'janedeveloper',
  linkedin: 'janedeveloper',
  x: 'janedeveloper',
  bluesky: 'janedeveloper',
  avatarUrl: '',
  bannerUrl: '',
  stats: {
    projects: 24,
    experience: 5,
    clients: 12,
    awards: 3
  },
  skills: [
    { id: '1', name: 'React', level: 5, category: 'Frontend' },
    { id: '2', name: 'TypeScript', level: 4, category: 'Languages' },
    { id: '3', name: 'Node.js', level: 4, category: 'Backend' },
    { id: '4', name: 'Next.js', level: 4, category: 'Frontend' },
    { id: '5', name: 'GraphQL', level: 3, category: 'Backend' },
    { id: '6', name: 'Tailwind CSS', level: 5, category: 'Frontend' },
    { id: '7', name: 'MongoDB', level: 3, category: 'Database' },
    { id: '8', name: 'PostgreSQL', level: 4, category: 'Database' }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description:
        'A full-featured e-commerce platform with product management, cart functionality, and payment processing.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      imageUrl: '/placeholder.svg?height=300&width=500',
      liveUrl: 'https://example.com/ecommerce',
      repoUrl: 'https://github.com/janedeveloper/ecommerce',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates and team features.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      imageUrl: '/placeholder.svg?height=300&width=500',
      liveUrl: 'https://example.com/taskapp',
      repoUrl: 'https://github.com/janedeveloper/taskapp',
      featured: true
    },
    {
      id: '3',
      title: 'Developer Portfolio',
      description: 'A customizable portfolio template for developers to showcase their work.',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion'],
      imageUrl: '/placeholder.svg?height=300&width=500',
      liveUrl: 'https://example.com/portfolio',
      repoUrl: 'https://github.com/janedeveloper/portfolio',
      featured: false
    }
  ],
  workExperience: [
    {
      id: '1',
      company: 'Tech Innovations Inc.',
      position: 'Senior Frontend Developer',
      startDate: '2021-03',
      current: true,
      description:
        "Leading the frontend development team, implementing new features, and improving performance of the company's main product.",
      technologies: ['React', 'TypeScript', 'GraphQL']
    },
    {
      id: '2',
      company: 'Digital Solutions LLC',
      position: 'Full Stack Developer',
      startDate: '2018-06',
      endDate: '2021-02',
      current: false,
      description:
        'Developed and maintained multiple client projects, focusing on responsive design and API integration.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express']
    },
    {
      id: '3',
      company: 'StartUp Ventures',
      position: 'Junior Developer',
      startDate: '2016-09',
      endDate: '2018-05',
      current: false,
      description:
        'Assisted in building MVPs for early-stage startups, focusing on rapid prototyping and iteration.',
      technologies: ['JavaScript', 'HTML/CSS', 'jQuery', 'PHP']
    }
  ],
  customSections: [
    {
      id: '1',
      title: 'Education',
      items: [
        {
          id: '1',
          title: 'Master of Computer Science',
          description: 'Stanford University',
          date: '2014-2016',
          url: 'https://stanford.edu'
        },
        {
          id: '2',
          title: 'Bachelor of Science in Software Engineering',
          description: 'University of California, Berkeley',
          date: '2010-2014',
          url: 'https://berkeley.edu'
        }
      ]
    },
    {
      id: '2',
      title: 'Certifications',
      items: [
        {
          id: '1',
          title: 'AWS Certified Solutions Architect',
          description: 'Amazon Web Services',
          date: '2022',
          url: 'https://aws.amazon.com/certification/'
        },
        {
          id: '2',
          title: 'Google Cloud Professional Developer',
          description: 'Google Cloud Platform',
          date: '2021',
          url: 'https://cloud.google.com/certification'
        }
      ]
    }
  ]
}

// Create context
type ProfileContextType = {
  profile: UserProfile
  updateProfile: (profile: Partial<UserProfile>) => void
  addSkill: (skill: Omit<Skill, 'id'>) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  addProject: (project: Omit<Project, 'id'>) => void
  updateProject: (id: string, project: Partial<Project>) => void
  removeProject: (id: string) => void
  addWorkExperience: (work: Omit<WorkExperience, 'id'>) => void
  updateWorkExperience: (id: string, work: Partial<WorkExperience>) => void
  removeWorkExperience: (id: string) => void
  addCustomSection: (section: Omit<CustomSection, 'id'>) => void
  updateCustomSection: (id: string, section: Partial<CustomSection>) => void
  removeCustomSection: (id: string) => void
  addCustomSectionItem: (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => void
  updateCustomSectionItem: (
    sectionId: string,
    itemId: string,
    item: Partial<CustomSectionItem>
  ) => void
  removeCustomSectionItem: (sectionId: string, itemId: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

// Provider component
export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile)

  // Generate a unique ID
  const generateId = () => Math.random().toString(36).substr(2, 9)

  // Update profile
  const updateProfile = (newProfileData: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...newProfileData }))
  }

  // Skills methods
  const addSkill = (skill: Omit<Skill, 'id'>) => {
    const newSkill = { ...skill, id: generateId() }
    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const updateSkill = (id: string, skill: Partial<Skill>) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s))
    }))
  }

  const removeSkill = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id)
    }))
  }

  // Projects methods
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: generateId() }
    setProfile((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id: string, project: Partial<Project>) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p))
    }))
  }

  const removeProject = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id)
    }))
  }

  // Work experience methods
  const addWorkExperience = (work: Omit<WorkExperience, 'id'>) => {
    const newWork = { ...work, id: generateId() }
    setProfile((prev) => ({
      ...prev,
      workExperience: [...prev.workExperience, newWork]
    }))
  }

  const updateWorkExperience = (id: string, work: Partial<WorkExperience>) => {
    setProfile((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((w) => (w.id === id ? { ...w, ...work } : w))
    }))
  }

  const removeWorkExperience = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((w) => w.id !== id)
    }))
  }

  // Custom sections methods
  const addCustomSection = (section: Omit<CustomSection, 'id'>) => {
    const newSection = { ...section, id: generateId() }
    setProfile((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection]
    }))
  }

  const updateCustomSection = (id: string, section: Partial<CustomSection>) => {
    setProfile((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, ...section } : s))
    }))
  }

  const removeCustomSection = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id)
    }))
  }

  // Custom section items methods
  const addCustomSectionItem = (sectionId: string, item: Omit<CustomSectionItem, 'id'>) => {
    const newItem = { ...item, id: generateId() }
    setProfile((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s
      )
    }))
  }

  const updateCustomSectionItem = (
    sectionId: string,
    itemId: string,
    item: Partial<CustomSectionItem>
  ) => {
    setProfile((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              items: s.items.map((i) => (i.id === itemId ? { ...i, ...item } : i))
            }
          : s
      )
    }))
  }

  const removeCustomSectionItem = (sectionId: string, itemId: string) => {
    setProfile((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s
      )
    }))
  }

  const value = {
    profile,
    updateProfile,
    addSkill,
    updateSkill,
    removeSkill,
    addProject,
    updateProject,
    removeProject,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem
  }

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

// Custom hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
