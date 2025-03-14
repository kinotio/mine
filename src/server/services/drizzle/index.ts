import 'dotenv/config'

import { eq, like, and, count, desc, sql, asc, or, not, inArray } from 'drizzle-orm'
import {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  integer,
  serial,
  jsonb,
  text,
  date,
  decimal,
  numeric,
  real,
  index
} from 'drizzle-orm/pg-core'
import type { PgTableFn } from 'drizzle-orm/pg-core'

import schema from '@/server/databases/schema'
import { drizzle } from '@/server/services/drizzle/client'

// Export drizzle
export { drizzle }

// Export query builders
export { eq, like, and, or, not, count, desc, asc, sql, inArray }

// Export table builders
export {
  pgTable,
  varchar,
  uuid,
  boolean,
  timestamp,
  integer,
  serial,
  jsonb,
  text,
  date,
  decimal,
  numeric,
  real,
  index
}

// Export types
export type { PgTableFn }

// Default export
const database = {
  drizzle,
  schema
}

export default database
