import 'dotenv/config'
import { drizzle as pg } from 'drizzle-orm/node-postgres'

import schema from '@/server/databases'

export const drizzle = pg(process.env.DATABASE_URL, {
  logger: process.env.NODE_ENV === 'development',
  schema
})
