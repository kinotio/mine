import { Check, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { cn } from '@/lib/utils'
import { countries } from '@/lib/countries'

interface LocationSelectProps {
  open: boolean
  selectedCountry: string
  onOpenChange: (open: boolean) => void
  onSelect: (country: { value: string; label: string; flag: string }) => void
}

export const LocationSelect = ({
  open,
  selectedCountry,
  onOpenChange,
  onSelect
}: LocationSelectProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant='neutral'
          role='combobox'
          aria-expanded={open}
          className='border-[2px] border-black w-[50px] p-0'
        >
          <Globe className='h-5 w-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0 bg-white border-none'>
        <Command className='bg-white'>
          <CommandInput
            placeholder='Search country...'
            className='h-9 bg-white px-4 border-[2px] border-black my-2'
          />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup className='max-h-[300px] overflow-auto bg-white'>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={() => onSelect(country)}
                  className='flex items-center gap-2 cursor-pointer'
                >
                  <span className='text-lg'>{country.flag}</span>
                  <span>{country.label}</span>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedCountry === country.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
