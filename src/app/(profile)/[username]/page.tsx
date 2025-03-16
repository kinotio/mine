'use client'

import { useState, useEffect } from 'react'

import { useProfile } from '@/components/profile/provider'
import { ScrollableSection } from '@/components/profile/page/scrollable'
import { SectionHeader } from '@/components/profile/page/section-header'

import { ProjectCard } from '@/components/profile/page/cards/project'
import { ExperienceCard } from '@/components/profile/page/cards/experience'
import { SkillCard } from '@/components/profile/page/cards/skill'
import { CertificationCard } from '@/components/profile/page/cards/certification'
import { DefaultCard } from '@/components/profile/page/cards/default'

import { useEventEmitter } from '@/hooks/use-event'

import { getProfileSectionTemplates } from '@/server/actions/profile'
import { ProfileSectionTemplate } from '@/server/databases/types'

const Page = () => {
  const { profile } = useProfile()
  const { emit } = useEventEmitter()

  const [templates, setTemplates] = useState<ProfileSectionTemplate[]>([])

  const handleCreateSectionItem = (sectionId: string) => {
    console.log(`Add item to section ${sectionId}`)
    emit('profile:updated', {})
  }

  const renderCard = (metadata: any, templateSlug: string | undefined) => {
    switch (templateSlug) {
      case 'projects':
        return <ProjectCard project={metadata} />
      case 'experience':
        return <ExperienceCard experience={metadata} />
      case 'skills':
        return <SkillCard skill={metadata} />
      case 'certifications':
        return <CertificationCard certification={metadata} />
      default:
        return <DefaultCard item={metadata} />
    }
  }

  useEffect(() => {
    getProfileSectionTemplates().then(({ success, data, error }) => {
      if (success && data) setTemplates(data)
      else console.error('Failed to fetch section templates:', error)
    })
  }, [])

  return (
    <>
      {profile.user_profile_sections.map((section) => {
        const template = templates.find((t) => t.id === section.profile_section_template_id)
        const textColor = ['#f72585', '#7209b7', '#e63946'].includes(template?.color as string)
          ? 'white'
          : 'black'

        return (
          <section key={section.id} className='mb-10'>
            <SectionHeader
              icon={template?.icon as string}
              buttonColor={template?.color}
              name={section.name}
              buttonText={`Add ${section.name}`}
              buttonTextColor={textColor}
              onButtonClick={() => handleCreateSectionItem(section.id)}
            />
            <ScrollableSection>
              {Array.isArray(section.user_profile_section_items) &&
              section.user_profile_section_items.length > 0 ? (
                section.user_profile_section_items.map((item) => (
                  <div key={item.id}>{renderCard(item.metadata, template?.slug)}</div>
                ))
              ) : (
                <div className='w-full py-8 text-center'>
                  <p className='text-lg font-bold'>
                    {`No items yet. Click "Add Item" to get started.`}
                  </p>
                </div>
              )}
            </ScrollableSection>
          </section>
        )
      })}
    </>
  )
}

export default Page
