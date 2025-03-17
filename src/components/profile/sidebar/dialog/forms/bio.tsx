import type { Control } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import type { FormSchema } from '@/components/profile/sidebar/dialog/schemas'

interface BioProps {
  control: Control<FormSchema>
}

export const Bio = ({ control }: BioProps) => {
  return (
    <div className='space-y-4'>
      <FormField
        control={control}
        name='bio'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Bio</FormLabel>
            <FormControl>
              <Textarea {...field} className='min-h-[200px] border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </div>
  )
}
