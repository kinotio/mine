import * as z from 'zod'

export const projectSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  tags: z.string().optional(),
  image: z.string().optional(),
  sourceUrl: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal('')),
  liveUrl: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal(''))
})

export const skillSchema = z.object({
  name: z.string().min(2, { message: 'Skill name must be at least 2 characters' }),
  level: z.number().min(1).max(100)
})

export const experienceSchema = z.object({
  company: z.string().min(2, { message: 'Company name must be at least 2 characters' }),
  position: z.string().min(2, { message: 'Position must be at least 2 characters' }),
  period: z.string().min(2, { message: 'Period must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' })
})

export const certificationSchema = z.object({
  title: z.string().min(2, { message: 'Certification name must be at least 2 characters' }),
  issuer: z.string().min(2, { message: 'Issuer must be at least 2 characters' }),
  date: z.string().min(2, { message: 'Date must be at least 2 characters' }),
  image: z.string().optional()
})

export const educationSchema = z.object({
  institution: z.string().min(2, { message: 'Institution name must be at least 2 characters' }),
  degree: z.string().min(2, { message: 'Degree must be at least 2 characters' }),
  period: z.string().min(2, { message: 'Period must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' })
})

export const achievementSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  issuer: z.string().min(2, { message: 'Issuer must be at least 2 characters' }),
  date: z.string().min(2, { message: 'Date must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' })
})

export const portfolioSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  category: z.string().min(2, { message: 'Category must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  image: z.string().optional(),
  url: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal(''))
})

export const publicationSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  publisher: z.string().min(2, { message: 'Publisher must be at least 2 characters' }),
  date: z.string().min(2, { message: 'Date must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  url: z.string().url({ message: 'Please enter a valid URL' }).optional().or(z.literal(''))
})

export const languageSchema = z.object({
  name: z.string().min(2, { message: 'Language name must be at least 2 characters' }),
  proficiency: z.string().min(2, { message: 'Proficiency must be at least 2 characters' }),
  level: z.number().min(1).max(100)
})

export const volunteerSchema = z.object({
  organization: z.string().min(2, { message: 'Organization name must be at least 2 characters' }),
  role: z.string().min(2, { message: 'Role must be at least 2 characters' }),
  period: z.string().min(2, { message: 'Period must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' })
})

export const defaultSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' })
})
