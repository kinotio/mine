'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { useProfile } from '@/components/profile/provider'

interface DeletableSectionProps {
  sectionId: string
  sectionName: string
  onDelete: (userId: string, sectionId: string) => Promise<void>
}

export function DeletableSection({ sectionId, sectionName, onDelete }: DeletableSectionProps) {
  const { user } = useProfile()

  const [isOpen, setIsOpen] = useState(false)

  const handleDelete = () => onDelete(user.id, sectionId).finally(() => setIsOpen(false))

  return (
    <div className='group relative'>
      <Button
        variant='neutral'
        size='icon'
        className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ff6b6b] hover:bg-[#ff5252]'
        aria-label='Delete item'
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className='h-4 w-4' />
      </Button>

      {/* Delete confirmation dialog embedded directly */}
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className='sm:max-w-[425px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white'>
          <DialogHeader>
            <DialogTitle className='text-2xl font-black'>Delete {sectionName}</DialogTitle>
          </DialogHeader>

          <div className='py-4'>
            <p>Are you sure you want to delete your {sectionName} section?</p>
            <p className='mt-2 text-sm text-red-500'>This action cannot be undone.</p>
          </div>

          <div className='flex justify-end gap-3 pt-4 border-t border-gray-200'>
            <Button
              type='button'
              variant='neutral'
              onClick={() => setIsOpen(false)}
              className='border-[2px] border-black font-bold'
            >
              Cancel
            </Button>
            <Button
              type='button'
              variant='neutral'
              onClick={handleDelete}
              className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all bg-red-500 hover:bg-red-600'
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
