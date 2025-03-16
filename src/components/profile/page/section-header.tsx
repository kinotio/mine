import { Plus, icons } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/icon'

interface SectionHeaderProps {
  name: string
  icon: string
  buttonText?: string
  buttonColor?: string
  buttonTextColor?: string
  onButtonClick?: () => void
}

export const SectionHeader = ({
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
