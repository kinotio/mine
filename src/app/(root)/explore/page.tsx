'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Grid3X3, List, SlidersHorizontal, X } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Card } from '@/components/root/explore/card'
import { Search } from '@/components/root/explore/search'
import { Filters } from '@/components/root/explore/filters'
import { Pagination } from '@/components/root/explore/pagination'

import { UserProfile } from '@/lib/types/profile'
import { calculateProfileStats } from '@/lib/utils'

import { getAllProfiles } from '@/server/actions'

export interface AdaptedProfile {
  id: string
  name: string
  title: string
  location: string
  avatar: string
  bio: string
  stats: ProfileStats
  skills: ProfileSkill[]
  url: string
}

export interface ProfileStats {
  projects: number
  experience: number
}

export interface ProfileSkill {
  name: string
  level: number
}

// Adapt the data format for our components
const adaptProfiles = (profiles: UserProfile[]) => {
  return profiles.map((profile) => ({
    id: profile.id,
    name: profile.name,
    title: profile.title || '',
    location: profile.location || 'Remote',
    avatar: profile.avatar_url || '',
    bio: profile.bio || '',
    stats: {
      projects:
        profile.user_profile_sections.find((s) => s.slug === 'projects')?.user_profile_section_items
          .length || 0,
      experience: getYearsOfExperience(profile)
    },
    skills: getSkills(profile),
    url: profile.profile_url
  }))
}

// Helper to extract years of experience
const getYearsOfExperience = (profile: UserProfile) => {
  // Use the existing utility function to calculate stats
  const stats = calculateProfileStats(profile)
  return stats.experience
}

// Helper to extract skills
const getSkills = (profile: UserProfile) => {
  const skillsSection = profile.user_profile_sections.find((s) => s.slug === 'skills')
  if (!skillsSection) return []

  return skillsSection.user_profile_section_items.map((item) => {
    const metadata = typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata
    return {
      name: metadata.name || '',
      level: metadata.level || 0
    }
  })
}

const Page = () => {
  const router = useRouter()

  const [profiles, setProfiles] = useState<AdaptedProfile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState(profiles)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeFilters, setActiveFilters] = useState<{
    skills: string[]
    locations: string[]
    experienceLevel: string | null
  }>({
    skills: [],
    locations: [],
    experienceLevel: null
  })

  const profilesPerPage = 12
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage)

  // Get current profiles for pagination
  const indexOfLastProfile = currentPage * profilesPerPage
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile)

  // Fething profiles
  useEffect(() => {
    getAllProfiles().then(({ success, data, error }) => {
      if (success && data) setProfiles(adaptProfiles(data as UserProfile[]))
      if (!success && error) console.error(error)
    })
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let results = profiles

    // Apply search query
    if (searchQuery) {
      results = results.filter(
        (profile) =>
          profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          profile.skills.some((skill) =>
            skill.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    }

    // Apply skills filter
    if (activeFilters.skills.length > 0) {
      results = results.filter((profile) =>
        profile.skills.some((skill) => activeFilters.skills.includes(skill.name))
      )
    }

    // Apply location filter
    if (activeFilters.locations.length > 0) {
      results = results.filter((profile) => activeFilters.locations.includes(profile.location))
    }

    // Apply experience level filter
    if (activeFilters.experienceLevel) {
      const minYears =
        activeFilters.experienceLevel === 'Junior'
          ? 0
          : activeFilters.experienceLevel === 'Mid-level'
            ? 3
            : activeFilters.experienceLevel === 'Senior'
              ? 5
              : 0

      const maxYears =
        activeFilters.experienceLevel === 'Junior'
          ? 2
          : activeFilters.experienceLevel === 'Mid-level'
            ? 5
            : activeFilters.experienceLevel === 'Senior'
              ? 100
              : 100

      results = results.filter(
        (profile) => profile.stats.experience >= minYears && profile.stats.experience <= maxYears
      )
    }

    setFilteredProfiles(results)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, activeFilters, profiles])

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle filter changes
  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      skills: [],
      locations: [],
      experienceLevel: null
    })
    setSearchQuery('')
  }

  // Count active filters
  const activeFilterCount =
    activeFilters.skills.length +
    activeFilters.locations.length +
    (activeFilters.experienceLevel ? 1 : 0)

  const getUsernameFromUrl = (url: string): string => {
    // Find the position of @ in the string
    const atIndex = url.lastIndexOf('@')
    if (atIndex !== -1) return url.substring(atIndex + 1)
    return url
  }

  return (
    <div className='min-h-screen bg-[#f0f0f0] p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] p-6 mb-8'>
          <h1 className='text-3xl font-black mb-6'>Expore Profiles</h1>

          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            <div className='flex-1'>
              <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                profiles={profiles}
              />
            </div>

            <div className='flex gap-2'>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                className='bg-[#4cc9f0] hover:bg-[#3db8df] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
              >
                <SlidersHorizontal className='mr-2 h-5 w-5' />
                Filters
                {activeFilterCount > 0 && (
                  <span className='ml-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'>
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              <div className='flex gap-2'>
                <Button
                  onClick={() => setViewMode('grid')}
                  variant='neutral'
                  className={`rounded-none px-3 ${viewMode === 'grid' ? 'bg-[#f0f0f0]' : 'bg-white'}`}
                >
                  <Grid3X3 className='h-5 w-5' />
                </Button>
                <Button
                  onClick={() => setViewMode('list')}
                  variant='neutral'
                  className={`rounded-none px-3 ${viewMode === 'list' ? 'bg-[#f0f0f0]' : 'bg-white'}`}
                >
                  <List className='h-5 w-5' />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && (
            <div className='mb-6 bg-[#f8f8f8] border-[3px] border-black p-4'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>Filter Profiles</h2>
                <Button
                  variant='neutral'
                  size='sm'
                  onClick={() => setShowFilters(false)}
                  className='h-8 w-8 p-0'
                >
                  <X className='h-5 w-5' />
                </Button>
              </div>

              <Filters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                profiles={profiles}
              />
            </div>
          )}

          {filteredProfiles.length === 0 ? (
            <div className='text-center py-12 bg-[#f8f8f8] border-[3px] border-black'>
              <h3 className='text-xl font-bold mb-2'>No profiles found</h3>
              <p className='mb-4'>Try adjusting your search or filters</p>
              <Button
                onClick={clearFilters}
                className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className='mb-4 text-sm'>
                Showing{' '}
                <span className='font-bold'>
                  {indexOfFirstProfile + 1}-{Math.min(indexOfLastProfile, filteredProfiles.length)}
                </span>{' '}
                of <span className='font-bold'>{filteredProfiles.length}</span> profiles
              </div>

              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col gap-4'
                }
              >
                {currentProfiles.map((profile) => (
                  <Card
                    key={profile.id}
                    profile={profile}
                    viewMode={viewMode}
                    onClick={() => router.push(`/@${getUsernameFromUrl(profile.url)}`)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className='mt-8 flex justify-center'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
