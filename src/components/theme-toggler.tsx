import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const ThemeToggler = ({ inDashboard = false }) => {
  const { theme, setTheme } = useTheme()

  if (inDashboard) {
    return (
      <span
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='justify-start cursor-pointer w-full'
      >
        <div className='flex gap-2 dark:hidden items-center w-full'>
          <Moon size={20} />
          <span>Dark</span>
        </div>

        <div className='dark:flex gap-2 hidden items-center w-full'>
          <Sun size={20} />
          <span>Light</span>
        </div>
      </span>
    )
  }

  return (
    <Button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className='justify-start cursor-pointer'
      variant='neutral'
    >
      <div className='flex gap-2 dark:hidden'>
        <Moon size={20} />
        <span className='block lg:hidden'>Dark</span>
      </div>

      <div className='dark:flex gap-2 hidden'>
        <Sun size={20} />
        <span className='block lg:hidden'>Light</span>
      </div>

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
