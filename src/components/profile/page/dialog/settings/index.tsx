'use client'

import { useState } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import { useToast } from '@/hooks/use-toast'

import { General } from '@/components/profile/page/dialog/settings/tabs/general'
// import { Preview } from '@/components/profile/page/dialog/settings/tabs/preview'
// import { Download } from '@/components/profile/page/dialog/settings/tabs/download'
// import { Sections } from '@/components/profile/page/dialog/settings/tabs/sections'

interface SettingsProps {
  trigger?: React.ReactNode
}

// Define a schema for the form data
interface SettingsFormData {
  general: {
    showPreviewResume: boolean
    showDownloadButton: boolean
  }
  // preview: {
  //   showContactInfo: boolean
  //   showSocialLinks: boolean
  //   showProfilePhoto: boolean
  //   enablePrint: boolean
  // }
  // download: {
  //   includeCoverLetter: boolean
  //   highResolution: boolean
  //   includePortfolio: boolean
  //   fileFormat: 'pdf' | 'docx' | 'both'
  // }
  // sections: {
  //   skills: boolean
  //   experience: boolean
  //   education: boolean
  //   projects: boolean
  //   certifications: boolean
  //   achievements: boolean
  //   publications: boolean
  //   languages: boolean
  //   volunteer: boolean
  // }
}

const visibleTabs = [
  { id: 'general', label: 'General' }
  // { id: 'preview', label: 'Preview' }
  // { id: 'download', label: 'Download' },
  // { id: 'sections', label: 'Sections' }
]

export const Settings = ({ trigger }: SettingsProps) => {
  const { toast } = useToast()

  // Dialog and tab state
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  // Initialize form with default values
  const form = useForm<SettingsFormData>({
    defaultValues: {
      general: {
        showPreviewResume: true,
        showDownloadButton: true
      }
      // preview: {
      //   showContactInfo: true,
      //   showSocialLinks: true,
      //   showProfilePhoto: true,
      //   enablePrint: true
      // }
      // download: {
      //   includeCoverLetter: false,
      //   highResolution: true,
      //   includePortfolio: false,
      //   fileFormat: 'pdf'
      // },
      // sections: {
      //   skills: true,
      //   experience: true,
      //   education: true,
      //   projects: true,
      //   certifications: true,
      //   achievements: false,
      //   publications: false,
      //   languages: true,
      //   volunteer: false
      // }
    }
  })

  // Handlers for each tab section
  const handleGeneralSettingChange = (setting: string, checked: boolean) => {
    form.setValue(`general.${setting}` as any, checked, { shouldValidate: true })
  }

  // const handlePreviewSettingChange = (setting: string, checked: boolean) => {
  //   form.setValue(`preview.${setting}` as any, checked, { shouldValidate: true })
  // }

  // const handleDownloadSettingChange = (setting: string, value: unknown) => {
  //   form.setValue(`download.${setting}` as any, value, { shouldValidate: true })
  // }

  // const handleSectionVisibilityChange = (section: string, checked: boolean) => {
  //   form.setValue(`sections.${section}` as any, checked, { shouldValidate: true })
  // }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Reset settings to defaults
  const resetSettings = () => {
    form.reset({
      general: {
        showPreviewResume: true,
        showDownloadButton: true
      }
      // preview: {
      //   showContactInfo: true,
      //   showSocialLinks: true,
      //   showProfilePhoto: true,
      //   enablePrint: true
      // }
      // download: {
      //   includeCoverLetter: false,
      //   highResolution: true,
      //   includePortfolio: false,
      //   fileFormat: 'pdf'
      // },
      // sections: {
      //   skills: true,
      //   experience: true,
      //   education: true,
      //   projects: true,
      //   certifications: true,
      //   achievements: false,
      //   publications: false,
      //   languages: true,
      //   volunteer: false
      // }
    })

    toast({
      title: 'Settings reset',
      description: 'Your settings have been reset to defaults.'
    })
  }

  // Save settings
  const onSubmit = (data: SettingsFormData) => {
    // In a real app, you would save these settings to a database or local storage
    console.log('Settings saved:', data)

    toast({
      title: 'Settings saved',
      description: 'Your settings have been saved successfully.'
    })

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant='reverse' className='bg-white'>
            <SettingsIcon className='h-5 w-5' />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Settings</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
              <TabsList
                className='mb-6 pb-12 border-[2px] border-black bg-white'
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${visibleTabs.length}, minmax(0, 1fr))`
                }}
              >
                {visibleTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className='font-bold data-[state=active]:bg-[#4cc9f0] data-[state=active]:text-black px-4 py-2'
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value='general'>
                <General
                  settings={form.watch('general')}
                  onSettingChange={handleGeneralSettingChange}
                />
              </TabsContent>

              {/* <TabsContent value='preview'>
                <Preview
                  settings={form.watch('preview')}
                  onSettingChange={handlePreviewSettingChange}
                />
              </TabsContent> */}

              {/* <TabsContent value='download'>
                <Download
                  settings={form.watch('download')}
                  onSettingChange={handleDownloadSettingChange}
                />
              </TabsContent> */}

              {/* <TabsContent value='sections'>
                <Sections
                  settings={form.watch('sections')}
                  onSettingChange={handleSectionVisibilityChange}
                />
              </TabsContent> */}
            </Tabs>

            <div className='flex justify-end gap-3 pt-4 border-t-2 border-gray-200'>
              <Button
                type='button'
                variant='neutral'
                onClick={resetSettings}
                className='border-[2px] border-black font-bold hover:bg-gray-100'
              >
                Reset
              </Button>
              <Button
                type='submit'
                className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
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
