import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isEmpty } from 'lodash'

import { getGradientFromColor } from '@/lib/colors'
import { UserProfile } from '@/lib/types/profile'

export const cn: typeof clsx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getBackgroundStyleByProfile = (profile: {
  avatarColor: string
  bannerUrl: string
}) => {
  return isEmpty(profile.bannerUrl)
    ? { background: getGradientFromColor(profile.avatarColor) }
    : {
        backgroundImage: `url(${profile.bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
}

export const cleanParamsUsername = (paramsUsername: string) => {
  return paramsUsername.replace(/[^a-zA-Z]/g, '')
}

export const generateProfileUrl = (username: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/@${username}`
}

export const adaptToType = <T>(data: Record<string, unknown>): T => {
  return data as unknown as T
}

export interface DynamicObject {
  [key: string]: unknown
}

export const decodeParamsUsername = (encodedUsername: string): string => {
  if (encodedUsername.startsWith('@')) return encodedUsername

  if (encodedUsername.startsWith('%40')) {
    return '@' + encodedUsername.substring(3)
  }

  return '@' + encodedUsername
}

export const calculateProfileStats = (profile: UserProfile) => {
  if (!profile) {
    return {
      projects: 0,
      experience: 0,
      clients: 0,
      awards: 0
    }
  }

  // Projects count
  const projectsSection = profile.user_profile_sections?.find(
    (section: { slug: string }) => section.slug === 'projects'
  )
  const projects = projectsSection?.user_profile_section_items?.length || 0

  // Experience calculation from work history
  const workSection = profile.user_profile_sections?.find(
    (section: { slug: string }) => section.slug === 'work-experience'
  )

  let experience = 0
  if (workSection?.user_profile_section_items?.length) {
    // Calculate total years from work experience entries
    const currentYear = new Date().getFullYear()

    // Track unique years to avoid double-counting overlapping jobs
    const yearsWorked = new Set<number>()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workSection.user_profile_section_items.forEach((item: any) => {
      if (item.metadata?.period) {
        // Extract start and end years from period string (e.g., "2018 - 2021" or "2023 - Present")
        const periodMatch = item.metadata.period.match(/(\d{4})\s*-\s*(\d{4}|Present)/i)

        if (periodMatch) {
          const startYear = parseInt(periodMatch[1], 10)
          const endYearStr = periodMatch[2]
          const endYear =
            endYearStr.toLowerCase() === 'present' ? currentYear : parseInt(endYearStr, 10)

          // Add all years worked to the set
          for (let year = startYear; year <= endYear; year++) {
            yearsWorked.add(year)
          }
        }
      }
    })

    // Total unique years worked
    experience = yearsWorked.size

    // Fallback to bio if no valid work experience dates found
    if (experience === 0) {
      const experienceMatch = profile.bio?.match(/(\d+)\+?\s*years?/i)
      if (experienceMatch) {
        experience = parseInt(experienceMatch[1], 10)
      }
    }
  } else {
    // Fallback to bio if no work experience section
    const experienceMatch = profile.bio?.match(/(\d+)\+?\s*years?/i)
    if (experienceMatch) {
      experience = parseInt(experienceMatch[1], 10)
    }
  }

  // Clients count from work experience
  const clients = workSection?.user_profile_section_items?.length || 0

  // Awards from certifications
  const certSection = profile.user_profile_sections?.find(
    (section: { slug: string }) => section.slug === 'certifications'
  )
  const awards = certSection?.user_profile_section_items?.length || 0

  return {
    projects,
    experience,
    clients,
    awards
  }
}
