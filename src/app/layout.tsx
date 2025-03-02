import '@/app/globals.css'

import { Poppins } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'
import { neobrutalism } from '@clerk/themes'

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-poppins'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      dynamic
      appearance={{ baseTheme: neobrutalism, variables: { colorPrimary: 'orange' } }}
    >
      <html lang='en'>
        <body className={`${poppins.className}`}>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}
