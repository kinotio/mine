import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

import { LanguageFormProps } from '@/components/profile/page/dialog/types'

export const LanguageForm: React.FC<LanguageFormProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Language</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='proficiency'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Proficiency</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='Native, Fluent, Intermediate, Basic'
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='level'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Proficiency Level: {field.value}%</FormLabel>
            <FormControl>
              <Slider
                min={1}
                max={100}
                step={1}
                defaultValue={[field.value]}
                onValueChange={(value) => field.onChange(value[0])}
                className='py-4'
              />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />
    </>
  )
}
