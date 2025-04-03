import { createClerkClient } from '@clerk/nextjs/server'

export const initClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
