import { InfisicalSDK } from '@infisical/sdk'

import { config } from '@/services/infisical/config'

export const client = new InfisicalSDK(config)
