'use client'

import type React from 'react'

import { useState, useRef, useEffect } from 'react'
import { Check, Globe, Upload, Edit } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAuth } from '@clerk/nextjs'
import { isEmpty } from 'lodash'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { useProfile } from '@/components/profile/provider'

import { toast } from '@/hooks/use-toast'

import { cn } from '@/lib/utils'
import { getColorFromString, getTextColorForBackground } from '@/lib/colors'

// Sample list of countries with flags
const countries = [
  { value: 'us', label: 'United States', flag: '🇺🇸' },
  { value: 'ca', label: 'Canada', flag: '🇨🇦' },
  { value: 'gb', label: 'United Kingdom', flag: '🇬🇧' },
  { value: 'au', label: 'Australia', flag: '🇦🇺' },
  { value: 'de', label: 'Germany', flag: '🇩🇪' },
  { value: 'fr', label: 'France', flag: '🇫🇷' },
  { value: 'jp', label: 'Japan', flag: '🇯🇵' },
  { value: 'cn', label: 'China', flag: '🇨🇳' },
  { value: 'in', label: 'India', flag: '🇮🇳' },
  { value: 'br', label: 'Brazil', flag: '🇧🇷' },
  { value: 'mx', label: 'Mexico', flag: '🇲🇽' },
  { value: 'es', label: 'Spain', flag: '🇪🇸' },
  { value: 'it', label: 'Italy', flag: '🇮🇹' },
  { value: 'ru', label: 'Russia', flag: '🇷🇺' },
  { value: 'za', label: 'South Africa', flag: '🇿🇦' },
  { value: 'kr', label: 'South Korea', flag: '🇰🇷' },
  { value: 'sg', label: 'Singapore', flag: '🇸🇬' },
  { value: 'se', label: 'Sweden', flag: '🇸🇪' },
  { value: 'nl', label: 'Netherlands', flag: '🇳🇱' },
  { value: 'nz', label: 'New Zealand', flag: '🇳🇿' }
]

// Zod schemas for each tab
const basicInfoSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  title: z.string().min(2, { message: 'Title must be at least 2 characters' }),
  location: z.string().min(2, { message: 'Location is required' }),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional()
})

const bioSchema = z.object({
  bio: z.string().min(10, { message: 'Bio must be at least 10 characters' })
})

const contactSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  website: z.string().url({ message: 'Please enter a valid URL' }),
  github: z.string().min(1, { message: 'GitHub username is required' }),
  x: z.string().min(1, { message: 'X username is required' }),
  linkedin: z.string().min(1, { message: 'LinkedIn username is required' }),
  bluesky: z.string().min(1, { message: 'Bluesky username is required' })
})

// Combined schema
const formSchema = z.object({
  ...basicInfoSchema.shape,
  ...bioSchema.shape,
  ...contactSchema.shape
})

