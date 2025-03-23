import 'dotenv/config'
import { createClient } from 'redis'

import { config, prefix } from '@/server/services/redis/config'
import { log } from '@/server/utils/logger'

export const client = createClient(config)

// Set up error handling
client.on('error', (err) => {
  log.error('Cache', { context: 'Redis Error', error: err as Error })
})

// Connect to Redis
client.connect().catch((err) => {
  log.error('Cache', { context: 'Redis Connection', error: err as Error })
})

// Helper to add prefix to keys
const getPrefixedKey = (key: string): string => {
  return `${prefix}:${key}`
}

export const getOrSet = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 3600
): Promise<T> => {
  try {
    const prefixedKey = getPrefixedKey(key)

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

    // Try to get data from cache
    const cachedData = await client.get(prefixedKey)

    if (cachedData) {
      // Data found in cache
      log.info('Cache', { context: 'Cache Hit', data: { key: prefixedKey } })
      return JSON.parse(cachedData) as T
    }

    // Cache miss - fetch data from source
    log.warn('Cache', { context: 'Cache Miss', data: { key: prefixedKey } })
    const data = await fetchFn()

    // Store in cache if data exists and is not null or undefined
    if (data !== null && data !== undefined) {
      try {
        await client.setEx(prefixedKey, ttl, JSON.stringify(data))
        log.info('Cache', { context: 'Cache Set', data: { key: prefixedKey, ttl } })
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
    const prefixedKey = getPrefixedKey(key)

    if (client.isOpen) {
      await client.del(prefixedKey)
      log.info('Cache', { context: 'Cache Invalidation', data: { key: prefixedKey } })
    }
  } catch (error) {
    log.error('Cache', {
      context: 'Cache Invalidation',
      data: { key: getPrefixedKey(key) },
      error: error as Error
    })
  }
}
