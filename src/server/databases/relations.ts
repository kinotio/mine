import { relations } from 'drizzle-orm'
import { users, profiles, files } from '@/server/databases'

export const userRelations = relations(users, ({ one }) => ({
  profile: one(profiles)
}))

export const profileRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, { fields: [profiles.user_id], references: [users.id] }),
  files: many(files)
}))

export const fileRelations = relations(files, ({ one }) => ({
  profile: one(profiles, { fields: [files.profile_id], references: [profiles.id] })
}))