export const ProfileDialogEdit = () => {
  const { profile } = useProfile()
  const { isSignedIn } = useAuth()

  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  const [countryOpen, setCountryOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [avatarPreview, setAvatarPreview] = useState(profile.avatarUrl)
  const [bannerPreview, setBannerPreview] = useState(profile.bannerUrl)
  const [avatarColor, setAvatarColor] = useState('')
  const [textColor, setTextColor] = useState('#000000')

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const bannerInputRef = useRef<HTMLInputElement>(null)

  // Generate avatar color based on name
  useEffect(() => {
    const color = getColorFromString(profile.name)
    setAvatarColor(color)
    setTextColor(getTextColorForBackground(color))
  }, [profile.name])

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: profile.name,
      title: profile.title,
      location: profile.location,
      bio: profile.bio,
      email: profile.email,
      avatarUrl: profile.avatarUrl,
      bannerUrl: profile.bannerUrl,
      website: profile.website,
      github: profile.github,
      x: profile.x,
      linkedin: profile.linkedin,
      bluesky: profile.bluesky
    }
  })

  // Handle country selection
  const selectCountry = (country: { value: string; label: string; flag: string }) => {
    setSelectedCountry(country.value)
    form.setValue('location', `${country.label}`, { shouldValidate: true })
    setCountryOpen(false)
  }

  // Handle image uploads
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setBannerPreview(result)
        form.setValue('bannerUrl', result, { shouldValidate: true })
      }
      reader.readAsDataURL(file)
    }
  }

  // Form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Combine form data with banner preview
    const updatedData = {
      ...data,
      banner: bannerPreview
    }

    handleSave(updatedData)

    toast({
      title: 'Profile updated',
      description: 'Your profile has been successfully updated.'
    })
    setOpen(false)
  }

  // Tab navigation with validation
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

  const handleSave = (updatedData: unknown) => {
    // server action to save profile data
    console.log(updatedData)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isSignedIn ? (
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

              <TabsContent value='basic' className='space-y-4'>
                {/* Banner Upload */}
                <div className='mb-6'>
                  <Label className='font-bold mb-2 block'>Banner Image</Label>
                  <div
                    className='w-full h-[100px] border-[2px] border-black relative bg-cover bg-center group cursor-pointer'
                    style={{ backgroundImage: `url(${bannerPreview})` }}
                    onClick={() => bannerInputRef.current?.click()}
                  >
                    <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Upload className='h-6 w-6 text-white' />
                    </div>
                    <input
                      type='file'
                      ref={bannerInputRef}
                      className='hidden'
                      accept='image/*'
                      onChange={handleBannerChange}
                    />
                  </div>
                </div>

                {/* Avatar Upload */}
                <div className='flex items-center gap-4 mb-6'>
                  <div
                    className='relative cursor-pointer group'
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Avatar className='w-20 h-20 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
                      {isEmpty(avatarPreview) ? (
                        <AvatarFallback
                          style={{ backgroundColor: avatarColor, color: textColor }}
                          className='text-3xl font-bold'
                        >
                          {form
                            .getValues('name')
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      ) : (
                        <AvatarImage src={avatarPreview} />
                      )}
                    </Avatar>
                    <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                      <Upload className='h-5 w-5 text-white' />
                    </div>
                    <input
                      type='file'
                      ref={avatarInputRef}
                      className='hidden'
                      accept='image/*'
                      onChange={handleAvatarChange}
                    />
                  </div>
                  <div>
                    <h3 className='font-bold'>Profile Picture</h3>
                    <p className='text-sm text-gray-500'>Click to upload a new avatar</p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Name</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Title</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Location</FormLabel>
                      <div className='flex gap-2'>
                        <FormControl>
                          <Input {...field} className='border-[2px] border-black flex-1' />
                        </FormControl>
                        <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant='neutral'
                              role='combobox'
                              aria-expanded={countryOpen}
                              className='border-[2px] border-black w-[50px] p-0'
                            >
                              <Globe className='h-5 w-5' />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className='w-[300px] p-0 border-[2px] border-black'>
                            <Command>
                              <CommandInput
                                placeholder='Search country...'
                                className='h-9 border-b-[2px] border-black'
                              />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup className='max-h-[300px] overflow-auto'>
                                  {countries.map((country) => (
                                    <CommandItem
                                      key={country.value}
                                      value={country.value}
                                      onSelect={() => selectCountry(country)}
                                      className='flex items-center gap-2 cursor-pointer hover:bg-[#f0f0f0]'
                                    >
                                      <span className='text-lg'>{country.flag}</span>
                                      <span>{country.label}</span>
                                      <Check
                                        className={cn(
                                          'ml-auto h-4 w-4',
                                          selectedCountry === country.value
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='bio' className='space-y-4'>
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>About Me</FormLabel>
                      <FormControl>
                        <Textarea {...field} className='min-h-[200px] border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value='contact' className='space-y-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='website'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type='email' className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='github'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>GitHub</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='x'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Twitter</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='linkedin'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>LinkedIn</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='bluesky'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>Bluesky</FormLabel>
                      <FormControl>
                        <Input {...field} className='border-[2px] border-black' />
                      </FormControl>
                      <FormMessage className='text-[#ff6b6b] font-medium' />
                    </FormItem>
                  )}
                />
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
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
