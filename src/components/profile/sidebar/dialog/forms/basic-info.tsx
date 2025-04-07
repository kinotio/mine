import type { Control } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AvatarUpload } from '@/components/profile/sidebar/dialog/forms/avatar-upload'
import { BannerUpload } from '@/components/profile/sidebar/dialog/forms/banner-upload'
import type { FormSchema } from '@/components/profile/sidebar/dialog/schemas'

interface BasicInfoProps {
  control: Control<FormSchema>
  avatarPreview: string
  bannerPreview: string
  avatarColor: string
  textColor: string
  profileBannerUrl: string
  countryOpen: boolean
  selectedCountry: string
  onCountryOpenChange: (open: boolean) => void
  onCountrySelect: (country: { value: string; label: string; flag: string }) => void
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
}

export const BasicInfo = ({
  control,
  avatarPreview,
  bannerPreview,
  avatarColor,
  textColor,
  profileBannerUrl,
  onAvatarChange,
  onBannerChange,
  isLoading
}: BasicInfoProps) => {
  return (
    <div className='space-y-4'>
      <BannerUpload
        bannerPreview={bannerPreview}
        avatarColor={avatarColor}
        profileBannerUrl={profileBannerUrl}
        onBannerChange={onBannerChange}
      />

      <AvatarUpload
        avatarPreview={avatarPreview}
        avatarColor={avatarColor}
        textColor={textColor}
        name={control._formValues.name}
        onAvatarChange={onAvatarChange}
      />

      <FormField
        control={control}
        name='name'
        disabled={isLoading}
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
        control={control}
        name='title'
        disabled={isLoading}
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
        control={control}
        name='location'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Location</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black flex-1' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </div>
  )
}
