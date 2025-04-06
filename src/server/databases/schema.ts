// Re-export the tables
export {
  users,
  userProfiles,
  userProfileFiles,
  userProfileSections,
  userProfileSectionItems,
  profileSectionTemplates,
  userProfileSettings
} from '@/server/databases/tables'

// Re-export the relations
export {
  userRelations,
  userProfileRelations,
  userProfileFileRelations,
  userProfileSectionRelations,
  userProfileSectionItemRelations
} from '@/server/databases/relations'
