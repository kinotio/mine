'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Grid3X3, List, Rocket, SlidersHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

import { Card } from '@/components/shared/explore/card'
import { Search } from '@/components/shared/explore/search'
import { Filters } from '@/components/shared/explore/filters'
import { Pagination } from '@/components/shared/explore/pagination'

import { getAllProfiles } from '@/server/actions'
import { UserProfile } from '@/lib/types/profile'
import { calculateProfileStats } from '@/lib/utils'
import { AdaptedProfile } from '@/app/(root)/explore/page'

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
      experience: calculateProfileStats(profile).experience
    },
    skills:
      profile.user_profile_sections
        .find((s) => s.slug === 'skills')
        ?.user_profile_section_items.map((item) => {
          const metadata =
            typeof item.metadata === 'string' ? JSON.parse(item.metadata) : item.metadata
          return {
            name: metadata.name || '',
            level: metadata.level || 0
          }
        }) || [],
    url: profile.profile_url
  }))
}

export const Explore = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [profiles, setProfiles] = useState<AdaptedProfile[]>([])
  const [filteredProfiles, setFilteredProfiles] = useState<AdaptedProfile[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [activeFilters, setActiveFilters] = useState({
    skills: [] as string[],
    locations: [] as string[],
    experienceLevel: null as string | null
  })

  const profilesPerPage = 6
  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage)
  const currentProfiles = filteredProfiles.slice(
    (currentPage - 1) * profilesPerPage,
    currentPage * profilesPerPage
  )

  useEffect(() => {
    if (open) {
      getAllProfiles().then(({ success, data }) => {
        if (success && data) {
          const adaptedProfiles = adaptProfiles(data as UserProfile[])
          setProfiles(adaptedProfiles)
          setFilteredProfiles(adaptedProfiles)
        }
      })
    }
  }, [open])

  useEffect(() => {
    let results = profiles

    if (
      searchQuery ||
      activeFilters.skills.length ||
      activeFilters.locations.length ||
      activeFilters.experienceLevel
    ) {
      results = profiles.filter((profile) => {
        const matchesSearch =
          !searchQuery ||
          [
            profile.name,
            profile.title,
            profile.location,
            ...profile.skills.map((s) => s.name)
          ].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))

        const matchesSkills =
          !activeFilters.skills.length ||
          activeFilters.skills.every((skill) =>
            profile.skills.some((s) => s.name.toLowerCase() === skill.toLowerCase())
          )

        const matchesLocation =
          !activeFilters.locations.length || activeFilters.locations.includes(profile.location)

        const matchesExperience =
          !activeFilters.experienceLevel ||
          (activeFilters.experienceLevel === 'Junior' && profile.stats.experience <= 2) ||
          (activeFilters.experienceLevel === 'Mid-level' &&
            profile.stats.experience > 2 &&
            profile.stats.experience <= 5) ||
          (activeFilters.experienceLevel === 'Senior' && profile.stats.experience > 5)

        return matchesSearch && matchesSkills && matchesLocation && matchesExperience
      })
    }

    setFilteredProfiles(results)
    setCurrentPage(1)
  }, [searchQuery, activeFilters, profiles])

  const handleFilterChange = (filterType: string, value: string | string[]) => {
    setActiveFilters((prev) => ({ ...prev, [filterType]: value }))
  }

  const clearFilters = () => {
    setActiveFilters({
      skills: [],
      locations: [],
      experienceLevel: null
    })
    setSearchQuery('')
  }

  const handleCardClick = (userId: string) => {
    setOpen(false)
    router.push(`/@${userId}`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-sky-300'>
          <Rocket className='w-5 h-5' />
          <span>Explore</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[1200px] h-[90vh] border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] bg-white p-6'>
        <div className='h-full flex flex-col mt-6 relative'>
          <div className='space-y-6 '>
            <div className='flex flex-col md:flex-row gap-4'>
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
              <div className='bg-[#f8f8f8] border-[3px] border-black p-4 absolute z-10 w-full'>
                <Filters
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearFilters}
                  profiles={profiles}
                />
              </div>
            )}
          </div>

          {/* Scrollable Cards Section */}
          <div className='flex-1 min-h-0 mt-6'>
            <div className='h-[72vh] flex flex-col'>
              <div className='flex-1 overflow-y-auto pr-2 pt-2'>
                {currentProfiles.length === 0 ? (
                  <div className='text-center py-12 bg-[#f8f8f8] border-[3px] border-black'>
                    <h3 className='text-xl font-bold mb-2'>No profiles found</h3>
                    <p className='text-gray-600 mb-4'>Try adjusting your search or filters</p>
                    <Button
                      onClick={clearFilters}
                      className='bg-[#8ac926] hover:bg-[#79b821] text-black font-bold border-[3px] border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)] transition-all'
                    >
                      Clear All Filters
                    </Button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
                    {currentProfiles.map((profile) => (
                      <Card
                        key={profile.id}
                        profile={profile}
                        viewMode={viewMode}
                        onClick={() => handleCardClick(profile.url.split('@')[1])}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Fixed Pagination at bottom */}
              {totalPages > 1 && (
                <div className='mt-4 flex justify-center'>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
