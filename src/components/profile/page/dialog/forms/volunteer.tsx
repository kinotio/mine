import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { VolunteerFormProps } from '@/components/profile/page/dialog/types'

export const VolunteerForm: React.FC<VolunteerFormProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='organization'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Organization</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='role'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Role</FormLabel>
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
