import { profileSectionTemplates } from '@/server/databases/tables'
import database from '@/server/services/drizzle'

const seedProfileSectionTemplates = async () => {
  const templates = [
    {
      name: 'Projects',
      slug: 'projects',
      description: 'Showcase your portfolio of work with images, descriptions, and links.',
      color: '#4cc9f0',
      icon: 'Code'
    },
    {
      name: 'Skills',
      slug: 'skills',
      description: 'Display your technical and professional skills with proficiency levels.',
      color: '#8ac926',
      icon: 'Lightbulb'
    },
    {
      name: 'Work Experience',
      slug: 'experience',
      description:
        'List your professional experience with companies, positions, and responsibilities.',
      color: '#f72585',
      icon: 'Briefcase'
    },
    {
      name: 'Education',
      slug: 'education',
      description: 'Share your educational background, degrees, and certifications.',
      color: '#7209b7',
      icon: 'GraduationCap'
    },
    {
      name: 'Certifications',
      slug: 'certifications',
      description: "Highlight professional certifications and credentials you've earned.",
      color: '#ff6b6b',
      icon: 'Award'
    },
    {
      name: 'Achievements',
      slug: 'achievements',
      description: 'Showcase awards, recognition, and notable accomplishments.',
      color: '#ffde59',
      icon: 'Trophy'
    },
    {
      name: 'Design Portfolio',
      slug: 'portfolio',
      description: 'Display visual work like designs, illustrations, or photography.',
      color: '#fb5607',
      icon: 'Palette'
    },
    {
      name: 'Publications',
      slug: 'publications',
      description: 'List articles, papers, books, or other published works.',
      color: '#3a86ff',
      icon: 'BookOpen'
    },
    {
      name: 'Languages',
      slug: 'languages',
      description: 'Show languages you speak with proficiency levels.',
      color: '#06d6a0',
      icon: 'Globe'
    },
    {
      name: 'Volunteer Work',
      slug: 'volunteer',
      description: 'Highlight community service and volunteer experiences.',
      color: '#e63946',
      icon: 'Heart'
    }
  ]

  console.log(`[*] Seeding ${templates.length} profile section templates...`)

  // Clear existing data to avoid duplicates
  await database.delete(profileSectionTemplates)

  // Insert all templates in a single batch
  await database.insert(profileSectionTemplates).values(templates).returning()
}

export default (async () => {
  return await seedProfileSectionTemplates()
})()
