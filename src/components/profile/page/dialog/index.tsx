'use client'

import { useState, ChangeEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, ControllerRenderProps, Resolver } from 'react-hook-form'
import { Plus } from 'lucide-react'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { getFormConfig } from '@/components/profile/page/dialog/utils'
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
  ProjectFormProps,
  SkillFormProps,
  ExperienceFormProps,
  CertificationFormProps,
  EducationFormProps,
  AchievementFormProps,
  PortfolioFormProps,
  PublicationFormProps,
  LanguageFormProps,
  VolunteerFormProps,
  DefaultFormProps,
  ProjectFormValues,
  CertificationFormValues,
  PortfolioFormValues
} from '@/components/profile/page/dialog/types'

import { DynamicObject } from '@/lib/utils'

interface SectionItemDialogProps {
  sectionId: string
  sectionType: string
  sectionName: string
  buttonText: string
  buttonColor: string
  buttonTextColor?: string
  onSubmit: (sectionId: string, data: DynamicObject) => Promise<void>
  trigger?: React.ReactNode
}

export const SectionItemDialog = ({
  sectionId,
  sectionType,
  sectionName,
  buttonColor,
  buttonText,
  buttonTextColor = 'black',
  onSubmit,
  trigger
}: SectionItemDialogProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { schema, defaultValues } = getFormConfig(sectionType)

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    // @ts-expect-error - Dynamic schema type that TypeScript can't infer correctly
    resolver: zodResolver(schema) as Resolver<FormValues, unknown>,
    defaultValues: defaultValues as FormValues
  })

  // Create a generic function that can handle different form types
  const createImageUploadHandler =
    <T extends { image?: string }>() =>
    (e: ChangeEvent<HTMLInputElement>, field: ControllerRenderProps<T>): void => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setImagePreview(result)
          field.onChange(result)
          form.setValue('image', result, { shouldValidate: true })
        }
        reader.readAsDataURL(file)
      }
    }

  // Create typed image handlers by providing the generic type parameter
  const projectImageHandler = createImageUploadHandler<ProjectFormValues>()
  const certificationImageHandler = createImageUploadHandler<CertificationFormValues>()
  const portfolioImageHandler = createImageUploadHandler<PortfolioFormValues>()

  // Handle form submission
  const handleSubmit = (values: FormValues) => {
    const data = { ...values } as DynamicObject

    if (sectionType === 'projects' && 'tags' in data && typeof data.tags === 'string') {
      data.tags = (data.tags as string).split(',').map((tag: string) => tag.trim())
    }

    setIsLoading(true)

    onSubmit(sectionId, data).finally(() => {
      setOpen(false)
      form.reset(defaultValues as FormValues)
      setImagePreview(null)
      setIsLoading(false)
    })
  }

  // Render form based on section type
  const renderForm = () => {
    switch (sectionType) {
      case 'projects':
        return (
          <ProjectForm
            form={form as ProjectFormProps['form']}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleImageUpload={projectImageHandler}
          />
        )
      case 'skills':
        return <SkillForm form={form as SkillFormProps['form']} />
      case 'experience':
        return <ExperienceForm form={form as ExperienceFormProps['form']} />
      case 'certifications':
        return (
          <CertificationForm
            form={form as CertificationFormProps['form']}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleImageUpload={certificationImageHandler}
          />
        )
      case 'education':
        return <EducationForm form={form as EducationFormProps['form']} />
      case 'achievements':
        return <AchievementForm form={form as AchievementFormProps['form']} />
      case 'portfolio':
        return (
          <PortfolioForm
            form={form as PortfolioFormProps['form']}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
            handleImageUpload={portfolioImageHandler}
          />
        )
      case 'publications':
        return <PublicationForm form={form as PublicationFormProps['form']} />
      case 'languages':
        return <LanguageForm form={form as LanguageFormProps['form']} />
      case 'volunteer':
        return <VolunteerForm form={form as VolunteerFormProps['form']} />
      default:
        return <DefaultForm form={form as DefaultFormProps['form']} />
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
            style={{
              backgroundColor: buttonColor,
              color: buttonTextColor === 'black' ? 'black' : 'white'
            }}
          >
            <Plus className='mr-2 h-5 w-5' />
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Add to {sectionName}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 mt-4'>
            {renderForm()}

            <div className='pt-4 flex justify-end gap-3 border-t border-gray-200'>
              <Button
                type='button'
                variant='neutral'
                onClick={() => setOpen(false)}
                className='border-[2px] border-black font-bold'
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                style={{
                  backgroundColor: buttonColor,
                  color: buttonTextColor === 'black' ? 'black' : 'white'
                }}
                disabled={isLoading}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
