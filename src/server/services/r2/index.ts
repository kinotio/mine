import { upload, getPermanentUrl } from '@/server/services/r2/client'
export type { R2UploadResult } from '@/server/services/r2/types'
const r2 = { upload, getPermanentUrl }
export default r2
