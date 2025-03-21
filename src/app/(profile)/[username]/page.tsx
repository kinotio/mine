'use client'

import { useState, useEffect } from 'react'
import { PlusCircle } from 'lucide-react'

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
import { ActionItemCard } from '@/components/profile/page/action-item'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

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
  deleteProfileSectionItem,
  deleteProfileSection,
  updateProfileSection,
  updateProfileSectionItem
} from '@/server/actions'
import { ProfileSectionTemplate } from '@/server/databases/types'

import { saveFile, uploadFile } from '@/server/actions'

const Page = () => {
  const { profile, user, hasPermission, isSignedIn } = useProfile()
  const { emit } = useEventEmitter()
  const { toast } = useToast()

  const [templates, setTemplates] = useState<ProfileSectionTemplate[]>([])

  const handleDeleteSection = async (sectionId: string): Promise<void> => {
    deleteProfileSection(user.id, sectionId).then(({ success, data, error }) => {
      if (success && data) {
        toast({
          title: 'Deleted',
          description: `The section has been deleted.`
        })
      }

      if (!success && error) {
        toast({ title: 'Error', description: error, variant: 'destructive' })
      }

      emit('profile:updated', {})
    })
  }

  const handleCreateSectionItem = async (
    sectionId: string,
    payload: DynamicObject
  ): Promise<void> => {
    // Handle image upload if present
    if (payload.image instanceof File) {
      const formData = new FormData()
      formData.append('file', payload.image as File)
      formData.append('bucket', 'images')

      const { success, data } = await uploadFile(formData)

      if (success && data?.url) {
        await saveFile({
          file_url: data.url,
          file_name: data.name,
          file_type: data.type,
          file_size: data.size.toString(),
          tag: 'image',
          user_profile_id: profile.id
        })
      }

      payload.image = data?.url ?? ''
    }

    createProfileSectionItem(user.id, profile.id, sectionId, payload).then(
      ({ success, data, error }) => {
        if (success && data) {
          toast({
            title: 'Saved',
            description: `New item has been added.`
          })
        }

        if (!success && error) {
          toast({ title: 'Error', description: error, variant: 'destructive' })
        }

        emit('profile:updated', {})
      }
    )
  }

  const handleEditSection = async (sectionId: string, newName: string): Promise<void> => {
    updateProfileSection(user.id, sectionId, { name: newName }).then(({ success, data, error }) => {
      if (success && data) {
        toast({
          title: 'Updated',
          description: `The section has been updated.`
        })
      }

      if (!success && error) {
        toast({ title: 'Error', description: error, variant: 'destructive' })
      }

      emit('profile:updated', {})
    })
  }

  const handleDeleteSectionItem = async (itemId: string, sectionId: string): Promise<void> => {
    deleteProfileSectionItem(user.id, sectionId, itemId).then(({ success, data, error }) => {
      if (success && data) {
        toast({
          title: 'Removed',
          description: `An item has been removed.`
        })
      }

      if (!success && error) {
        toast({ title: 'Error', description: error, variant: 'destructive' })
      }

      emit('profile:updated', {})
    })
  }

  const handleEditSectionItem = async (
    itemId: string,
    sectionId: string,
    updatedData: Record<string, unknown>
  ): Promise<void> => {
    // Handle image upload if changed
    if (updatedData.image instanceof File) {
      const formData = new FormData()
      formData.append('file', updatedData.image)
      formData.append('bucket', 'images')

      const { success, data } = await uploadFile(formData)

      if (success && data?.url) {
        await saveFile({
          file_url: data.url,
          file_name: data.name,
          file_type: data.type,
          file_size: data.size.toString(),
          tag: 'image',
          user_profile_id: profile.id
        })

        updatedData.image = data.url
      }
    }

    updateProfileSectionItem(user.id, sectionId, itemId, updatedData).then(
      ({ success, data, error }) => {
        if (success && data) {
          toast({
            title: 'Updated',
            description: `The item has been updated successfully.`
          })
        }

        if (!success && error) {
          toast({ title: 'Error', description: error, variant: 'destructive' })
        }

        emit('profile:updated', {})
      }
    )
  }

  // Helper to determine the display name for each item type
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
  ): JSX.Element => {
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

    // Add sectionType prop and remove editableFields prop
    return (
      <ActionItemCard
        canEditAndDelete={isSignedIn && hasPermission}
        itemId={itemId}
        sectionId={sectionId}
        sectionName={sectionName}
        itemName={getItemName(metadata, templateSlug)}
        sectionType={templateSlug || 'default'} // Pass the template slug as sectionType
        onDelete={handleDeleteSectionItem}
        onEdit={handleEditSectionItem}
        metadata={metadata}
      >
        {card}
      </ActionItemCard>
    )
  }

  // Load section templates on component mount
  useEffect(() => {
    getProfileSectionTemplates().then(({ success, data, error }) => {
      if (success && data) setTemplates(data)
      else console.error('Failed to fetch section templates:', error)
    })
  }, [])

  return (
    <>
      {profile.user_profile_sections.length === 0 && isSignedIn && hasPermission ? (
        <Alert className='my-8 px-8 py-10 bg-white'>
          <div className='flex flex-col items-center text-center'>
            <PlusCircle className='mb-2 h-8 w-8' />
            <AlertTitle className='mb-2 text-xl'>No sections added yet</AlertTitle>
            <AlertDescription className='mb-4 text-base'>
              Your profile looks empty. Add sections like Experience, Skills, or Projects to
              showcase your talents.
            </AlertDescription>

            <Button
              onClick={() => emit('profile:section:create', {})}
              className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-4'
            >
              <PlusCircle className='w-5 h-5' />
              Add New Section
            </Button>
          </div>
        </Alert>
      ) : (
        profile.user_profile_sections.map((section) => {
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
                sectionName={section.name}
                onSubmit={handleCreateSectionItem}
                onDelete={handleDeleteSection}
                onEdit={handleEditSection}
                isSignedInAndHasPermissionSection={isSignedIn && hasPermission}
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
        })
      )}
    </>
  )
}

export default Page
