import { PutBucketCorsCommand, HeadBucketCommand } from '@aws-sdk/client-s3'

import { corsRules } from '@/server/services/r2/config'
import { log } from '@/server/utils/logger'
import { r2 } from '@/server/services/r2/client'

// Apply CORS policy to a bucket
export const applyCorsToBucket = async (bucket: string): Promise<void> => {
  try {
    log.debug(`Applying CORS policy to bucket ${bucket}`, {
      context: 'R2Client',
      data: { bucket, corsRules }
    })

    const command = new PutBucketCorsCommand({
      Bucket: bucket,
      CORSConfiguration: corsRules
    })

    await r2.send(command)
    log.success(`CORS policy applied to bucket ${bucket}`, { context: 'R2Client' })
  } catch (error) {
    log.error(`Failed to apply CORS policy to bucket ${bucket}`, {
      context: 'R2Client',
      error: error instanceof Error ? error : new Error(String(error))
    })
  }
}

// Check if the bucket exists, return true if it does, false if not
export const checkBucketExists = async (bucket: string): Promise<boolean> => {
  try {
    const headCommand = new HeadBucketCommand({ Bucket: bucket })
    await r2.send(headCommand)

    return true
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    log.error(`Error bucket ${bucket} not exist`, {
      context: 'R2Client',
      data: { bucket }
    })

    return false
  }
}
