import 'dotenv/config'
import { createClient } from 'redis'

import { config } from '@/server/services/redis/config'
import { log } from '@/server/utils/logger'

export const client = createClient(config)

// Set up error handling
client.on('error', (err) => {
  console.error('An error occurred on redis:', err)
})

// Connect to Redis
client.connect().catch((err) => {
  console.error('An error occurred while connecting to redis:', err)
})

export const getOrSet = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> => {
  try {
    // Ensure Redis is connected
    if (!client.isOpen) {
      try {
        await client.connect()
      } catch (error) {
        log.error('Cache', { context: 'Cache Connection', error: error as Error })
        // If Redis is unavailable, just return the fetched data
        return fetchFn()
      }
    }

    // Generate key with prefix
    const prefixedKey = `${config.prefix || ''}${key}`

    // Try to get data from cache
    const cachedData = await client.get(prefixedKey)

    if (cachedData) {
      // Data found in cache
      log.info('Cache', { context: 'Cache Hit', data: { key } })
      return JSON.parse(cachedData) as T
    }

    // Cache miss - fetch data from source
    log.warn('Cache', { context: 'Cache Miss', data: { key } })
    const data = await fetchFn()

    // Store in cache if data exists and is not null or undefined
    if (data !== null && data !== undefined) {
      try {
        await client.setEx(prefixedKey, ttl, JSON.stringify(data))
        log.info('Cache', { context: 'Cache Set', data: { key, ttl } })
      } catch (error) {
        log.error('Cache', { context: 'Cache Set', error: error as Error })
      }
    }

    return data
  } catch (error) {
    log.error('Cache', { context: 'Cache GetOrSet', error: error as Error })
    // Fallback to source data if anything goes wrong
    return fetchFn()
  }
}

export const invalidate = async (key: string) => {
  try {
    if (client.isOpen) {
      await client.del(`${config.prefix || ''}${key}`)
      log.info('Cache', { context: 'Cache Invalidation', data: { key } })
    }
  } catch (error) {
    log.error('Cache', { context: 'Cache Invalidation', data: { key }, error: error as Error })
  }
}
