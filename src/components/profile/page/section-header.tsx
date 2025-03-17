import { icons } from 'lucide-react'

import { Icon } from '@/components/icon'
import { AddItemDialog } from '@/components/profile/page/dialog'

interface SectionHeaderProps {
  name: string
  icon: string
  buttonText?: string
  buttonColor?: string
  buttonTextColor?: string
  sectionType: string
  sectionTitle: string
  onButtonClick?: () => void
}

export const SectionHeader = ({
  name,
  icon = 'Star',
  buttonText = 'Add Item',
  buttonColor = '#4cc9f0',
  buttonTextColor = 'black',
  sectionType,
  sectionTitle,
  onButtonClick
}: SectionHeaderProps) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h2 className='font-black flex items-center gap-2'>
        <Icon name={icon as keyof typeof icons} size={24} />
        <span className='text-xl'>{name}</span>
      </h2>

      {onButtonClick && (
        <AddItemDialog
          sectionType={sectionType}
          sectionTitle={sectionTitle}
          buttonText={buttonText}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
        />
      )}
    </div>
  )
}
