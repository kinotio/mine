import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { AchievementFormProps } from '@/components/profile/page/dialog/types'

export const AchievementForm: React.FC<AchievementFormProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Achievement Title</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='issuer'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Issuer/Organization</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='date'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Date</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' placeholder='June 2022' />
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
