interface ResendConfig {
  apiKey: string
  defaultFrom: string
  defaultReplyTo?: string
  environment: string
}

export const config: ResendConfig = {
  apiKey: process.env.RESEND_API_KEY,
  defaultFrom: process.env.RESEND_FROM_EMAIL || 'no-reply@kinotio.io',
  defaultReplyTo: process.env.RESEND_REPLY_TO_EMAIL,
  environment: process.env.NODE_ENV || 'development'
}
