'use client'

import { useState, useEffect } from 'react'
import { Pencil } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

interface EditableSectionProps {
  sectionId: string
  sectionName: string
  onEdit: (sectionId: string, newName: string) => Promise<void>
  isLoading: boolean
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Section name cannot be empty' })
    .max(50, { message: 'Section name must be less than 50 characters' })
})

type FormValues = z.infer<typeof formSchema>

export const EditableSection = ({
  sectionId,
  sectionName,
  onEdit,
  isLoading
}: EditableSectionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: sectionName
    }
  })

  const handleSubmit = async (values: FormValues) => {
    if (values.name === sectionName) return setIsOpen(false)

    onEdit(sectionId, values.name).finally(() => {
      setIsOpen(false)
      form.reset({ name: sectionName })
    })
  }

  useEffect(() => form.reset({ name: sectionName }), [form, sectionName])

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <Button
        onClick={() => setIsOpen(true)}
        size='icon'
        className='font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[2px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-[#ffcc29] hover:bg-[#ffc107]'
        aria-label={`Edit ${sectionName} section`}
      >
        <Pencil size={16} />
      </Button>

      <DialogContent className='sm:max-w-[425px] bg-white'>
        <DialogHeader>
          <DialogTitle>Edit Section Name</DialogTitle>
          <DialogDescription>{`Change the name for your "${sectionName}" section.`}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4 py-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Enter section name' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className='pt-4 flex justify-end gap-3 border-t border-gray-200'>
              <Button
                type='button'
                onClick={() => setIsOpen(false)}
                variant='neutral'
                disabled={isLoading}
                className='border-2'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={isLoading}
                className='bg-[#ffcc29] hover:bg-[#ffc107] text-black'
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
