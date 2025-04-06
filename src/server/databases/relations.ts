import { relations } from 'drizzle-orm'

import {
  users,
  userProfiles,
  userProfileFiles,
  userProfileSections,
  userProfileSectionItems,
  userProfileSettings,
  profileSectionTemplates
} from '@/server/databases/tables'

export const userRelations = relations(users, ({ one }) => ({
  user_profile: one(userProfiles)
}))

export const userProfileRelations = relations(userProfiles, ({ one, many }) => ({
  user: one(users, { fields: [userProfiles.user_id], references: [users.id] }),
  user_profile_files: many(userProfileFiles),
  user_profile_sections: many(userProfileSections),
  user_profile_settings: one(userProfileSettings, {
    fields: [userProfiles.id],
    references: [userProfileSettings.user_profile_id]
  })
}))

export const userProfileFileRelations = relations(userProfileFiles, ({ one }) => ({
  user_profile: one(userProfiles, {
    fields: [userProfileFiles.user_profile_id],
    references: [userProfiles.id]
  })
}))

export const userProfileSectionRelations = relations(userProfileSections, ({ one, many }) => ({
  user_profile: one(userProfiles, {
    fields: [userProfileSections.user_profile_id],
    references: [userProfiles.id]
  }),
  user_profile_section_items: many(userProfileSectionItems),
  profile_section_template: one(profileSectionTemplates)
}))

export const userProfileSectionItemRelations = relations(userProfileSectionItems, ({ one }) => ({
  user_profile: one(userProfiles, {
    fields: [userProfileSectionItems.user_profile_id],
    references: [userProfiles.id]
  }),
  user_profile_section: one(userProfileSections, {
    fields: [userProfileSectionItems.user_profile_section_id],
    references: [userProfileSections.id]
  })
}))

export const profileSectionTemplateRelations = relations(profileSectionTemplates, ({ many }) => ({
  user_profile_sections: many(userProfileSections)
}))
