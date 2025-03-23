import type { RedisClientOptions } from 'redis'

export const config: RedisClientOptions = {
  url: process.env.REDIS_URL
}

export const prefix = 'mine'
