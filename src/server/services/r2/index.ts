import { upload, getPermanentUrl, removeFile } from '@/server/services/r2/client'
export type { R2UploadResult } from '@/server/services/r2/types'
const r2 = { upload, getPermanentUrl, removeFile }
export default r2
