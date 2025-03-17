import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'

import { SkillFormProps } from '@/components/profile/page/dialog/types'

export const SkillForm: React.FC<SkillFormProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Skill Name</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
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
