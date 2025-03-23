'use server'

import { randomUUID } from 'crypto'

import r2, { type R2UploadResult } from '@/server/services/r2'
import { FileValidation } from '@/server/services/validation/file'
import { ActionResponse } from '@/server/utils/types'
import { compressImage, compressAvatar, compressBanner } from '@/server/utils/image-processor'

import { log } from '@/server/utils/logger'

export const uploadFile = async (formData: FormData): Promise<ActionResponse<R2UploadResult>> => {
  try {
    log.info('Processing file upload request', { context: 'uploadFileAction' })

    const fileData = formData.get('file')
    const type = formData.get('type') as string

    if (!fileData) {
      return {
        success: false,
        error: 'File are required'
      }
    }

    // Handle both File objects and base64 data URLs
    let buffer: Buffer
    let fileName: string
    let fileType: string
    let fileSize: number

    // Check if fileData is a File object or a string (data URL)
    if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      log.debug('Processing data URL file upload', { context: 'uploadFileAction' })
      // Extract mime type from data URL
      const matches = fileData.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)

      if (!matches || matches.length !== 3) {
        log.warn('Invalid data URL format', { context: 'uploadFileAction' })
        return {
          success: false,
          error: 'Invalid data URL format'
        }
      }

      fileType = matches[1]
      const base64Data = matches[2]
      buffer = Buffer.from(base64Data, 'base64')
      fileSize = buffer.length

      // Generate a filename with UUID since we don't have one
      const extension = fileType.split('/')[1] || 'png'
      fileName = `${Date.now()}-${randomUUID()}.${extension}`

      log.debug('Created filename for data URL upload', {
        context: 'uploadFileAction',
        data: { fileName, fileType, fileSize }
      })
    } else if (fileData instanceof File) {
      log.debug('Processing File object upload', { context: 'uploadFileAction' })
      fileName = fileData.name
      fileType = fileData.type
      fileSize = fileData.size

      // Convert File to Buffer
      const arrayBuffer = await fileData.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)

      log.debug('Processed File object', {
        context: 'uploadFileAction',
        data: { fileName, fileType, fileSize }
      })
    } else {
      log.warn('Invalid file format', {
        context: 'uploadFileAction',
        data: { fileDataType: typeof fileData }
      })
      return {
        success: false,
        error: 'Invalid file format'
      }
    }

    // Validate the file
    const validation = FileValidation.safeParse({
      type: fileType,
      size: fileSize,
      name: fileName.toLowerCase()
    })

    if (!validation.success) {
      const errorMessage = validation.error.issues[0].message
      log.warn('File validation failed', {
        context: 'uploadFileAction',
        data: { error: errorMessage, fileType, fileSize, fileName }
      })
      return {
        success: false,
        error: errorMessage
      }
    }

    // Process the image based on bucket type
    let processedImage

    if (type === 'avatars') {
      processedImage = await compressAvatar(buffer, fileName)
    } else if (type === 'banners') {
      processedImage = await compressBanner(buffer, fileName)
    } else {
      processedImage = await compressImage(buffer, fileName)
    }

    log.debug('Image processed successfully', {
      context: 'uploadFileAction',
      data: {
        originalSize: fileSize,
        compressedSize: processedImage.size,
        filename: processedImage.filename
      }
    })

    await r2.upload(processedImage.filename, processedImage.buffer, processedImage.mimetype)

    log.debug('Image uploaded successfully', {
      context: 'uploadFileAction',
      data: { type, filename: processedImage.filename }
    })

    const url = r2.getPermanentUrl(processedImage.filename)

    return {
      success: true,
      data: {
        url,
        name: processedImage.filename.toLowerCase(),
        type: processedImage.mimetype,
        size: processedImage.size
      }
    }
  } catch (error) {
    log.error('Error in file upload', {
      context: 'uploadFileAction',
      error: error instanceof Error ? error : new Error(String(error))
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred while uploading file.'
    }
  }
}
