'use server'

import { minioClient, getBucketPolicy, MinioUploadResult } from '@/server/services/minio'
import { FileValidation } from '@/server/services/validation/file'
import { ActionResponse } from '@/server/utils/types'

export const uploadFile = async (
  formData: FormData
): Promise<ActionResponse<MinioUploadResult>> => {
  try {
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string

    if (!file || !bucket) {
      return {
        success: false,
        error: 'File and bucket are required'
      }
    }

    const validation = FileValidation.safeParse({
      type: file.type,
      size: file.size,
      name: file.name.toLowerCase()
    })

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    // Ensure bucket exists
    const bucketExists = await minioClient.bucketExists(bucket)
    if (!bucketExists) {
      await minioClient.makeBucket(bucket, 'us-east-1')
    }

    // Set bucket policy to make objects public
    await minioClient.setBucketPolicy(bucket, JSON.stringify(getBucketPolicy(bucket)))

    // Generate filename
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 7)
    const filename = `${timestamp}-${random}.${extension}`

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Minio
    await minioClient.putObject(bucket, filename, buffer, buffer.length, {
      'Content-Type': file.type,
      'Cache-Control': 'max-age=31536000' // Cache for 1 year
    })

    // Generate URL
    const baseUrl = process.env.NEXT_PUBLIC_MINIO_URL
    const url = `${baseUrl}/${bucket}/${filename}`

    return {
      success: true,
      data: {
        url,
        name: file.name.toLowerCase(),
        type: file.type,
        size: file.size
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while uploading file.'
    }
  }
}
