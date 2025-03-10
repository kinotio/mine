import { varchar, pgTable, timestamp, uuid } from '@/server/drizzle'
import { relations } from 'drizzle-orm'
import { z } from 'zod'

import { users } from '@/server/db/schemas/user'

export const profiles = pgTable('profiles', {
  id: uuid().primaryKey().notNull(),
  user_id: varchar({ length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  avatarUrl: varchar({ length: 256 }),
  bannerUrl: varchar({ length: 256 }),
  name: varchar({ length: 256 }).notNull(),
  title: varchar({ length: 256 }),
  location: varchar({ length: 256 }),
  bio: varchar({ length: 256 }),
  email: varchar({ length: 256 }),
  website: varchar({ length: 256 }),
  github: varchar({ length: 256 }),
  x: varchar({ length: 256 }),
  linkedin: varchar({ length: 256 }),
  bluesky: varchar({ length: 256 }),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.user_id], references: [users.id] })
}))

export const profileSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  avatarUrl: z.string(),
  bannerUrl: z.string(),
  name: z.string(),
  title: z.string(),
  location: z.string(),
  bio: z.string(),
  email: z.string(),
  website: z.string(),
  github: z.string(),
  x: z.string(),
  linkedin: z.string(),
  bluesky: z.string()
})

export type Profile = z.infer<typeof profileSchema>
export type ProfileSelect = typeof profiles.$inferSelect
export type ProfileInsert = typeof profiles.$inferInsert
