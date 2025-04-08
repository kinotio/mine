'use client'

import { useState, useEffect } from 'react'
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
import { useProfile } from '@/components/profile/provider'
import { useEventEmitter } from '@/hooks/use-event'

import { General } from '@/components/profile/page/dialog/settings/tabs/general'
import { Resume } from '@/components/profile/page/dialog/settings/tabs/resume'

import {
  SettingsFormData,
  SettingsProps,
  GeneralSettingKey,
  ResumeSettingKey
} from '@/components/profile/page/dialog/settings/types'

import { createOrUpdateSettings } from '@/server/actions'

const visibleTabs = [
  { id: 'general', label: 'General' },
  { id: 'resume', label: 'Resume' }
]

const tabColors = {
  general: '#4cc9f0',
  resume: '#f72585'
}

// Type definition for metadata structure
type ProfileSettings = {
  general?: {
    showPreviewResume?: boolean
    showDownloadButton?: boolean
  }
  resume?: {
    showEducation?: boolean
    showVolunteer?: boolean
    showLanguages?: boolean
    showSkills?: boolean
    showProjects?: boolean
    showPortfolio?: boolean
    showExperience?: boolean
    showPublications?: boolean
    showCertifications?: boolean
    showAchievements?: boolean
  }
}

export const Settings = ({ trigger }: SettingsProps) => {
  const { toast } = useToast()
  const { profile, user } = useProfile()
  const { emit } = useEventEmitter()

  // Dialog and tab state
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(false)

  // Get settings from profile with safe fallbacks
  const getProfileSetting = <T extends boolean>(
    metadata: ProfileSettings | undefined | null,
    path: string,
    defaultValue: T
  ): T => {
    if (!metadata) return defaultValue

    const parts = path.split('.')
    const section = parts[0] as keyof ProfileSettings
    const setting = parts[1] as string

    if (!metadata[section]) return defaultValue

    const sectionData = metadata[section]
    if (!sectionData) return defaultValue

    // Access the setting directly using the setting name
    const value = sectionData[setting as keyof typeof sectionData]
    return (value !== undefined ? value : defaultValue) as T
  }

  // Initialize form with values from the profile
  const form = useForm<SettingsFormData>({
    defaultValues: {
      general: {
        showPreviewResume: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'general.showPreviewResume',
          true
        ),
        showDownloadButton: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'general.showDownloadButton',
          true
        )
      },
      resume: {
        showEducation: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showEducation',
          true
        ),
        showVolunteer: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showVolunteer',
          true
        ),
        showLanguages: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showLanguages',
          true
        ),
        showSkills: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showSkills',
          true
        ),
        showProjects: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showProjects',
          true
        ),
        showPortfolio: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showPortfolio',
          true
        ),
        showExperience: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showExperience',
          true
        ),
        showPublications: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showPublications',
          true
        ),
        showCertifications: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showCertifications',
          true
        ),
        showAchievements: getProfileSetting(
          profile?.user_profile_settings?.metadata as ProfileSettings | undefined,
          'resume.showAchievements',
          true
        )
      }
    }
  })

  // Update form values when profile changes
  useEffect(() => {
    if (profile?.user_profile_settings?.metadata) {
      const metadata = profile.user_profile_settings.metadata as ProfileSettings

      form.reset({
        general: {
          showPreviewResume: getProfileSetting(metadata, 'general.showPreviewResume', true),
          showDownloadButton: getProfileSetting(metadata, 'general.showDownloadButton', true)
        },
        resume: {
          showCertifications: getProfileSetting(metadata, 'resume.showCertifications', true),
          showEducation: getProfileSetting(metadata, 'resume.showEducation', true),
          showExperience: getProfileSetting(metadata, 'resume.showExperience', true),
          showLanguages: getProfileSetting(metadata, 'resume.showLanguages', true),
          showSkills: getProfileSetting(metadata, 'resume.showSkills', true),
          showVolunteer: getProfileSetting(metadata, 'resume.showVolunteer', true),
          showProjects: getProfileSetting(metadata, 'resume.showProjects', true),
          showPortfolio: getProfileSetting(metadata, 'resume.showPortfolio', true),
          showAchievements: getProfileSetting(metadata, 'resume.showAchievements', true),
          showPublications: getProfileSetting(metadata, 'resume.showPublications', true)
        }
      })
    }
  }, [profile, form])

  // Handlers for each tab section
  const handleGeneralSettingChange = (setting: GeneralSettingKey, checked: boolean) => {
    form.setValue(`general.${setting}`, checked, { shouldValidate: true })
  }

  const handleResumeSettingChange = (setting: ResumeSettingKey, checked: boolean) => {
    form.setValue(`resume.${setting}`, checked, { shouldValidate: true })
  }

  const handleTabChange = (value: string) => setActiveTab(value)

  // Save settings
  const onSubmit = async (data: SettingsFormData) => {
    // Ensure we have the required profile and user IDs
    if (!profile?.id || !user?.id) {
      toast({
        title: 'Error',
        description: 'Missing profile or user information',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      // Save settings to the database
      const result = await createOrUpdateSettings(user.id, profile.id, data)

      if (result.success) {
        toast({
          title: 'Settings saved',
          description: 'Your settings have been saved successfully.'
        })

        emit('profile:updated', {})

        // Close the dialog
        setOpen(false)
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to save settings',
          variant: 'destructive'
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while saving settings'

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive'
      })

      console.error('Failed to save settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle dialog
  const handleDialogChange = (newOpen: boolean) => setOpen(newOpen)

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
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
                    className={`font-bold data-[state=active]:bg-[${tabColors[tab.id as keyof typeof tabColors]}] data-[state=active]:text-black px-4 py-2`}
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

              <TabsContent value='resume'>
                <Resume
                  settings={form.watch('resume')}
                  onSettingChange={handleResumeSettingChange}
                />
              </TabsContent>
            </Tabs>

            <div className='flex justify-end gap-3 pt-4 border-t-2 border-gray-200'>
              <Button
                type='button'
                variant='neutral'
                onClick={() => setOpen(false)}
                className='border-[2px] border-black font-bold hover:bg-gray-100'
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
