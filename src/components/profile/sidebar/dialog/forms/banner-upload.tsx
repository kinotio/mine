import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Label } from '@/components/ui/label'
import { getBackgroundStyleByProfile } from '@/lib/utils'

interface BannerUploadProps {
  bannerPreview: string
  avatarColor: string
  profileBannerUrl: string
  onBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const BannerUpload = ({
  bannerPreview,
  avatarColor,
  profileBannerUrl,
  onBannerChange
}: BannerUploadProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='mb-6'>
      <Label className='font-bold mb-2 block'>Banner Image</Label>
      <div
        className='w-full h-[100px] border-[2px] border-black relative bg-cover bg-center group cursor-pointer'
        style={
          isEmpty(bannerPreview)
            ? getBackgroundStyleByProfile({
                avatarColor,
                bannerUrl: profileBannerUrl
              })
            : {
                backgroundImage: `url(${bannerPreview})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }
        }
        onClick={() => bannerInputRef.current?.click()}
      >
        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <Upload className='h-6 w-6 text-white' />
        </div>
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
