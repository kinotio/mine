import { Eye } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface PreviewSettingsProps {
  settings: {
    showContactInfo: boolean
    showSocialLinks: boolean
    showProfilePhoto: boolean
    enablePrint: boolean
  }
  onSettingChange: (setting: string, checked: boolean) => void
}

export const Preview = ({ settings, onSettingChange }: PreviewSettingsProps) => {
  return (
    <div className='space-y-4'>
      <div className='bg-[#f8f8f8] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-4 flex items-center'>
          <Eye className='h-4 w-4 mr-2' />
          Resume Preview Options
        </h3>

        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-contact-info'
              checked={settings.showContactInfo}
              onCheckedChange={(checked) => onSettingChange('showContactInfo', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='show-contact-info' className='font-medium'>
              Show contact information
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-social-links'
              checked={settings.showSocialLinks}
              onCheckedChange={(checked) => onSettingChange('showSocialLinks', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='show-social-links' className='font-medium'>
              Show social media links
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='show-profile-photo'
              checked={settings.showProfilePhoto}
              onCheckedChange={(checked) => onSettingChange('showProfilePhoto', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='show-profile-photo' className='font-medium'>
              Show profile photo
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='enable-print'
              checked={settings.enablePrint}
              onCheckedChange={(checked) => onSettingChange('enablePrint', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
            />
            <Label htmlFor='enable-print' className='font-medium'>
              Enable print functionality
            </Label>
          </div>
        </div>
      </div>

      <div className='bg-[#f0f0f0] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-2'>Preview Tips</h3>
        <p className='text-sm'>
          {`These settings only affect how your resume appears in the preview. They don't affect the
       downloaded version unless the same settings are applied in the Download tab.`}
        </p>
      </div>
    </div>
  )
}
