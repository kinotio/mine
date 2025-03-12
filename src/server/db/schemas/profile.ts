import { varchar, pgTable, timestamp, uuid } from '@/server/drizzle'
import { relations } from 'drizzle-orm'
import { z } from 'zod'

import { users } from '@/server/db/schemas/user'

export const profiles = pgTable('profiles', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_id: varchar({ length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  profileUrl: varchar({ length: 256 }).notNull(),
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
  id: z.string().optional(),
  user_id: z.string(),
  profileUrl: z.string(),
  avatarUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  name: z.string(),
  title: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  email: z.string(),
  website: z.string().optional(),
  github: z.string().optional(),
  x: z.string().optional(),
  linkedin: z.string().optional(),
  bluesky: z.string().optional()
})

export type Profile = z.infer<typeof profileSchema>
export type ProfileSelect = typeof profiles.$inferSelect
export type ProfileInsert = typeof profiles.$inferInsert
