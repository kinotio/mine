import { pgTable, timestamp, uuid, varchar, text, jsonb, integer } from 'drizzle-orm/pg-core'

// Common Columns
const baseColumns = {
  created: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updated: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
}

// Generic Tables
export const profileSectionTemplates = pgTable('profile_section_templates', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  description: text(),
  color: varchar({ length: 256 }),
  icon: varchar({ length: 256 }),
  ...baseColumns
})

// Tables
export const users = pgTable('users', {
  id: varchar({ length: 256 }).primaryKey().notNull(),
  email: varchar({ length: 256 }).notNull(),
  username: varchar({ length: 256 }).notNull(),
  first_name: varchar({ length: 256 }).notNull(),
  last_name: varchar({ length: 256 }).notNull(),
  image_url: varchar({ length: 256 }),
  ...baseColumns
})

export const userProfiles = pgTable('user_profiles', {
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

export const userProfileFiles = pgTable('user_profile_files', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_profile_id: uuid()
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  file_name: varchar({ length: 256 }).notNull(),
  file_url: text().notNull(),
  file_type: varchar({ length: 256 }).notNull(),
  file_size: varchar({ length: 256 }).notNull(),
  tag: varchar({ length: 256 }).notNull(),
  ...baseColumns
})

export const userProfileSections = pgTable('user_profile_sections', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: varchar({ length: 256 }).notNull(),
  slug: varchar({ length: 256 }).notNull().unique(),
  user_profile_id: uuid()
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  profile_section_template_id: uuid()
    .notNull()
    .references(() => profileSectionTemplates.id),
  order: integer().notNull().default(0),
  ...baseColumns
})

export const userProfileSectionItems = pgTable('user_profile_section_items', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_profile_id: uuid()
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  user_profile_section_id: uuid()
    .notNull()
    .references(() => userProfileSections.id, { onDelete: 'cascade' }),
  metadata: jsonb(),
  order: integer().notNull().default(0),
  ...baseColumns
})

export const userProfileSettings = pgTable('user_profile_settings', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  user_profile_id: uuid()
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  metadata: jsonb('metadata')
    .$type<{
      general?: {
        showPreviewResume?: boolean
        showDownloadButton?: boolean
      }
    }>()
    .default({}),
  ...baseColumns
})
