import type { Control } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { FormSchema } from '@/components/profile/sidebar/dialog/schemas'

interface ContactProps {
  control: Control<FormSchema>
  isLoading: boolean
}

export const Contact = ({ control, isLoading }: ContactProps) => {
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
              <Input {...field} type='email' className='border-[2px] border-black' />
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
              <Input {...field} className='border-[2px] border-black' />
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
              <Input {...field} className='border-[2px] border-black' />
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
            <FormLabel className='font-bold'>X</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
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
              <Input {...field} className='border-[2px] border-black' />
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
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </div>
  )
}
