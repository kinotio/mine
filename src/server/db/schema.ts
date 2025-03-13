import { users, userRelations, userFilesRelations } from '@/server/db/schemas/user'
import { profiles, profileRelations } from '@/server/db/schemas/profile'
import { files, fileRelations } from '@/server/db/schemas/file'

const schemas = { users, profiles, files }
const relations = { userRelations, profileRelations, fileRelations, userFilesRelations }
const schema = { ...schemas, ...relations }

export { users, profiles, files }
export default schema
