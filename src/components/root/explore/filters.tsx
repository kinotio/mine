'use client'

import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { AdaptedProfile } from '@/app/(root)/explore/page'

interface FiltersProps {
  activeFilters: {
    skills: string[]
    locations: string[]
    experienceLevel: string | null
  }
  onFilterChange: (filterType: string, value: string | string[]) => void
  onClearFilters: () => void
  profiles: AdaptedProfile[]
}

export const Filters = ({
  activeFilters,
  onFilterChange,
  onClearFilters,
  profiles
}: FiltersProps) => {
  // Extract unique skills, locations from profiles
  const [availableSkills, setAvailableSkills] = useState<string[]>([])
  const [availableLocations, setAvailableLocations] = useState<string[]>([])

  useEffect(() => {
    // Get unique skills
    const skillSet = new Set<string>()
    profiles.forEach((profile) => {
      profile.skills.forEach((skill) => {
        if (skill.name) skillSet.add(skill.name)
      })
    })
    const skills = Array.from(skillSet).sort()

    // Get unique locations
    const locations = Array.from(
      new Set(profiles.map((profile) => profile.location).filter(Boolean))
    ).sort()

    setAvailableSkills(skills)
    setAvailableLocations(locations)
  }, [profiles])

  // Handle skill checkbox change
  const handleSkillChange = (skill: string, checked: boolean) => {
    if (checked) {
      onFilterChange('skills', [...activeFilters.skills, skill])
    } else {
      onFilterChange(
        'skills',
        activeFilters.skills.filter((s) => s !== skill)
      )
    }
  }

  // Handle location checkbox change
  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      onFilterChange('locations', [...activeFilters.locations, location])
    } else {
      onFilterChange(
        'locations',
        activeFilters.locations.filter((l) => l !== location)
      )
    }
  }

  // Handle experience level radio change
  const handleExperienceLevelChange = (value: string) => {
    onFilterChange('experienceLevel', value)
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {/* Skills Filter */}
      <div>
        <h3 className='font-bold mb-3'>Skills</h3>
        <div className='space-y-2 max-h-[200px] overflow-y-auto pr-2'>
          {availableSkills.map((skill) => (
            <div key={skill} className='flex items-center'>
              <Checkbox
                id={`skill-${skill}`}
                checked={activeFilters.skills.includes(skill)}
                onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#4cc9f0] data-[state=checked]:text-black'
              />
              <Label htmlFor={`skill-${skill}`} className='ml-2 text-sm font-medium cursor-pointer'>
                {skill}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Locations Filter */}
      <div>
        <h3 className='font-bold mb-3'>Locations</h3>
        <div className='space-y-2 max-h-[200px] overflow-y-auto pr-2'>
          {availableLocations.map((location) => (
            <div key={location} className='flex items-center'>
              <Checkbox
                id={`location-${location}`}
                checked={activeFilters.locations.includes(location)}
                onCheckedChange={(checked) => handleLocationChange(location, checked as boolean)}
                className='border-[2px] border-black data-[state=checked]:bg-[#8ac926] data-[state=checked]:text-black'
              />
              <Label
                htmlFor={`location-${location}`}
                className='ml-2 text-sm font-medium cursor-pointer'
              >
                {location}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level Filter */}
      <div>
        <h3 className='font-bold mb-3'>Experience Level</h3>
        <RadioGroup
          value={activeFilters.experienceLevel || ''}
          onValueChange={handleExperienceLevelChange}
          className='space-y-2'
        >
          <div className='flex items-center'>
            <RadioGroupItem
              value='Junior'
              id='junior'
              className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
            />
            <Label htmlFor='junior' className='ml-2 text-sm font-medium cursor-pointer'>
              Junior (0-2 years)
            </Label>
          </div>
          <div className='flex items-center'>
            <RadioGroupItem
              value='Mid-level'
              id='mid-level'
              className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
            />
            <Label htmlFor='mid-level' className='ml-2 text-sm font-medium cursor-pointer'>
              Mid-level (3-5 years)
            </Label>
          </div>
          <div className='flex items-center'>
            <RadioGroupItem
              value='Senior'
              id='senior'
              className='border-[2px] border-black data-[state=checked]:bg-[#f72585] data-[state=checked]:text-white'
            />
            <Label htmlFor='senior' className='ml-2 text-sm font-medium cursor-pointer'>
              Senior (5+ years)
            </Label>
          </div>
        </RadioGroup>

        <Button
          onClick={onClearFilters}
          variant='neutral'
          className='mt-6 w-full border-[2px] border-black font-bold'
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}
