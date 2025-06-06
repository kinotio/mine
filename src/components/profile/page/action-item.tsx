import { useState, useEffect, useRef } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'

import {
  ProjectForm,
  SkillForm,
  ExperienceForm,
  CertificationForm,
  EducationForm,
  AchievementForm,
  PortfolioForm,
  PublicationForm,
  LanguageForm,
  VolunteerForm,
  DefaultForm
} from '@/components/profile/page/dialog/forms'

import {
  projectSchema,
  skillSchema,
  experienceSchema,
  certificationSchema,
  educationSchema,
  achievementSchema,
  portfolioSchema,
  publicationSchema,
  languageSchema,
  volunteerSchema,
  defaultSchema
} from '@/components/profile/page/dialog/schemas'

interface ActionItemCardProps {
  canEditAndDelete: boolean
  itemId: string
  sectionId: string
  sectionName: string
  itemName: string
  sectionType: string
  onDelete: (itemId: string, sectionId: string) => Promise<void>
  onEdit: (itemId: string, sectionId: string, updatedData: Record<string, unknown>) => Promise<void>
  metadata: Record<string, unknown>
  children: React.ReactNode
  isLoading: boolean
}

// Function to get the appropriate schema - now returns any schema type
const getSchemaForType = (type: string) => {
  switch (type) {
    case 'projects':
      return projectSchema
    case 'skills':
      return skillSchema
    case 'experience':
      return experienceSchema
    case 'certifications':
      return certificationSchema
    case 'education':
      return educationSchema
    case 'achievements':
      return achievementSchema
    case 'portfolio':
      return portfolioSchema
    case 'publications':
      return publicationSchema
    case 'languages':
      return languageSchema
    case 'volunteer':
      return volunteerSchema
    default:
      return defaultSchema
  }
}

export const ActionItemCard: React.FC<ActionItemCardProps> = ({
  canEditAndDelete,
  itemId,
  sectionId,
  sectionName,
  itemName,
  sectionType,
  onDelete,
  onEdit,
  metadata,
  children,
  isLoading
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const hasImageChanged = useRef<boolean>(false)

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(getSchemaForType(sectionType) as z.ZodType<any>),
    defaultValues: metadata
  })

  // Initialize form when dialog opens - only run once when dialog opens
  useEffect(() => {
    if (isEditDialogOpen) {
      // Reset the image change tracker when dialog opens
      hasImageChanged.current = false
      setImageFile(null)

      // Clone the metadata
      const formData = { ...metadata }

      // Convert tags array to comma-separated string for the form
      if (sectionType === 'projects' && 'tags' in formData && Array.isArray(formData.tags)) {
        formData.tags = formData.tags.join(', ')
      }

      // Initialize image preview from metadata
      if ('image' in formData && formData.image && typeof formData.image === 'string') {
        setImagePreview(formData.image as string)
      } else {
        setImagePreview(null)
      }

      // Reset the form with the prepared data
      form.reset(formData as unknown)
    }
  }, [isEditDialogOpen, metadata, form, sectionType])

  // Handle image upload
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void }
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader.result as string

        // Mark that the image has been changed
        hasImageChanged.current = true

        // Store the File object separately
        setImageFile(file)

        // Update preview
        setImagePreview(result)

        // Store the data URL string in the form field
        // This is important - the form field should always be a string
        field.onChange(result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle delete action
  const handleDelete = async () => {
    await onDelete(itemId, sectionId)
    setIsDeleteDialogOpen(false)
  }

  // Handle form submission
  const handleSubmit = async (data: Record<string, unknown>) => {
    // Create a clone of the data to modify
    const submissionData = { ...data }

    // Convert tags string to array for projects
    if (
      sectionType === 'projects' &&
      'tags' in submissionData &&
      typeof submissionData.tags === 'string'
    ) {
      submissionData.tags = (submissionData.tags as string)
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0)
    }

    // If the image has been changed, use the stored File object for the submission
    if (hasImageChanged.current && 'image' in submissionData) {
      // If we have an actual File object stored, use it instead of the data URL
      if (imageFile) {
        submissionData.image = imageFile
      }
      // Otherwise keep the data URL that's already in the form
    }

    await onEdit(itemId, sectionId, submissionData)
    setIsEditDialogOpen(false)
  }

  // Render the appropriate form component
  const renderForm = () => {
    const formProps = {
      form,
      imagePreview,
      setImagePreview,
      handleImageUpload,
      isLoading
    }

    switch (sectionType) {
      case 'projects':
        return <ProjectForm {...formProps} />
      case 'skills':
        return <SkillForm {...formProps} />
      case 'experience':
        return <ExperienceForm {...formProps} />
      case 'certifications':
        return <CertificationForm {...formProps} />
      case 'education':
        return <EducationForm {...formProps} />
      case 'achievements':
        return <AchievementForm {...formProps} />
      case 'portfolio':
        return <PortfolioForm {...formProps} />
      case 'publications':
        return <PublicationForm {...formProps} />
      case 'languages':
        return <LanguageForm {...formProps} />
      case 'volunteer':
        return <VolunteerForm {...formProps} />
      default:
        return <DefaultForm {...formProps} />
    }
  }

  // If user doesn't have edit permission, just render the children
  if (!canEditAndDelete) return <>{children}</>

  return (
    <div className='group relative'>
      {children}

      {/* Edit/Delete buttons overlay */}
      <div className='absolute right-4 top-2 flex space-x-2 opacity-0 transition-opacity group-hover:opacity-100'>
        {/* Edit button */}
        <Button
          variant='neutral'
          size='icon'
          className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ffcc29] hover:bg-[#ffc107]'
          aria-label='Edit item'
          onClick={() => setIsEditDialogOpen(true)}
        >
          <Pencil className='h-4 w-4' />
        </Button>

        {/* Delete button */}
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

      {/* Edit dialog with form */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='bg-white max-w-lg'>
          <DialogHeader>
            <DialogTitle>Edit {itemName}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(handleSubmit)}>
              {renderForm()}

              <DialogFooter className='pt-4 flex justify-end gap-3 border-t border-gray-200'>
                <Button
                  type='button'
                  variant='neutral'
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  className='bg-[#4cc9f0] hover:bg-[#4361ee] text-white font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                  disabled={isLoading}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
