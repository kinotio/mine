import { icons } from 'lucide-react'

import { Icon } from '@/components/icon'
import { SectionItemDialog } from '@/components/profile/page/dialog'

import { DeletableSection } from '@/components/profile/page/deletable-section'
import { EditableSection } from '@/components/profile/page/editable-section'

import { DynamicObject } from '@/lib/utils'

interface SectionHeaderProps {
  sectionId: string
  name: string
  icon: string
  buttonText?: string
  buttonColor?: string
  buttonTextColor?: string
  sectionType: string
  sectionName: string
  onSubmit: (sectionId: string, data: DynamicObject) => Promise<void>
  onDelete: (sectionId: string) => Promise<void>
  onEdit: (sectionId: string, newName: string) => Promise<void>
  isSignedInAndHasPermissionSection: boolean
}

export const SectionHeader = ({
  sectionId,
  name,
  icon = 'Star',
  buttonText = 'Add Item',
  buttonColor = '#4cc9f0',
  buttonTextColor = 'black',
  sectionType,
  sectionName,
  onSubmit,
  onDelete,
  onEdit,
  isSignedInAndHasPermissionSection
}: SectionHeaderProps) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='font-black flex flex-wrap items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-lg'>
        <div className='flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6'>
          <Icon name={icon as keyof typeof icons} size={20} className='sm:hidden' />
          <Icon name={icon as keyof typeof icons} size={24} className='hidden sm:block' />
        </div>
        <span className='text-base sm:text-lg md:text-xl truncate max-w-[15ch] sm:max-w-[20ch] md:max-w-full'>
          {name}
        </span>
      </h2>

      {isSignedInAndHasPermissionSection ? (
        <div className='flex items-center gap-4 mr-6'>
          <SectionItemDialog
            sectionId={sectionId}
            sectionType={sectionType}
            sectionName={sectionName}
            buttonText={buttonText}
            buttonColor={buttonColor}
            buttonTextColor={buttonTextColor}
            onSubmit={onSubmit}
          />
          <EditableSection sectionId={sectionId} sectionName={sectionName} onEdit={onEdit} />
          <DeletableSection sectionId={sectionId} sectionName={sectionName} onDelete={onDelete} />
        </div>
      ) : null}
    </div>
  )
}
