'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

import { getRandomNeobrutalistColor } from '@/lib/colors'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullPage?: boolean
  colorful?: boolean
  className?: string
}

export const Loader = ({
  size = 'md',
  text = 'Loading...',
  fullPage = false,
  colorful = true,
  className
}: LoaderProps) => {
  const [colors, setColors] = useState<string[]>([])

  // Generate random colors for the loader elements
  useEffect(() => {
    if (colorful) {
      setColors([
        getRandomNeobrutalistColor(),
        getRandomNeobrutalistColor(),
        getRandomNeobrutalistColor(),
        getRandomNeobrutalistColor()
      ])
    } else {
      setColors(Array(4).fill('#000000'))
    }
  }, [colorful])

  // Size mappings
  const sizeClasses = {
    sm: {
      container: 'h-8 w-8',
      element: 'h-2 w-2',
      text: 'text-sm',
      border: 'border-[2px]',
      shadow: 'shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
    },
    md: {
      container: 'h-12 w-12',
      element: 'h-3 w-3',
      text: 'text-base',
      border: 'border-[2px]',
      shadow: 'shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
    },
    lg: {
      container: 'h-16 w-16',
      element: 'h-4 w-4',
      text: 'text-lg',
      border: 'border-[3px]',
      shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
    },
    xl: {
      container: 'h-24 w-24',
      element: 'h-6 w-6',
      text: 'text-xl',
      border: 'border-[3px]',
      shadow: 'shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]'
    }
  }

  const containerClass = fullPage
    ? 'fixed inset-0 flex items-center justify-center bg-[#f0f0f0] z-50'
    : 'flex flex-col items-center justify-center'

  return (
    <div className={cn(containerClass, className)}>
      <div className='relative'>
        <div
          className={cn(
            'relative bg-white',
            sizeClasses[size].container,
            sizeClasses[size].border,
            'border-black',
            sizeClasses[size].shadow
          )}
        >
          {/* Top left */}
          <div
            className={cn(
              'absolute top-0 left-0 rounded-full animate-bounce',
              sizeClasses[size].element,
              sizeClasses[size].border,
              'border-black'
            )}
            style={{
              backgroundColor: colors[0],
              animationDelay: '0ms',
              animationDuration: '800ms'
            }}
          />

          {/* Top right */}
          <div
            className={cn(
              'absolute top-0 right-0 rounded-full animate-bounce',
              sizeClasses[size].element,
              sizeClasses[size].border,
              'border-black'
            )}
            style={{
              backgroundColor: colors[1],
              animationDelay: '200ms',
              animationDuration: '800ms'
            }}
          />

          {/* Bottom right */}
          <div
            className={cn(
              'absolute bottom-0 right-0 rounded-full animate-bounce',
              sizeClasses[size].element,
              sizeClasses[size].border,
              'border-black'
            )}
            style={{
              backgroundColor: colors[2],
              animationDelay: '400ms',
              animationDuration: '800ms'
            }}
          />

          {/* Bottom left */}
          <div
            className={cn(
              'absolute bottom-0 left-0 rounded-full animate-bounce',
              sizeClasses[size].element,
              sizeClasses[size].border,
              'border-black'
            )}
            style={{
              backgroundColor: colors[3],
              animationDelay: '600ms',
              animationDuration: '800ms'
            }}
          />
        </div>
      </div>

      {text && <div className={cn('mt-4 font-bold', sizeClasses[size].text)}>{text}</div>}
    </div>
  )
}
