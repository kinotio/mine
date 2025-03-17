import { z } from 'zod'
import * as schemas from '@/components/profile/page/dialog/schemas'

type SchemaType = keyof typeof schemas

export const getDefaultValues = <T extends SchemaType>(
  sectionType: string
): z.infer<(typeof schemas)[T]> => {
  switch (sectionType) {
    case 'projects':
      return {
        title: '',
        description: '',
        tags: '',
        image: '',
        sourceUrl: '',
        liveUrl: ''
      } as z.infer<(typeof schemas)[T]>
    case 'skills':
      return {
        name: '',
        level: 50
      } as z.infer<(typeof schemas)[T]>
    case 'experience':
      return {
        company: '',
        position: '',
        period: '',
        description: ''
      } as z.infer<(typeof schemas)[T]>
    case 'certifications':
      return {
        title: '',
        issuer: '',
        date: '',
        image: ''
      } as z.infer<(typeof schemas)[T]>
    case 'education':
      return {
        institution: '',
        degree: '',
        period: '',
        description: ''
      } as z.infer<(typeof schemas)[T]>
    case 'achievements':
      return {
        title: '',
        issuer: '',
        date: '',
        description: ''
      } as z.infer<(typeof schemas)[T]>
    case 'portfolio':
      return {
        title: '',
        category: '',
        description: '',
        image: '',
        url: ''
      } as z.infer<(typeof schemas)[T]>
    case 'publications':
      return {
        title: '',
        publisher: '',
        date: '',
        description: '',
        url: ''
      } as z.infer<(typeof schemas)[T]>
    case 'languages':
      return {
        name: '',
        proficiency: 'Intermediate',
        level: 50
      } as z.infer<(typeof schemas)[T]>
    case 'volunteer':
      return {
        organization: '',
        role: '',
        period: '',
        description: ''
      } as z.infer<(typeof schemas)[T]>
    default:
      return {
        title: '',
        description: ''
      } as z.infer<(typeof schemas)[T]>
  }
}

export const getSchema = (sectionType: string): SchemaType => {
  switch (sectionType) {
    case 'projects':
      return 'projectSchema'
    case 'skills':
      return 'skillSchema'
    case 'experience':
      return 'experienceSchema'
    case 'certifications':
      return 'certificationSchema'
    case 'education':
      return 'educationSchema'
    case 'achievements':
      return 'achievementSchema'
    case 'portfolio':
      return 'portfolioSchema'
    case 'publications':
      return 'publicationSchema'
    case 'languages':
      return 'languageSchema'
    case 'volunteer':
      return 'volunteerSchema'
    default:
      return 'defaultSchema'
  }
}

// Helper function to get properly typed form config
export const getFormConfig = <T extends SchemaType>(sectionType: string) => {
  const schemaName = getSchema(sectionType)
  const schema = schemas[schemaName]
  const defaultValues = getDefaultValues<T>(sectionType)

  return {
    schema,
    defaultValues
  }
}
