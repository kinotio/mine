import { z } from 'zod'
import { UseFormReturn, ControllerRenderProps } from 'react-hook-form'
import { Dispatch, SetStateAction, ChangeEvent } from 'react'

import {
  projectSchema,
  skillSchema,
  experienceSchema,
  certificationSchema,
  educationSchema,
  achievementSchema,
  portfolioSchema,
  publicationSchema,
  languageSchema,
  volunteerSchema,
  defaultSchema
} from '@/components/profile/page/dialog/schemas'

// Export types inferred from schemas
export type ProjectFormValues = z.infer<typeof projectSchema>
export type SkillFormValues = z.infer<typeof skillSchema>
export type ExperienceFormValues = z.infer<typeof experienceSchema>
export type CertificationFormValues = z.infer<typeof certificationSchema>
export type EducationFormValues = z.infer<typeof educationSchema>
export type AchievementFormValues = z.infer<typeof achievementSchema>
export type PortfolioFormValues = z.infer<typeof portfolioSchema>
export type PublicationFormValues = z.infer<typeof publicationSchema>
export type LanguageFormValues = z.infer<typeof languageSchema>
export type VolunteerFormValues = z.infer<typeof volunteerSchema>
export type DefaultFormValues = z.infer<typeof defaultSchema>

// Union type for all possible form values
export type FormValues =
  | ProjectFormValues
  | SkillFormValues
  | ExperienceFormValues
  | CertificationFormValues
  | EducationFormValues
  | AchievementFormValues
  | PortfolioFormValues
  | PublicationFormValues
  | LanguageFormValues
  | VolunteerFormValues
  | DefaultFormValues

// Type to map section type to its corresponding form values
export type SectionFormValues = {
  projects: ProjectFormValues
  skills: SkillFormValues
  experience: ExperienceFormValues
  certifications: CertificationFormValues
  education: EducationFormValues
  achievements: AchievementFormValues
  portfolio: PortfolioFormValues
  publications: PublicationFormValues
  languages: LanguageFormValues
  volunteer: VolunteerFormValues
  default: DefaultFormValues
}

// Helper type to get form values type based on section type
export type FormValuesForSection<T extends keyof SectionFormValues> = SectionFormValues[T]

export interface ProjectFormProps {
  form: UseFormReturn<ProjectFormValues>
  imagePreview: string | null
  setImagePreview: Dispatch<SetStateAction<string | null>>
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<ProjectFormValues, 'image'>
  ) => void
  isLoading: boolean
}

export interface AchievementFormProps {
  form: UseFormReturn<AchievementFormValues>
  isLoading: boolean
}

export interface CertificationFormProps {
  form: UseFormReturn<CertificationFormValues>
  imagePreview: string | null
  setImagePreview: Dispatch<SetStateAction<string | null>>
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<CertificationFormValues, 'image'>
  ) => void
  isLoading: boolean
}

export interface DefaultFormProps {
  form: UseFormReturn<DefaultFormValues>
  isLoading: boolean
}

export interface EducationFormProps {
  form: UseFormReturn<EducationFormValues>
  isLoading: boolean
}

export interface ExperienceFormProps {
  form: UseFormReturn<ExperienceFormValues>
  isLoading: boolean
}

export interface LanguageFormProps {
  form: UseFormReturn<LanguageFormValues>
  isLoading: boolean
}

export interface PortfolioFormProps {
  form: UseFormReturn<PortfolioFormValues>
  imagePreview: string | null
  setImagePreview: Dispatch<SetStateAction<string | null>>
  handleImageUpload: (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<PortfolioFormValues, 'image'>
  ) => void
  isLoading: boolean
}

export interface PublicationFormProps {
  form: UseFormReturn<PublicationFormValues>
  isLoading: boolean
}

export interface SkillFormProps {
  form: UseFormReturn<SkillFormValues>
  isLoading: boolean
}

export interface VolunteerFormProps {
  form: UseFormReturn<VolunteerFormValues>
  isLoading: boolean
}
