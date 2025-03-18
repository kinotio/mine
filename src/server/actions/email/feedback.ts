'use server'

import resend, { config, CreateEmailResponse } from '@/server/services/resend'
import { ActionResponse } from '@/server/utils/types'

import { FeedbackEmail } from '@/server/templates'

export const sendFeedback = async ({
  to,
  subject,
  from = config.defaultFrom,
  replyTo = config.defaultReplyTo,

  data
}: {
  to: string | string[]
  subject: string
  from?: string
  replyTo?: string
  data: {
    email: string
    feedback: string
    rating: number
  }
}): Promise<ActionResponse<CreateEmailResponse>> => {
  try {
    const result = await resend.emails.send({
      from,
      replyTo,
      to,
      subject,
      react: FeedbackEmail({
        email: data.email,
        feedback: data.feedback,
        rating: data.rating
      })
    })

    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An error occurred while sending feedback email.'
    }
  }
}
