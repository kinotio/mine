import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { isEmpty } from 'lodash'

import { getGradientFromColor } from '@/lib/colors'

export const cn: typeof clsx = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getBackgroundStyleByProfile = (profile: {
  avatarColor: string
  bannerUrl: string
}) => {
  return isEmpty(profile.bannerUrl)
    ? { background: getGradientFromColor(profile.avatarColor) }
    : {
        backgroundImage: `url(${profile.bannerUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
}
