import type { Control } from 'react-hook-form'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { FormSchema } from '@/components/profile/dialog/schemas'

interface ContactProps {
  control: Control<FormSchema>
}

export const Contact = ({ control }: ContactProps) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={control}
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
        control={control}
        name='website'
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
        control={control}
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
        control={control}
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
    </div>
  )
}
