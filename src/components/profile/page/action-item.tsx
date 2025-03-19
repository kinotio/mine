import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

interface ActionItemCardProps {
  canEdit: boolean // Controls if edit/delete UI is shown
  itemId: string // Unique identifier for the item
  sectionId: string // Section this item belongs to
  sectionName: string // Human-readable section name
  itemName: string // Human-readable item name
  onDelete: (itemId: string, sectionId: string) => void // Delete handler
  onEdit?: (itemId: string, sectionId: string, updatedData: Record<string, unknown>) => void // Edit handler
  editableFields?: Array<{
    // Fields configuration for editing
    key: string
    label: string
    type?: string
    defaultValue?: string | number
  }>
  metadata?: Record<string, unknown> // Current item data
  children: React.ReactNode // Card content
}

export const ActionItemCard: React.FC<ActionItemCardProps> = ({
  canEdit,
  itemId,
  sectionId,
  sectionName,
  itemName,
  onDelete,
  onEdit,
  editableFields,
  metadata,
  children
}) => {
  // State for dialog visibility
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)

  // State for edit form data
  const [formData, setFormData] = useState<Record<string, unknown>>(metadata || {})

  // Handle delete action
  const handleDelete = (): void => {
    onDelete(itemId, sectionId)
    setIsDeleteDialogOpen(false)
  }

  // Handle form field changes
  const handleChange = (key: string, value: string | number | File): void => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  // Handle edit submission
  const handleEdit = (): void => {
    if (onEdit) {
      onEdit(itemId, sectionId, formData)
      setIsEditDialogOpen(false)
    }
  }

  // If user doesn't have edit permission, just render the children
  if (!canEdit) return <>{children}</>

  return (
    <div className='group relative'>
      {children}

      {/* Edit/Delete buttons overlay */}
      <div className='absolute right-4 top-2 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100'>
        {/* Edit button - only shown if edit handler and fields are provided */}
        {onEdit && editableFields && (
          <Button
            variant='neutral'
            size='icon'
            className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ffcc29] hover:bg-[#ffc107]'
            aria-label='Edit item'
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Pencil className='h-4 w-4' />
          </Button>
        )}

        <Button
          variant='neutral'
          size='icon'
          className='font-bold border-[3px] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ff6b6b] hover:bg-[#ff5252]'
          aria-label='Delete item'
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>Delete {itemName}</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this {sectionName.toLowerCase()} item? This action
            cannot be undone.
          </p>
          <DialogFooter>
            <Button variant='neutral' onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className='bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit dialog with dynamic fields */}
      {onEdit && editableFields && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className='bg-white'>
            <DialogHeader>
              <DialogTitle>Edit {itemName}</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              {editableFields.map((field) => (
                <div key={field.key} className='space-y-2'>
                  <label htmlFor={field.key} className='text-sm font-medium'>
                    {field.label}
                  </label>
                  <Input
                    id={field.key}
                    type={field.type || 'text'}
                    value={(formData[field.key] as string) || field.defaultValue || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant='neutral' onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
