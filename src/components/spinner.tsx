import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

export const Spinner = ({ size = 'md', color = '#4cc9f0', className }: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3'
  }

  return (
    <div
      className={cn('animate-spin rounded-full border-t-transparent', sizeClasses[size], className)}
      style={{ borderColor: `${color} transparent transparent transparent` }}
    />
  )
}
