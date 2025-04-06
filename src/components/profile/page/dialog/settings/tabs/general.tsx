import { Settings as SettingsIcon } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { GeneralSettingKey } from '@/components/profile/page/dialog/settings/types'

interface GeneralSettingsProps {
  settings: {
    showPreviewResume: boolean
    showDownloadButton: boolean
  }
  onSettingChange: (setting: GeneralSettingKey, checked: boolean) => void
}

export const General = ({ settings, onSettingChange }: GeneralSettingsProps) => {
  return (
    <div className='space-y-4'>
      <div className='bg-[#f8f8f8] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-4 flex items-center'>
          <SettingsIcon className='h-4 w-4 mr-2' />
          Profile Actions Options
        </h3>

        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-preview-resume'
              checked={settings.showPreviewResume}
              onCheckedChange={(checked) =>
                onSettingChange('showPreviewResume', checked as boolean)
              }
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='show-preview-resume' className='font-medium'>
              Show Resume Preview
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-download-button'
              checked={settings.showDownloadButton}
              onCheckedChange={(checked) =>
                onSettingChange('showDownloadButton', checked as boolean)
              }
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='show-download-button' className='font-medium'>
              Show Download Button
            </Label>
          </div>
        </div>
      </div>

      <div className='bg-[#f0f0f0] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-2'>Resume Display Tips</h3>
        <p className='text-sm'>
          These settings control the visibility of resume preview and download options on your
          profile page.
        </p>
      </div>
    </div>
  )
}
