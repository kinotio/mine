import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { EducationFormProps } from '@/components/profile/page/dialog/types'

export const EducationForm: React.FC<EducationFormProps> = ({ form, isLoading }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='institution'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Institution</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' disabled={isLoading} />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='degree'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Degree</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' disabled={isLoading} />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='period'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Period</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='2016 - 2020'
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='description'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                className='min-h-[100px] border-[2px] border-black'
                disabled={isLoading}
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </>
  )
}
