import { Download as DownloadIcon, FileText } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface DownloadSettingsProps {
  settings: {
    includeCoverLetter: boolean
    highResolution: boolean
    includePortfolio: boolean
    fileFormat: 'pdf' | 'docx' | 'both'
  }
  onSettingChange: (setting: string, value: unknown) => void
}

export const Download = ({ settings, onSettingChange }: DownloadSettingsProps) => {
  return (
    <div className='space-y-4'>
      <div className='bg-[#f8f8f8] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-4 flex items-center'>
          <DownloadIcon className='h-4 w-4 mr-2' />
          Resume Download Options
        </h3>

        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='include-cover-letter'
              checked={settings.includeCoverLetter}
              onCheckedChange={(checked) =>
                onSettingChange('includeCoverLetter', checked as boolean)
              }
              className='border-[2px] border-black data-[state=checked]:bg-[#8ac926] data-[state=checked]:text-black'
            />
            <Label htmlFor='include-cover-letter' className='font-medium'>
              Include cover letter
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='high-resolution'
              checked={settings.highResolution}
              onCheckedChange={(checked) => onSettingChange('highResolution', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#8ac926] data-[state=checked]:text-black'
            />
            <Label htmlFor='high-resolution' className='font-medium'>
              High resolution (print quality)
            </Label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='include-portfolio'
              checked={settings.includePortfolio}
              onCheckedChange={(checked) => onSettingChange('includePortfolio', checked as boolean)}
              className='border-[2px] border-black data-[state=checked]:bg-[#8ac926] data-[state=checked]:text-black'
            />
            <Label htmlFor='include-portfolio' className='font-medium'>
              Include portfolio samples
            </Label>
          </div>

          <div className='mt-4'>
            <Label className='font-bold mb-2 block'>File Format</Label>
            <div className='grid grid-cols-3 gap-2'>
              <Button
                type='button'
                onClick={() => onSettingChange('fileFormat', 'pdf')}
                className={`border-[2px] border-black ${
                  settings.fileFormat === 'pdf'
                    ? 'bg-[#8ac926] text-black'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <FileText className='mr-2 h-4 w-4' />
                PDF
              </Button>
              <Button
                type='button'
                onClick={() => onSettingChange('fileFormat', 'docx')}
                className={`border-[2px] border-black ${
                  settings.fileFormat === 'docx'
                    ? 'bg-[#8ac926] text-black'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <FileText className='mr-2 h-4 w-4' />
                DOCX
              </Button>
              <Button
                type='button'
                onClick={() => onSettingChange('fileFormat', 'both')}
                className={`border-[2px] border-black ${
                  settings.fileFormat === 'both'
                    ? 'bg-[#8ac926] text-black'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                <FileText className='mr-2 h-4 w-4' />
                Both
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
