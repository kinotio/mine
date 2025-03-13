import { relations } from 'drizzle-orm'
import { z } from 'zod'

import { varchar, pgTable, timestamp, uuid, text } from '@/server/drizzle'
import { users } from '@/server/db/schemas/user'

export const files = pgTable('files', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_id: varchar({ length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  file_name: varchar({ length: 256 }).notNull(),
  file_url: text().notNull(),
  file_type: varchar({ length: 256 }).notNull(),
  file_size: varchar({ length: 256 }).notNull(),
  tags: varchar({ length: 256 }).notNull(),
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export const fileRelations = relations(files, ({ one }) => ({
  user: one(users, { fields: [files.user_id], references: [users.id] })
}))

export const fileSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  file_name: z.string(),
  file_url: z.string(),
  file_type: z.string(),
  file_size: z.string(),
  tags: z.string()
})

export type File = z.infer<typeof fileSchema>
export type FileSelect = typeof files.$inferSelect
export type FileInsert = typeof files.$inferInsert
