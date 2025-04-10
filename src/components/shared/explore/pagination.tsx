'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    let rangeStart = Math.max(2, currentPage - 1)
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Adjust range to always show 3 pages if possible
    if (rangeEnd - rangeStart < 2 && totalPages > 3) {
      if (rangeStart === 2) {
        rangeEnd = Math.min(totalPages - 1, rangeEnd + 1)
      } else if (rangeEnd === totalPages - 1) {
        rangeStart = Math.max(2, rangeStart - 1)
      }
    }

    // Add ellipsis if needed
    if (rangeStart > 2) {
      pages.push('...')
    }

    // Add range pages
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed
    if (rangeEnd < totalPages - 1) {
      pages.push('...')
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className='flex items-center gap-2'>
      <Button
        variant='neutral'
        size='icon'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='h-10 w-10 border-[2px] border-black'
      >
        <ChevronLeft className='h-4 w-4' />
      </Button>

      {getPageNumbers().map((page, index) =>
        page === '...' ? (
          <span key={`ellipsis-${index}`} className='px-2'>
            ...
          </span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? 'default' : 'neutral'}
            onClick={() => onPageChange(page as number)}
            className={`h-10 w-10 border-[2px] border-black ${
              currentPage === page
                ? 'bg-[#4cc9f0] hover:bg-[#3db8df] text-black'
                : 'bg-white hover:bg-[#f0f0f0]'
            }`}
          >
            {page}
          </Button>
        )
      )}

      <Button
        variant='neutral'
        size='icon'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='h-10 w-10 border-[2px] border-black'
      >
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  )
}
