'use client'

import { useState } from 'react'
import {
  Award,
  Briefcase,
  Code,
  GraduationCap,
  Lightbulb,
  PlusCircle,
  Trophy,
  Palette,
  BookOpen,
  Globe,
  Heart
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useToast } from '@/hooks/use-toast'

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

  const [open, setOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<SectionTemplate | null>(null)
  const [customName, setCustomName] = useState('')

  const sectionTemplates: SectionTemplate[] = [
    {
      id: 'projects',
      name: 'Projects',
      icon: <Code className='h-5 w-5' />,
      color: '#4cc9f0',
      description: 'Showcase your portfolio of work with images, descriptions, and links.'
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: <Lightbulb className='h-5 w-5' />,
      color: '#8ac926',
      description: 'Display your technical and professional skills with proficiency levels.'
    },
    {
      id: 'experience',
      name: 'Work Experience',
      icon: <Briefcase className='h-5 w-5' />,
      color: '#f72585',
      description:
        'List your professional experience with companies, positions, and responsibilities.'
    },
    {
      id: 'education',
      name: 'Education',
      icon: <GraduationCap className='h-5 w-5' />,
      color: '#7209b7',
      description: 'Share your educational background, degrees, and certifications.'
    },
    {
      id: 'certifications',
      name: 'Certifications',
      icon: <Award className='h-5 w-5' />,
      color: '#ff6b6b',
      description: "Highlight professional certifications and credentials you've earned."
    },
    {
      id: 'achievements',
      name: 'Achievements',
      icon: <Trophy className='h-5 w-5' />,
      color: '#ffde59',
      description: 'Showcase awards, recognition, and notable accomplishments.'
    },
    {
      id: 'portfolio',
      name: 'Design Portfolio',
      icon: <Palette className='h-5 w-5' />,
      color: '#fb5607',
      description: 'Display visual work like designs, illustrations, or photography.'
    },
    {
      id: 'publications',
      name: 'Publications',
      icon: <BookOpen className='h-5 w-5' />,
      color: '#3a86ff',
      description: 'List articles, papers, books, or other published works.'
    },
    {
      id: 'languages',
      name: 'Languages',
      icon: <Globe className='h-5 w-5' />,
      color: '#06d6a0',
      description: 'Show languages you speak with proficiency levels.'
    },
    {
      id: 'volunteer',
      name: 'Volunteer Work',
      icon: <Heart className='h-5 w-5' />,
      color: '#e63946',
      description: 'Highlight community service and volunteer experiences.'
    }
  ]

  const handleSelectTemplate = (template: SectionTemplate) => {
    setSelectedTemplate(template)
    setCustomName(template.name)
  }

  const handleAddSection = () => {
    if (selectedTemplate) {
      onAddSection(selectedTemplate.id, customName)
      toast({
        title: 'Section added',
        description: `${customName} section has been added to your profile.`
      })
      setOpen(false)
      setSelectedTemplate(null)
      setCustomName('')
    }
  }

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
                      {template.icon}
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
