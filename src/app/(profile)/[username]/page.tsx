'use client'

import { useState, useEffect } from 'react'
import { Plus, icons } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProfile } from '@/components/profile/provider'
import { Icon } from '@/components/icon'

import { useEventEmitter } from '@/hooks/use-event'

import { getProfileSectionTemplates } from '@/server/actions/profile'
import { ProfileSectionTemplate } from '@/server/databases/types'

interface SectionHeaderProps {
  name: string
  icon: string
  buttonText?: string
  buttonColor?: string
  buttonTextColor?: string
  onButtonClick?: () => void
}

interface ScrollableSectionProps {
  children: React.ReactNode
}

const Page = () => {
  const { profile } = useProfile()
  const { emit } = useEventEmitter()

  const [templates, setTemplates] = useState<ProfileSectionTemplate[]>([])

  useEffect(() => {
    getProfileSectionTemplates().then(({ success, data, error }) => {
      if (success && data) setTemplates(data)
      else console.error('Failed to fetch section templates:', error)
    })
  }, [])

  const handleCreateSectionItem = (sectionId: string) => {
    console.log(`Add item to section ${sectionId}`)
    emit('profile:updated', {})
  }

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
                  <div
                    key={item.id}
                    className='w-[250px] bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-4 hover:translate-y-[-5px] hover:shadow-[5px_10px_0px_0px_rgba(0,0,0,1)] transition-all'
                  >
                    <h3 className='text-lg font-bold'></h3>
                    <p className='text-gray-700'></p>
                  </div>
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

const SectionHeader = ({
  name,
  icon = 'Star',
  buttonText = 'Add Item',
  buttonColor = '#4cc9f0',
  buttonTextColor = 'black',
  onButtonClick
}: SectionHeaderProps) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='font-black flex items-center gap-2'>
        <Icon name={icon as keyof typeof icons} size={30} />
        <span className='text-2xl'>{name}</span>
      </h2>

      {onButtonClick && (
        <Button
          onClick={onButtonClick}
          className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all mr-6 mt-2'
          style={{
            backgroundColor: buttonColor,
            color: buttonTextColor === 'black' ? 'black' : 'white'
          }}
        >
          <Plus className='mr-2 h-5 w-5' /> {buttonText}
        </Button>
      )}
    </div>
  )
}

const ScrollableSection = ({ children }: ScrollableSectionProps) => {
  return (
    <div className='overflow-x-auto pb-4 -mx-4 px-4' style={{ overflowY: 'hidden' }}>
      <div className='flex gap-6 min-w-max'>{children}</div>
    </div>
  )
}

export default Page
