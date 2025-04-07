import { useRef } from 'react'
import { Upload } from 'lucide-react'
import { isEmpty } from 'lodash'

import { Label } from '@/components/ui/label'
import { getUserProfileInitial } from '@/lib/utils'

interface AvatarUploadProps {
  avatarPreview: string
  avatarColor: string
  textColor: string
  profileName: string
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onAvatarRemove: () => void
}

export const AvatarUpload = ({
  avatarPreview,
  avatarColor,
  textColor,
  profileName,
  onAvatarChange,
  onAvatarRemove
}: AvatarUploadProps) => {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const hasAvatar = !isEmpty(avatarPreview)

  return (
    <div className='mb-6'>
      <Label className='font-bold mb-2 block'>Profile Picture</Label>
      <div className='flex items-start gap-4'>
        <div
          className='w-24 h-24 border-[2px] border-black rounded-full relative bg-cover bg-center group cursor-pointer flex items-center justify-center overflow-hidden'
          style={
            hasAvatar
              ? {
                  backgroundImage: `url(${avatarPreview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }
              : {
                  backgroundColor: avatarColor
                }
          }
          onClick={() => avatarInputRef.current?.click()}
        >
          {!hasAvatar && (
            <span className='text-4xl font-bold' style={{ color: textColor }}>
              {getUserProfileInitial(profileName)}
            </span>
          )}

          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <Upload className='h-6 w-6 text-white' />
          </div>

          <input
            type='file'
            ref={avatarInputRef}
            className='hidden'
            accept='image/*'
            onChange={onAvatarChange}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <div className='text-sm text-gray-500'>
            <p>Upload a profile picture (1MB Max)</p>
            <p>Square images work best</p>
          </div>

          {/* Remove avatar link - only shown when there's an avatar */}
          {hasAvatar && (
            <button
              type='button'
              onClick={onAvatarRemove}
              className='text-blue-500 hover:text-blue-700 text-sm font-medium mt-1 text-left'
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
