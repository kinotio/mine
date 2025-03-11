import { users, userRelations } from '@/server/db/schemas/user'
import { profiles, profileRelations } from '@/server/db/schemas/profile'

const schemas = { users, profiles }
const relations = { userRelations, profileRelations }
const schema = { ...schemas, ...relations }

export { users, profiles }
export default schema
