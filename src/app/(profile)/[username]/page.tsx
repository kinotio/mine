'use client'

import { useState, useEffect } from 'react'

import { ScrollableSection } from '@/components/profile/page/scrollable'
import { SectionHeader } from '@/components/profile/page/section-header'

import {
  ProjectCard,
  ExperienceCard,
  SkillCard,
  CertificationCard,
  EducationCard,
  AchievementCard,
  PortfolioCard,
  PublicationCard,
  LanguageCard,
  VolunteerCard,
  DefaultCard
} from '@/components/profile/page/cards'
import { Deletable } from '@/components/profile/page/deletable'

import { adaptToType, DynamicObject } from '@/lib/utils'
import {
  ProjectData,
  ExperienceData,
  SkillData,
  CertificationData,
  EducationData,
  AchievementData,
  PortfolioData,
  PublicationData,
  LanguageData,
  VolunteerData,
  DefaultData
} from '@/lib/types/profile'

import { useEventEmitter } from '@/hooks/use-event'
import { useToast } from '@/hooks/use-toast'
import { useProfile } from '@/components/profile/provider'

import {
  getProfileSectionTemplates,
  createProfileSectionItem,
  deleteProfileSectionItem
} from '@/server/actions'
import { ProfileSectionTemplate } from '@/server/databases/types'

const Page = () => {
  const { profile, user } = useProfile()
  const { emit } = useEventEmitter()
  const { toast } = useToast()

  const [templates, setTemplates] = useState<ProfileSectionTemplate[]>([])

  const handleCreateSectionItem = async (
    userId: string,
    sectionId: string,
    data: DynamicObject
  ) => {
    createProfileSectionItem(userId, profile.id, sectionId, data).then(
      ({ success, data, error }) => {
        if (success && data) {
          toast({
            title: 'Saved',
            description: `New item has been added.`
          })
        }

        if (!success && error) {
          toast({ title: 'Error', description: error })
        }

        emit('profile:updated', {})
      }
    )
  }

  const handleDeleteSectionItem = async (itemId: string, sectionId: string) => {
    deleteProfileSectionItem(user.id, sectionId, itemId).then(({ success, data, error }) => {
      if (success && data) {
        toast({
          title: 'Removed',
          description: `An item has been removed.`
        })
      }

      if (!success && error) {
        toast({ title: 'Error', description: error })
      }

      emit('profile:updated', {})
    })
  }

  // Helper function to get item name for the Deletable component
  const getItemName = (
    metadata: Record<string, unknown>,
    templateSlug: string | undefined
  ): string => {
    switch (templateSlug) {
      case 'projects':
        return (metadata.title as string) ?? (metadata.name as string) ?? 'Project'
      case 'experience':
        return (metadata.role as string) ?? (metadata.company as string) ?? 'Experience'
      case 'skills':
        return (metadata.name as string) ?? (metadata.skill as string) ?? 'Skill'
      case 'certifications':
        return (metadata.name as string) ?? 'Certification'
      case 'education':
        return (metadata.degree as string) ?? (metadata.school as string) ?? 'Education'
      case 'achievements':
        return (metadata.title as string) ?? 'Achievement'
      case 'portfolio':
        return (metadata.title as string) ?? (metadata.name as string) ?? 'Portfolio Item'
      case 'publications':
        return (metadata.title as string) ?? 'Publication'
      case 'languages':
        return (metadata.language as string) ?? 'Language'
      case 'volunteer':
        return (metadata.role as string) ?? (metadata.organization as string) ?? 'Volunteer Work'
      default:
        return (metadata.title as string) ?? (metadata.name as string) ?? 'Item'
    }
  }

  const renderCard = (
    itemId: string,
    sectionId: string,
    sectionName: string,
    metadata: Record<string, unknown>,
    templateSlug: string | undefined
  ) => {
    // Get appropriate card based on templateSlug
    let card
    switch (templateSlug) {
      case 'projects':
        card = <ProjectCard project={adaptToType<ProjectData>(metadata)} />
        break
      case 'experience':
        card = <ExperienceCard experience={adaptToType<ExperienceData>(metadata)} />
        break
      case 'skills':
        card = <SkillCard skill={adaptToType<SkillData>(metadata)} />
        break
      case 'certifications':
        card = <CertificationCard certification={adaptToType<CertificationData>(metadata)} />
        break
      case 'education':
        card = <EducationCard education={adaptToType<EducationData>(metadata)} />
        break
      case 'achievements':
        card = <AchievementCard achievement={adaptToType<AchievementData>(metadata)} />
        break
      case 'portfolio':
        card = <PortfolioCard portfolio={adaptToType<PortfolioData>(metadata)} />
        break
      case 'publications':
        card = <PublicationCard publication={adaptToType<PublicationData>(metadata)} />
        break
      case 'languages':
        card = <LanguageCard language={adaptToType<LanguageData>(metadata)} />
        break
      case 'volunteer':
        card = <VolunteerCard volunteer={adaptToType<VolunteerData>(metadata)} />
        break
      default:
        card = <DefaultCard item={adaptToType<DefaultData>(metadata)} />
        break
    }

    // Wrap card with Deletable component
    return (
      <Deletable
        itemId={itemId}
        sectionId={sectionId}
        sectionName={sectionName}
        itemName={getItemName(metadata, templateSlug)}
        onDelete={handleDeleteSectionItem}
      >
        {card}
      </Deletable>
    )
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
              sectionId={section.id}
              icon={template?.icon as string}
              buttonColor={template?.color}
              name={section.name}
              buttonText={`Add ${section.name}`}
              buttonTextColor={textColor}
              sectionType={template?.slug ?? ''}
              sectionTitle={section.name}
              onSubmit={handleCreateSectionItem}
            />

            <ScrollableSection>
              {Array.isArray(section.user_profile_section_items) &&
              section.user_profile_section_items.length > 0 ? (
                section.user_profile_section_items.map((item) => {
                  const metadata =
                    typeof item.metadata === 'string'
                      ? JSON.parse(item.metadata)
                      : (item.metadata as Record<string, unknown>)

                  return (
                    <div key={item.id}>
                      {renderCard(item.id, section.id, section.name, metadata, template?.slug)}
                    </div>
                  )
                })
              ) : (
                <div className='w-full py-8 text-center'>
                  <p className='text-md font-bold'>
                    {`No items yet. Click "Add ${section.name}" to get started.`}
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
