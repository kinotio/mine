import { varchar, pgTable, timestamp } from '@/server/drizzle'

export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

const schema = { users }

export default schema
