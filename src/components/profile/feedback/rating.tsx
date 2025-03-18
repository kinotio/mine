'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface FeedbackRatingProps {
  onChange: (rating: number) => void
  value?: number
}

export const FeedbackRating = ({ onChange, value = 0 }: FeedbackRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className='flex items-center gap-1'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Button
          key={star}
          variant='noShadow'
          className='focus:outline-none bg-white text-black'
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          <Star
            className={`h-8 w-8 transition-all ${
              star <= (hoverRating || value)
                ? 'fill-[#ffde59] text-black'
                : 'fill-transparent text-gray-400'
            }`}
            strokeWidth={2}
          />
        </Button>
      ))}
    </div>
  )
}
