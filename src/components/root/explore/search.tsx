'use client'

import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { AdaptedProfile } from '@/app/(root)/explore/page'

interface SearchProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  profiles: AdaptedProfile[]
}

export const Search = ({ searchQuery, setSearchQuery, profiles }: SearchProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputFocused, setInputFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Generate suggestions based on input
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([])
      return
    }

    const query = searchQuery.toLowerCase()

    // Get name matches
    const nameMatches = profiles
      .filter((profile) => profile.name.toLowerCase().includes(query))
      .map((profile) => profile.name)
      .slice(0, 3)

    // Get title matches
    const titleMatches = profiles
      .filter((profile) => profile.title.toLowerCase().includes(query))
      .map((profile) => profile.title)
      .slice(0, 3)

    // Get skill matches
    const skillSet = new Set<string>()
    profiles.forEach((profile) => {
      profile.skills.forEach((skill) => {
        if (skill.name && skill.name.toLowerCase().includes(query)) {
          skillSet.add(skill.name)
        }
      })
    })
    const skillMatches = Array.from(skillSet).slice(0, 3)

    // Get location matches
    const locationMatches = Array.from(
      new Set(
        profiles
          .filter((profile) => profile.location.toLowerCase().includes(query))
          .map((profile) => profile.location)
      )
    ).slice(0, 3)

    // Combine and deduplicate
    const allSuggestions = Array.from(
      new Set([...nameMatches, ...titleMatches, ...skillMatches, ...locationMatches])
    ).slice(0, 6)

    setSuggestions(allSuggestions)
  }, [searchQuery, profiles])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Show suggestions when input is focused and there's a query
  useEffect(() => {
    setShowSuggestions(inputFocused && suggestions.length > 0)
  }, [inputFocused, suggestions])

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const clearSearch = () => {
    setSearchQuery('')
    inputRef.current?.focus()
  }

  return (
    <div className='relative'>
      <div className='flex'>
        <div className='relative flex-1'>
          <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
            <SearchIcon className='h-5 w-5 text-gray-500' />
          </div>
          <Input
            ref={inputRef}
            type='text'
            placeholder='Search by name, title, skills, or location...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setInputFocused(true)}
            className='pl-10 border-[3px] border-black focus-visible:ring-0 focus-visible:ring-offset-0 h-12'
          />
          {searchQuery && (
            <Button
              variant='neutral'
              size='sm'
              onClick={clearSearch}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0'
            >
              <X className='h-5 w-5' />
            </Button>
          )}
        </div>
      </div>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className='absolute z-10 w-full mt-1 bg-white border-[3px] border-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className='p-3 hover:bg-[#f0f0f0] cursor-pointer border-b-[1px] border-gray-200 last:border-b-0'
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className='flex items-center'>
                <SearchIcon className='h-4 w-4 mr-2 text-gray-500' />
                <span>{suggestion}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
