'use server'

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

import { createUser, deleteUser, updateUser } from '@/server/actions'

export const POST = async (req: Request) => {
  const CLERK_WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!CLERK_WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('An error occurred while getting svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(CLERK_WEBHOOK_SECRET)

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    return new Response(`An error occurred while verifying webhook : ${err}`, {
      status: 400
    })
  }

  if (evt.type === 'user.created') {
    await createUser({
      id: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      username: evt.data.username as string,
      first_name: evt.data.first_name as string,
      last_name: evt.data.last_name as string,
      image_url: evt.data.image_url
    })
  }

  if (evt.type === 'user.updated') {
    await updateUser(evt.data.id as string, {
      id: evt.data.id,
      email: evt.data.email_addresses[0].email_address,
      username: evt.data.username as string,
      first_name: evt.data.first_name as string,
      last_name: evt.data.last_name as string,
      image_url: evt.data.image_url
    })
  }

  if (evt.type === 'user.deleted') {
    await deleteUser(evt.data.id as string)
  }

  return new Response('Clerk webhooks handled successfully', { status: 200 })
}
