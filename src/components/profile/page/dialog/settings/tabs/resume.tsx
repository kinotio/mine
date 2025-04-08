import { Layout } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface ResumeVisibilitySettings {
  showSkills: boolean
  showExperience: boolean
  showEducation: boolean
  showProjects: boolean
  showPortfolio: boolean
  showCertifications: boolean
  showAchievements: boolean
  showPublications: boolean
  showLanguages: boolean
  showVolunteer: boolean
}

interface ResumeSettingsProps {
  settings: ResumeVisibilitySettings
  onSettingChange: (setting: keyof ResumeVisibilitySettings, checked: boolean) => void
}

export const Resume = ({ settings, onSettingChange }: ResumeSettingsProps) => {
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
                checked={settings.showSkills}
                onCheckedChange={(checked) => onSettingChange('showSkills', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-skills' className='font-medium'>
                Skills
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-experience'
                checked={settings.showExperience}
                onCheckedChange={(checked) => onSettingChange('showExperience', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-experience' className='font-medium'>
                Work Experience
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-education'
                checked={settings.showEducation}
                onCheckedChange={(checked) => onSettingChange('showEducation', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-education' className='font-medium'>
                Education
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-projects'
                checked={settings.showProjects}
                onCheckedChange={(checked) => onSettingChange('showProjects', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-projects' className='font-medium'>
                Projects
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-portfolio'
                checked={settings.showPortfolio}
                onCheckedChange={(checked) => onSettingChange('showPortfolio', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-portfolio' className='font-medium'>
                Portfolio
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-certifications'
                checked={settings.showCertifications}
                onCheckedChange={(checked) =>
                  onSettingChange('showCertifications', checked as boolean)
                }
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
                checked={settings.showAchievements}
                onCheckedChange={(checked) =>
                  onSettingChange('showAchievements', checked as boolean)
                }
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-achievements' className='font-medium'>
                Achievements
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-publications'
                checked={settings.showPublications}
                onCheckedChange={(checked) =>
                  onSettingChange('showPublications', checked as boolean)
                }
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-publications' className='font-medium'>
                Publications
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-languages'
                checked={settings.showLanguages}
                onCheckedChange={(checked) => onSettingChange('showLanguages', checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
              />
              <Label htmlFor='show-languages' className='font-medium'>
                Languages
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='show-volunteer'
                checked={settings.showVolunteer}
                onCheckedChange={(checked) => onSettingChange('showVolunteer', checked as boolean)}
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
