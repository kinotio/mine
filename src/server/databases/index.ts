import { users, profiles, files } from '@/server/databases/schema'
import { userRelations, profileRelations, fileRelations } from '@/server/databases/relations'
import type {
  User,
  Profile,
  File,
  UserSelect,
  ProfileSelect,
  FileSelect,
  UserInsert,
  ProfileInsert,
  FileInsert
} from '@/server/databases/types'

// Named exports
export {
  // Tables
  users,
  profiles,
  files,

  // Relations
  userRelations,
  profileRelations,
  fileRelations,

  // Types
  type User,
  type Profile,
  type File,
  type UserSelect,
  type ProfileSelect,
  type FileSelect,
  type UserInsert,
  type ProfileInsert,
  type FileInsert
}

const schema = {
  users,
  profiles,
  files,
  userRelations,
  profileRelations,
  fileRelations
}

export default schema
