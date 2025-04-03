'use server'

import resend, { config, CreateEmailResponse } from '@/server/services/resend'
import { ActionResponse } from '@/server/utils/types'

import { JoinedEmail } from '@/server/templates'

export const sendJoined = async ({
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
    username: string
    email: string
    joinDate: string
    profileUrl?: string
  }
}): Promise<ActionResponse<CreateEmailResponse>> => {
  try {
    const result = await resend.emails.send({
      from,
      replyTo,
      to,
      subject,
      react: JoinedEmail({
        username: data.username,
        email: data.email,
        joinDate: data.joinDate,
        profileUrl: data.profileUrl
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
        error instanceof Error
          ? error.message
          : 'An error occurred while sending new user notification email.'
    }
  }
}
