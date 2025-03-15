import 'dotenv/config'
import { createClient } from 'redis'

import { config } from '@/server/services/redis/config'

export const cache = createClient(config)

// Set up error handling
cache.on('error', (err) => {
  console.error('An error occurred on redis:', err)
})

// Connect to Redis
cache.connect().catch((err) => {
  console.error('An error occurred while connecting to redis:', err)
})
