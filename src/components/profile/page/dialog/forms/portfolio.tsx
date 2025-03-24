import { Upload, X } from 'lucide-react'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import { PortfolioFormProps } from '@/components/profile/page/dialog/types'

export const PortfolioForm: React.FC<PortfolioFormProps> = ({
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
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Work Title</FormLabel>
            <FormControl>
              <Input {...field} className='border-[2px] border-black' disabled={isLoading} />
            </FormControl>
            <FormMessage className='text-[#ff6b6b] font-medium' />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='category'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Category</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='UI Design, Illustration, etc.'
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

      <FormField
        control={form.control}
        name='image'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Portfolio Image</FormLabel>
            <div className='flex items-start gap-4'>
              <FormControl>
                <div
                  className='w-full h-[120px] border-[2px] border-black relative bg-cover bg-center group cursor-pointer flex items-center justify-center'
                  style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                  onClick={() => document.getElementById('portfolio-image-upload')?.click()}
                >
                  {!imagePreview && (
                    <div className='flex flex-col items-center'>
                      <Upload className='h-8 w-8 mb-2' />
                      <span>Upload Image</span>
                    </div>
                  )}
                  <input
                    id='portfolio-image-upload'
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e, field)}
                    disabled={isLoading}
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
                        disabled={isLoading}
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

      <FormField
        control={form.control}
        name='url'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Portfolio URL</FormLabel>
            <FormControl>
              <Input
                {...field}
                className='border-[2px] border-black'
                placeholder='https://...'
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
