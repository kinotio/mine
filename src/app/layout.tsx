import '@/app/globals.css'

import { Work_Sans } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-work-sans'
})

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <ClerkProvider
      dynamic
      appearance={{ baseTheme: neobrutalism, variables: { colorPrimary: 'orange' } }}
    >
      <html lang='en'>
        <body className={`${workSans.className}`}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <ClerkLoaded>
              <TooltipProvider>{children}</TooltipProvider>
            </ClerkLoaded>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default Layout
