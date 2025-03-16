'use client'

import { useState, useEffect } from 'react'
import { PlusCircle, icons } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icon'

import { useToast } from '@/hooks/use-toast'
import { useProfile } from '@/components/profile/provider'
import { useEventEmitter } from '@/hooks/use-event'

import { getProfileSectionTemplates, createProfileSection } from '@/server/actions/profile'

interface SectionTemplate {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  description: string
}

interface AddSectionDialogProps {
  onAddSection: (sectionType: string, sectionName: string) => void
  trigger?: React.ReactNode
}

export const AddSectionDialog = ({ onAddSection, trigger }: AddSectionDialogProps) => {
  const { toast } = useToast()
  const { profile } = useProfile()
  const { emit } = useEventEmitter()

  const [open, setOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<SectionTemplate | null>(null)
  const [customName, setCustomName] = useState('')
  const [sectionTemplates, setSectionTemplates] = useState<SectionTemplate[]>([])

  const handleSelectTemplate = (template: SectionTemplate) => {
    setSelectedTemplate(template)
    setCustomName(template.name)
  }

  const handleAddSection = async () => {
    if (selectedTemplate) {
      onAddSection(selectedTemplate.id, customName)

      // Create the section to the user's profile
      createProfileSection(profile.id, selectedTemplate.id, customName)
        .then(({ success, error }) => {
          if (success) {
            toast({
              title: 'Section added',
              description: 'The section has been added to your profile.'
            })
          }

          if (error) {
            console.log(error)
            toast({
              title: 'Error',
              description: error,
              variant: 'destructive'
            })
          }
        })
        .finally(() => {
          emit('profile:updated', {})
          setOpen(false)
          setSelectedTemplate(null)
          setCustomName('')
        })
    }
  }

  useEffect(() => {
    if (open) {
      getProfileSectionTemplates()
        .then(({ data }) => setSectionTemplates(data as SectionTemplate[]))
        .catch((error) => console.error(error))
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className='w-full bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'>
            <PlusCircle className='mr-2 h-5 w-5' /> Add New Section
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Add New Section</DialogTitle>
        </DialogHeader>

        <div className='mt-4'>
          {!selectedTemplate ? (
            <>
              <p className='mb-4'>Choose a section type to add to your profile:</p>
              <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {sectionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className='border-[3px] border-black p-4 cursor-pointer hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                    style={{ backgroundColor: `${template.color}20` }}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <div
                      className='w-10 h-10 rounded-full flex items-center justify-center mb-2 border-[2px] border-black'
                      style={{ backgroundColor: template.color }}
                    >
                      <Icon name={template.icon as keyof typeof icons} size={16} />
                    </div>
                    <h3 className='font-bold'>{template.name}</h3>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='space-y-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center border-[3px] border-black'
                  style={{ backgroundColor: selectedTemplate.color }}
                >
                  {selectedTemplate.icon}
                </div>
                <div>
                  <h3 className='font-bold text-lg'>{selectedTemplate.name}</h3>
                  <p className='text-sm text-gray-600'>{selectedTemplate.description}</p>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='font-bold'>Section Name</label>
                <Input
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className='border-[3px] border-black focus-visible:ring-0 focus-visible:ring-offset-0'
                  placeholder='Enter section name'
                />
              </div>

              <div className='pt-4 flex gap-3 justify-end'>
                <Button
                  variant='neutral'
                  onClick={() => setSelectedTemplate(null)}
                  className='border-[2px] border-black font-bold'
                >
                  Back
                </Button>
                <Button
                  onClick={handleAddSection}
                  className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                  disabled={!customName.trim()}
                >
                  Add Section
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
