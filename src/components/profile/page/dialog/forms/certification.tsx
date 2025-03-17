import { Upload, X } from 'lucide-react'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { CertificationFormProps } from '@/components/profile/page/dialog/types'

export const CertificationForm: React.FC<CertificationFormProps> = ({
  form,
  imagePreview,
  setImagePreview,
  handleImageUpload
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='font-bold'>Certification Title</FormLabel>
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
            <FormLabel className='font-bold'>Issuing Organization</FormLabel>
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
              <Input {...field} className='border-[2px] border-black' placeholder='2023' />
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
            <FormLabel className='font-bold'>Organization Logo</FormLabel>
            <div className='flex items-start gap-4'>
              <FormControl>
                <div
                  className='w-20 h-20 border-[2px] border-black rounded-full relative bg-cover bg-center group cursor-pointer flex items-center justify-center'
                  style={{ backgroundImage: imagePreview ? `url(${imagePreview})` : 'none' }}
                  onClick={() => document.getElementById('cert-image-upload')?.click()}
                >
                  {!imagePreview && <Upload className='h-6 w-6' />}
                  <input
                    id='cert-image-upload'
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={(e) => handleImageUpload(e, field)}
                  />
                  {imagePreview && (
                    <div className='absolute -top-2 -right-2 z-10'>
                      <Button
                        type='button'
                        variant='neutral'
                        size='sm'
                        className='h-6 w-6 p-0 rounded-full'
                        onClick={(e) => {
                          e.stopPropagation()
                          setImagePreview(null)
                          field.onChange('')
                        }}
                      >
                        <X className='h-3 w-3' />
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
    </>
  )
}
