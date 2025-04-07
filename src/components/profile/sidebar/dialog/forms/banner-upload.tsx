import { useRef } from 'react'
import { Upload, X } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface BannerUploadProps {
  bannerPreview: string
  avatarColor: string
  profileBannerUrl: string
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBannerRemove: () => void
}

export const BannerUpload = ({
  bannerPreview,
  avatarColor,
  onBannerChange,
  onBannerRemove
}: BannerUploadProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const hasBanner = !isEmpty(bannerPreview)

  return (
    <div className='mb-6'>
      <Label className='font-bold mb-2 block'>Banner Image</Label>
      <div
        className='w-full h-[100px] border-[2px] border-black relative bg-cover bg-center group cursor-pointer'
        style={
          hasBanner
            ? {
                backgroundImage: `url(${bannerPreview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
            : {
                backgroundColor: avatarColor
              }
        }
        onClick={() => bannerInputRef.current?.click()}
      >
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <Upload className='h-6 w-6 text-white' />
        </div>

        {/* Only show the X button if there's a banner */}
        {hasBanner && (
          <div
            className='absolute top-2 right-2 z-10'
            onClick={(e) => {
              e.stopPropagation()
              onBannerRemove()
            }}
          >
            <Button
              type='button'
              variant='neutral'
              size='sm'
              className='h-8 w-8 p-0 rounded-full bg-white hover:bg-red-100 border-2 border-black'
            >
              <X className='h-5 w-5 text-black' />
            </Button>
          </div>
        )}

        <input
          type='file'
          ref={bannerInputRef}
          className='hidden'
          accept='image/*'
          onChange={onBannerChange}
        />
      </div>
    </div>
  )
}
