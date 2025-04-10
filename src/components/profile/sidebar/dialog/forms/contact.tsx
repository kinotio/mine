import type { Control } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { FormSchema } from '@/components/profile/sidebar/dialog/schemas'

interface ContactProps {
  control: Control<FormSchema>
  isLoading: boolean
}

export const Contact = ({ control, isLoading }: ContactProps) => {
  const { setError } = useFormContext()

  // Extra validation for social media URLs
  const validateSocialInput = (value: string, field: string) => {
    if (value.includes('https') || value.includes('www') || value.includes('://')) {
      setError(field, {
        type: 'manual',
        message: 'Please enter only your username, not the full URL'
      })
      return false
    }
    return true
  }

  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name='email'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type='email'
                className='border-[2px] border-black'
                placeholder='youremail@example.com'
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='website'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Website</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Enter your full website URL (e.g., https://example.com)'
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='github'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>GitHub</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Enter username only (e.g., johndoe)'
                onChange={(e) => {
                  const value = e.target.value
                  if (validateSocialInput(value, 'github')) {
                    field.onChange(value)
                  }
                }}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='x'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>X (Twitter)</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Enter username without @ (e.g., johndoe)'
                onChange={(e) => {
                  const value = e.target.value
                  if (validateSocialInput(value, 'x')) {
                    field.onChange(value)
                  }
                }}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='linkedin'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>LinkedIn</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Enter username only (e.g., john-doe)'
                onChange={(e) => {
                  const value = e.target.value
                  if (validateSocialInput(value, 'linkedin')) {
                    field.onChange(value)
                  }
                }}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name='bluesky'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Bluesky</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Enter handle only (e.g., johndoe.bsky.social)'
                onChange={(e) => {
                  const value = e.target.value
                  if (validateSocialInput(value, 'bluesky')) {
                    field.onChange(value)
                  }
                }}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </div>
  )
}
