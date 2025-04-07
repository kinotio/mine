import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { ExperienceFormProps } from '@/components/profile/page/dialog/types'

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ form, isLoading }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='company'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Company</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='position'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Position</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='period'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Period</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='2020 - Present'
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Description</FormLabel>
            <FormControl>
              <Textarea {...field} className='min-h-[100px] border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </>
  )
}
