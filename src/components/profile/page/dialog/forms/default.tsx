import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { DefaultFormProps } from '@/components/profile/page/dialog/types'

export const DefaultForm: React.FC<DefaultFormProps> = ({ form, isLoading }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Title</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' disabled={isLoading} />
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
