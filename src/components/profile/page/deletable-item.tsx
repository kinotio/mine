'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

interface DeletableProps {
  canDelete: boolean
  itemId: string
  sectionId: string
  sectionName: string
  itemName: string
  onDelete: (itemId: string, sectionId: string) => Promise<void>
  children: React.ReactNode
}

export const DeletableItem = ({
  canDelete,
  itemId,
  sectionId,
  itemName,
  sectionName,
  onDelete,
  children
}: DeletableProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className='group relative'>
      <div className='absolute top-2 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            {canDelete ? (
              <Button
                variant='neutral'
                size='icon'
                className='h-8 w-8 border-[2px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ff6b6b] hover:bg-[#ff5252]'
                aria-label='Delete item'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            ) : null}
          </AlertDialogTrigger>
          <AlertDialogContent className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-xl font-black'>Delete Item</AlertDialogTitle>
              <AlertDialogDescription>
                {`Are you sure you want to delete "${itemName}" from the ${sectionName} section? This action cannot be undone.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className='border-[2px] border-black font-bold'>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className='bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                onClick={() => onDelete(itemId, sectionId)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {children}
    </div>
  )
}
