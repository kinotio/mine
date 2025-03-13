import { varchar, pgTable, timestamp } from '@/server/drizzle'
import { relations } from 'drizzle-orm'
import { z } from 'zod'

import { profiles } from '@/server/db/schemas/profile'

export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  username: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  image_url: varchar({ length: 256 }),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles)
}))

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  image_url: z.string().optional()
})

export type User = z.infer<typeof userSchema>
export type UserSelect = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
