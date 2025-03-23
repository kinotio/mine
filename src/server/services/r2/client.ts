import { S3Client, PutObjectCommand, CreateBucketCommand } from '@aws-sdk/client-s3'

import { config, bucket } from '@/server/services/r2/config'
import { log } from '@/server/utils/logger'
import { applyCorsToBucket, checkBucketExists } from '@/server/services/r2/helpers'

export const r2 = new S3Client(config)

export const getPermanentUrl = (key: string): string => {
  // For Cloudflare R2, use the public bucket URL
  const publicEndpoint = process.env.R2_PUBLIC_URL

  if (!publicEndpoint) {
    log.error('R2_PUBLIC_URL environment variable is not set', { context: 'R2Client' })
    throw new Error('R2_PUBLIC_URL environment variable is not set')
  }

  return `${publicEndpoint}/${key}`
}

export const upload = async (
  key: string,
  file: Buffer | Blob | ReadableStream,
  contentType?: string
) => {
  try {
    // Check if bucket exists
    const bucketExists = await checkBucketExists(bucket)

    if (bucketExists) {
      log.debug(`Bucket ${bucket} exists`, { context: 'R2Client' })
    } else {
      log.info(`Bucket ${bucket} does not exist, creating...`, { context: 'R2Client' })

      const createCommand = new CreateBucketCommand({ Bucket: bucket })
      await r2.send(createCommand)

      log.success(`Bucket ${bucket} created`, {
        context: 'R2Client',
        data: { bucket }
      })

      await applyCorsToBucket(bucket)

      log.warn('Remember to enable Public Access in the Cloudflare R2 dashboard', {
        context: 'R2Client',
        data: { bucket }
      })
    }

    // Upload the file
    log.debug(`Uploading file to R2`, {
      context: 'R2Client',
      data: {
        bucket,
        key,
        contentType,
        fileSize: typeof file === 'object' && 'byteLength' in file ? file.byteLength : 'unknown'
      }
    })

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
      CacheControl: 'max-age=31536000' // Cache for 1 year
    })

    const result = await r2.send(command)

    log.success(`File uploaded successfully to R2`, {
      context: 'R2Client',
      data: { bucket, key, etag: result.ETag }
    })

    return result
  } catch (error) {
    log.error('Error uploading file to R2', {
      context: 'R2Client',
      error: error instanceof Error ? error : new Error(String(error)),
      data: { bucket, key }
    })

    throw error
  }
}
