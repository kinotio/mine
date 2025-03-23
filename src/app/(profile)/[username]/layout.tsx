import type { Metadata } from 'next'

import { DATA } from '@/data'
import { cleanParamsUsername } from '@/lib/utils'

type Props = {
  params: { username: string }
}

// Dynamic metadata generation based on the username from the URL
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = cleanParamsUsername(params.username) as string

  return {
    metadataBase: new URL(`${DATA.url}/@${username}`),
    title: {
      default: `${DATA.name}: ${username}'s Profile`,
      template: `%s | ${username}'s Profile`
    },
    description: `View ${username}'s profile and public information`,
    keywords: ['profile', 'user profile', username, 'portfolio'],
    openGraph: {
      title: `${username}'s Profile on ${DATA.name}`,
      description: `View ${username}'s profile and public information`,
      url: `${DATA.url}/${username}`,
      siteName: DATA.name,
      type: 'profile'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    twitter: {
      title: `${username}'s Profile on ${DATA.name}`,
      card: 'summary_large_image'
    },
    verification: {
      google: '',
      yandex: ''
    }
  }
}

const Layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return children
}

export default Layout
