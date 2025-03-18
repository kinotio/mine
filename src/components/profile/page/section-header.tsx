import { icons } from 'lucide-react'

import { Icon } from '@/components/icon'
import { SectionItemDialog } from '@/components/profile/page/dialog'

import { DynamicObject } from '@/lib/utils'

interface SectionHeaderProps {
  sectionId: string
  name: string
  icon: string
  buttonText?: string
  buttonColor?: string
  buttonTextColor?: string
  sectionType: string
  sectionTitle: string
  onSubmit?: (userId: string, sectionId: string, data: DynamicObject) => Promise<void>
}

export const SectionHeader = ({
  sectionId,
  name,
  icon = 'Star',
  buttonText = 'Add Item',
  buttonColor = '#4cc9f0',
  buttonTextColor = 'black',
  sectionType,
  sectionTitle,
  onSubmit
}: SectionHeaderProps) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='font-black flex items-center gap-2'>
        <Icon name={icon as keyof typeof icons} size={24} />
        <span className='text-xl'>{name}</span>
      </h2>

      {onSubmit && (
        <SectionItemDialog
          sectionId={sectionId}
          sectionType={sectionType}
          sectionTitle={sectionTitle}
          buttonText={buttonText}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          onSubmit={onSubmit}
        />
      )}
    </div>
  )
}
