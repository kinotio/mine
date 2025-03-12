import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface AvatarUploadProps {
  avatarPreview: string
  avatarColor: string
  textColor: string
  name: string
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AvatarUpload = ({
  avatarPreview,
  avatarColor,
  textColor,
  name,
  onAvatarChange
}: AvatarUploadProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='flex items-center gap-4 mb-6'>
      <div
        className='relative cursor-pointer group'
        onClick={() => avatarInputRef.current?.click()}
      >
        <Avatar className='w-20 h-20 border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'>
          {isEmpty(avatarPreview) ? (
            <AvatarFallback
              style={{ backgroundColor: avatarColor, color: textColor }}
              className='text-3xl font-bold'
            >
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          ) : (
            <AvatarImage src={avatarPreview} />
          )}
        </Avatar>
        <div className='absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
          <Upload className='h-5 w-5 text-white' />
        </div>
        <input
          type='file'
          ref={avatarInputRef}
          className='hidden'
          accept='image/*'
          onChange={onAvatarChange}
        />
      </div>
      <div>
        <h3 className='font-bold'>Profile Picture</h3>
        <p className='text-sm text-gray-500'>Click to upload a new avatar</p>
      </div>
    </div>
  )
}
