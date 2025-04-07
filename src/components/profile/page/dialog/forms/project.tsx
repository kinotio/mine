import { Upload, X } from 'lucide-react'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { ProjectFormProps } from '@/components/profile/page/dialog/types'

export const ProjectForm: React.FC<ProjectFormProps> = ({
  form,
  imagePreview,
  setImagePreview,
  handleImageUpload,
  isLoading
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name='title'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Project Title</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
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

      <FormField
        control={form.control}
        name='tags'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Tags</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' />
            </FormControl>
            <FormDescription>
              Separate tags with commas (e.g., React, TypeScript, UI/UX)
            </FormDescription>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='image'
        disabled={isLoading}
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Project Image</FormLabel>
            <div className='flex items-start gap-4'>
              <FormControl>
                <div
                  className='w-full h-[120px] border-[2px] border-black relative bg-cover bg-center group cursor-pointer flex items-center justify-center'
                  style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                  onClick={() => document.getElementById('project-image-upload')?.click()}
                >
                  {!imagePreview && (
                    <div className='flex flex-col items-center'>
                      <Upload className='h-8 w-8 mb-2' />
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input
                    id='project-image-upload'
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e, field)}
                  />
                  {imagePreview && (
                    <div className='absolute top-2 right-2 z-10'>
                      <Button
                        type='button'
                        variant='neutral'
                        size='sm'
                        className='h-8 w-8 p-0 rounded-full'
                        onClick={(e) => {
                          e.stopPropagation()
                          setImagePreview(null)
                          field.onChange('')
                        }}
                      >
                        <X className='h-4 w-4' />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
            </div>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <FormField
          control={form.control}
          name='sourceUrl'
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Source URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className='border-[2px] border-black'
                  placeholder='https://github.com/...'
                />
              </FormControl>
              <FormMessage className='text-[#ff6b6b] font-medium' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='liveUrl'
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='font-bold'>Live URL</FormLabel>
              <FormControl>
                <Input {...field} className='border-[2px] border-black' placeholder='https://...' />
              </FormControl>
              <FormMessage className='text-[#ff6b6b] font-medium' />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}
