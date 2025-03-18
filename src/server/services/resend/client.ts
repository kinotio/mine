import 'dotenv/config'
import { Resend, CreateEmailResponse } from 'resend'

export type { CreateEmailResponse }

import { config } from '@/server/services/resend/config'

export const resend = new Resend(config.apiKey)
