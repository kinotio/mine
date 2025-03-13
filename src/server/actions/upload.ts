'use server'

import * as Minio from 'minio'
import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
  port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
})

// File validation schema
const FileValidation = z.object({
  type: z.string().startsWith('image/'),
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 5MB'),
  name: z.string().refine(
    (name) => {
      const ext = name.toLowerCase()
      return (
        ext.endsWith('.jpg') ||
        ext.endsWith('.jpeg') ||
        ext.endsWith('.png') ||
        ext.endsWith('.gif') ||
        ext.endsWith('.webp')
      )
    },
    { message: 'Only image files are allowed (jpg, jpeg, png, gif, webp)' }
  )
})

// Updated bucket policy
const getBucketPolicy = (bucketName: string) => ({
  Version: '2012-10-17',
  Statement: [
    {
      Sid: 'PublicRead',
      Effect: 'Allow',
      Principal: '*',
      Action: ['s3:GetObject'],
      Resource: [`arn:aws:s3:::${bucketName}/*`]
    }
  ]
})

export const upload = async (formData: FormData) => {
  try {
    const file = formData.get('file') as File
    const bucket = formData.get('bucket') as string

    if (!file || !bucket) {
      return {
        success: false,
        error: 'File and bucket are required'
      }
    }
    // Validate file metadata
    const validation = FileValidation.safeParse({
      type: file.type,
      size: file.size,
      name: file.name.toLowerCase()
    })

    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message || 'Invalid file'
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

    return { success: true, url }
  } catch (error) {
    console.error('Upload error:', error)

    // Generic error handling
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upload file'
    }
  }
}
