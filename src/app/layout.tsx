import '@/app/globals.css'

import { Poppins } from 'next/font/google'
import { ClerkProvider, ClerkLoaded } from '@clerk/nextjs'

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
    <ClerkProvider dynamic>
      <html lang='en'>
        <body className={`${poppins.className}`}>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  )
}
