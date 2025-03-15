import { users, profiles, files } from '@/server/databases/tables'
import { userRelations, profileRelations, fileRelations } from '@/server/databases/relations'

// Re-export the tables
export { users, profiles, files }

// Re-export the relations
export { userRelations, profileRelations, fileRelations }
