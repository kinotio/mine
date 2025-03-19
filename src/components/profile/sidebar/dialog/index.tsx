'use client'

import { useState, useEffect } from 'react'
import { Edit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { isEmpty } from 'lodash'

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

import { BasicInfo } from '@/components/profile/sidebar/dialog/forms/basic-info'
import { Bio } from '@/components/profile/sidebar/dialog/forms/bio'
import { Contact } from '@/components/profile/sidebar/dialog/forms/contact'
import {
  formSchema,
  basicInfoSchema,
  bioSchema,
  contactSchema,
  type FormSchema
} from '@/components/profile/sidebar/dialog/schemas'
import { useProfile } from '@/components/profile/provider'

import { getColorFromString, getTextColorForBackground } from '@/lib/colors'

import { updateProfile, saveFile, uploadFile } from '@/server/actions'

import { useToast } from '@/hooks/use-toast'
import { useEventEmitter } from '@/hooks/use-event'

export const ProfileDialogEdit = () => {
  const { profile, hasPermission, isSignedIn } = useProfile()
  const { toast } = useToast()
  const { emit } = useEventEmitter()

  // Dialog and tab state
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')

  // Location selection state
  const [countryOpen, setCountryOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')

  // Image preview state
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar_url)
  const [avatarFile, setAvatarFile] = useState<File>()

  const [bannerPreview, setBannerPreview] = useState(profile.banner_url)
  const [bannerFile, setBannerFile] = useState<File>()

  // Color state for avatar
  const [avatarColor, setAvatarColor] = useState('')
  const [textColor, setTextColor] = useState('#000000')

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate avatar color based on name
  useEffect(() => {
    if (isEmpty(profile.avatar_url)) {
      const color = getColorFromString(profile.name)
      setAvatarColor(color)
      setTextColor(getTextColorForBackground(color))
    }
  }, [profile.name, profile.avatar_url])

  // Initialize form
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      title: profile.title ?? '',
      location: profile.location ?? '',
      bio: profile.bio ?? '',
      email: profile.email,
      avatarUrl: profile.avatar_url ?? '',
      bannerUrl: profile.banner_url ?? '',
      website: profile.website ?? '',
      github: profile.github ?? '',
      x: profile.x ?? '',
      linkedin: profile.linkedin ?? '',
      bluesky: profile.bluesky ?? ''
    }
  })

  // Handlers
  const handleCountrySelect = (country: { value: string; label: string; flag: string }) => {
    setSelectedCountry(country.value)
    form.setValue('location', `${country.label}`, { shouldValidate: true })
    setCountryOpen(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setAvatarPreview(result)
        form.setValue('avatarUrl', result, { shouldValidate: true })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setBannerPreview(result)
        form.setValue('bannerUrl', result, { shouldValidate: true })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTabChange = (value: string) => {
    // Validate current tab before switching
    if (activeTab === 'basic') {
      const basicValid = basicInfoSchema.safeParse({
        name: form.getValues('name'),
        title: form.getValues('title'),
        location: form.getValues('location')
      })

      if (!basicValid.success) {
        form.trigger(['name', 'title', 'location'])
        return
      }
    } else if (activeTab === 'bio') {
      const bioValid = bioSchema.safeParse({
        bio: form.getValues('bio')
      })

      if (!bioValid.success) {
        form.trigger(['bio'])
        return
      }
    } else if (activeTab === 'contact') {
      const contactValid = contactSchema.safeParse({
        email: form.getValues('email'),
        website: form.getValues('website'),
        github: form.getValues('github'),
        x: form.getValues('x'),
        linkedin: form.getValues('linkedin'),
        bluesky: form.getValues('bluesky')
      })

      if (!contactValid.success) {
        form.trigger(['email', 'website', 'github', 'x', 'linkedin', 'bluesky'])
        return
      }
    }

    setActiveTab(value)
  }

  const handleFileUpload = async (
    file: File,
    bucket: 'avatars' | 'banners',
    updateField: 'avatar_url' | 'banner_url'
  ) => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('bucket', bucket)

    const { success, data } = await uploadFile(formData)

    if (success && data?.url) {
      await updateProfile(profile.id, { [updateField]: data.url })
      await saveFile({
        file_url: data.url,
        file_name: data.name,
        file_type: data.type,
        file_size: data.size.toString(),
        tag: bucket.slice(0, -1),
        user_profile_id: profile.id
      })
    }
  }

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true)

    try {
      // Update profile
      const profileResult = await updateProfile(profile.id, data)

      if (!profileResult.success) {
        toast({
          title: 'Profile Update Error',
          description: profileResult.error || 'Failed to update profile information',
          variant: 'destructive'
        })
        return
      }

      await handleFileUpload(avatarFile as File, 'avatars', 'avatar_url')
      await handleFileUpload(bannerFile as File, 'banners', 'banner_url')

      // If we got here, at least the profile update was successful
      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.'
      })

      emit('profile:updated', {})
      setOpen(false)
    } catch (error) {
      toast({
        title: 'Unexpected Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isSignedIn && hasPermission ? (
          <div className='absolute top-2 right-4 z-20'>
            <Button
              className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all h-10 w-10 p-0'
              aria-label='Edit Profile'
              onClick={() => setOpen(true)}
            >
              <Edit className='h-5 w-5' />
            </Button>
          </div>
        ) : null}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-black'>Edit Profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <Tabs value={activeTab} onValueChange={handleTabChange} className='w-full'>
              <TabsList className='grid grid-cols-3 mb-6 pb-12 border-[2px] border-black bg-white'>
                <TabsTrigger
                  value='basic'
                  className='font-bold data-[state=active]:bg-[#4cc9f0] data-[state=active]:text-black px-4 py-2'
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value='bio'
                  className='font-bold data-[state=active]:bg-[#8ac926] data-[state=active]:text-black px-4 py-2'
                >
                  Bio
                </TabsTrigger>
                <TabsTrigger
                  value='contact'
                  className='font-bold data-[state=active]:bg-[#f72585] data-[state=active]:text-white px-4 py-2'
                >
                  Contact & Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value='basic'>
                <BasicInfo
                  control={form.control}
                  avatarPreview={avatarPreview ?? ''}
                  bannerPreview={bannerPreview ?? ''}
                  avatarColor={avatarColor}
                  textColor={textColor}
                  profileBannerUrl={profile.banner_url ?? ''}
                  countryOpen={countryOpen}
                  selectedCountry={selectedCountry}
                  onCountryOpenChange={setCountryOpen}
                  onCountrySelect={handleCountrySelect}
                  onAvatarChange={handleAvatarChange}
                  onBannerChange={handleBannerChange}
                />
              </TabsContent>

              <TabsContent value='bio'>
                <Bio control={form.control} />
              </TabsContent>

              <TabsContent value='contact'>
                <Contact control={form.control} />
              </TabsContent>
            </Tabs>

            <div className='flex justify-end gap-3 pt-4 border-t-2 border-gray-200'>
              <Button
                type='button'
                variant='neutral'
                onClick={() => setOpen(false)}
                className='border-[2px] border-black font-bold hover:bg-gray-100'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[2px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
