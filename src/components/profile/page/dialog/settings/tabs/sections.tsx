import { Layout } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface SectionVisibilitySettings {
  skills: boolean
  experience: boolean
  education: boolean
  projects: boolean
  certifications: boolean
  achievements: boolean
  publications: boolean
  languages: boolean
  volunteer: boolean
}

interface SectionsSettingsProps {
  settings: SectionVisibilitySettings
  onSettingChange: (setting: keyof SectionVisibilitySettings, checked: boolean) => void
}

export const Sections = ({ settings, onSettingChange }: SectionsSettingsProps) => {
  return (
    <div className='space-y-4'>
      <div className='bg-[#f8f8f8] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-4 flex items-center'>
          <Layout className='h-4 w-4 mr-2' />
          Resume Sections Visibility
        </h3>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-skills'
                checked={settings.skills}
                onCheckedChange={(checked) => onSettingChange('skills', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-skills' className='font-medium'>
                Skills
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-experience'
                checked={settings.experience}
                onCheckedChange={(checked) => onSettingChange('experience', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-experience' className='font-medium'>
                Work Experience
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-education'
                checked={settings.education}
                onCheckedChange={(checked) => onSettingChange('education', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-education' className='font-medium'>
                Education
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-projects'
                checked={settings.projects}
                onCheckedChange={(checked) => onSettingChange('projects', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-projects' className='font-medium'>
                Projects
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-certifications'
                checked={settings.certifications}
                onCheckedChange={(checked) => onSettingChange('certifications', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-certifications' className='font-medium'>
                Certifications
              </Label>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-achievements'
                checked={settings.achievements}
                onCheckedChange={(checked) => onSettingChange('achievements', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-achievements' className='font-medium'>
                Achievements
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-publications'
                checked={settings.publications}
                onCheckedChange={(checked) => onSettingChange('publications', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-publications' className='font-medium'>
                Publications
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-languages'
                checked={settings.languages}
                onCheckedChange={(checked) => onSettingChange('languages', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-languages' className='font-medium'>
                Languages
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-volunteer'
                checked={settings.volunteer}
                onCheckedChange={(checked) => onSettingChange('volunteer', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-volunteer' className='font-medium'>
                Volunteer Work
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-[#f0f0f0] border-[2px] border-black p-4'>
        <h3 className='font-bold mb-2'>Section Tips</h3>
        <p className='text-sm'>
          {`Only include sections that are relevant to the job you're applying for.  Too many sections can make your resume look cluttered.`}
        </p>
      </div>
    </div>
  )
}
