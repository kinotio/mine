import { varchar, pgTable, timestamp, uuid, text } from '@/server/services/drizzle'

const baseColumns = {
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
}

export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  username: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  image_url: varchar({ length: 256 }),
  ...baseColumns
})

export const profiles = pgTable('profiles', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_id: varchar({ length: 256 })
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
    .unique(),
  profile_url: varchar({ length: 256 }).notNull(),
  avatar_url: text(),
  banner_url: text(),
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
  ...baseColumns
})

export const files = pgTable('files', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  profile_id: uuid()
    .notNull()
    .references(() => profiles.id, { onDelete: 'cascade' }),
  file_name: varchar({ length: 256 }).notNull(),
  file_url: text().notNull(),
  file_type: varchar({ length: 256 }).notNull(),
  file_size: varchar({ length: 256 }).notNull(),
  tags: varchar({ length: 256 }).notNull(),
  ...baseColumns
})

const schema = { users, profiles, files }
export default schema
