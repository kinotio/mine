import '@/app/globals.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { Work_Sans } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'
import Script from 'next/script'

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
      appearance={{ baseTheme: neobrutalism, variables: { colorPrimary: '#ff6500' } }}
    >
      <html lang='en' suppressHydrationWarning>
        <Script
          async
          src='https://insight.kinotio.io/script.js'
          data-website-id='623cd7a0-e21f-4779-8117-e63ae49a3638'
        ></Script>

        <body className={`${workSans.className}`}>
          <ClerkLoaded>
            <TooltipProvider>{children}</TooltipProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}

export default Layout
