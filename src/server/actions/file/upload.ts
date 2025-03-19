'use server'

import { minioClient, getBucketPolicy, MinioUploadResult } from '@/server/services/minio'
import { FileValidation } from '@/server/services/validation/file'
import { ActionResponse } from '@/server/utils/types'
import { compressImage, compressAvatar, compressBanner } from '@/server/utils/image-processor'

export const uploadFile = async (
  formData: FormData
): Promise<ActionResponse<MinioUploadResult>> => {
  try {
    const fileData = formData.get('file')
    const bucket = formData.get('bucket') as string

    if (!fileData || !bucket) {
      return {
        success: false,
        error: 'File and bucket are required'
      }
    }

    // Handle both File objects and base64 data URLs
    let buffer: Buffer
    let fileName: string
    let fileType: string
    let fileSize: number

    // Check if fileData is a File object or a string (data URL)
    if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      // Extract mime type from data URL
      const matches = fileData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

      if (!matches || matches.length !== 3) {
        return {
          success: false,
          error: 'Invalid data URL format'
        }
      }

      fileType = matches[1]
      const base64Data = matches[2]
      buffer = Buffer.from(base64Data, 'base64')
      fileSize = buffer.length

      // Generate a filename since we don't have one
      const extension = fileType.split('/')[1] || 'png'
      fileName = `${Date.now()}.${extension}`
    } else if (fileData instanceof File) {
      fileName = fileData.name
      fileType = fileData.type
      fileSize = fileData.size

      // Convert File to Buffer
      const arrayBuffer = await fileData.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
    } else {
      return {
        success: false,
        error: 'Invalid file format'
      }
    }

    const validation = FileValidation.safeParse({
      type: fileType,
      size: fileSize,
      name: fileName.toLowerCase()
    })

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      }
    }

    const bucketExists = await minioClient.bucketExists(bucket)
    if (!bucketExists) {
      await minioClient.makeBucket(bucket, 'us-east-1')
    }

    await minioClient.setBucketPolicy(bucket, JSON.stringify(getBucketPolicy(bucket)))

    let processedImage

    if (bucket === 'avatars') {
      processedImage = await compressAvatar(buffer, fileName)
    } else if (bucket === 'banners') {
      processedImage = await compressBanner(buffer, fileName)
    } else {
      processedImage = await compressImage(buffer, fileName)
    }

    await minioClient.putObject(
      bucket,
      processedImage.filename,
      processedImage.buffer,
      processedImage.size,
      {
        'Content-Type': processedImage.mimetype,
        'Cache-Control': 'max-age=31536000' // Cache for 1 year
      }
    )

    // Generate URL
    const baseUrl = process.env.NEXT_PUBLIC_MINIO_URL
    const url = `${baseUrl}/${bucket}/${processedImage.filename}`

    return {
      success: true,
      data: {
        url,
        name: fileName.toLowerCase(),
        type: processedImage.mimetype,
        size: processedImage.size
      }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while uploading file.'
    }
  }
}
