import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import mime from 'mime-types'

import { log } from '@/server/utils/logger'

interface CompressedImageResult {
  buffer: Buffer
  filename: string
  mimetype: string
  size: number
}

interface ImageProcessingOptions {
  quality: number
  maxWidth: number
  maxHeight?: number
  crop?: boolean
}

export const compressImage = async (
  file: Buffer,
  originalFilename: string,
  options: ImageProcessingOptions = { quality: 80, maxWidth: 1920 }
): Promise<CompressedImageResult> => {
  try {
    // Get file extension
    const extension = mime.extension(mime.lookup(originalFilename) || 'image/jpeg')

    // Generate a unique filename
    const filename = `${uuidv4().replace(/-/g, '')}.${extension}`

    // Process the image with sharp
    let imageProcessor = sharp(file)

    // Get image metadata
    const metadata = await imageProcessor.metadata()

    // Resize logic
    if (metadata.width) {
      const resizeOptions: sharp.ResizeOptions = {
        withoutEnlargement: true
      }

      // If crop is specified, use different resize mode
      if (options.crop && options.maxHeight) {
        resizeOptions.width = options.maxWidth
        resizeOptions.height = options.maxHeight
        resizeOptions.fit = sharp.fit.cover
        resizeOptions.position = sharp.strategy.entropy // Focus on the most "interesting" part
      } else if (metadata.width > options.maxWidth) {
        resizeOptions.width = options.maxWidth
        if (options.maxHeight) {
          resizeOptions.height = options.maxHeight
          resizeOptions.fit = sharp.fit.inside
        }
      }

      imageProcessor = imageProcessor.resize(resizeOptions)
    }

    // Apply compression based on image type
    let outputBuffer: Buffer
    let mimetype: string

    if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
      outputBuffer = await imageProcessor.jpeg({ quality: options.quality }).toBuffer()
      mimetype = 'image/jpeg'
    } else if (metadata.format === 'png') {
      outputBuffer = await imageProcessor
        .png({
          quality: options.quality,
          compressionLevel: 9 // Max compression for PNGs
        })
        .toBuffer()
      mimetype = 'image/png'
    } else if (metadata.format === 'webp') {
      outputBuffer = await imageProcessor.webp({ quality: options.quality }).toBuffer()
      mimetype = 'image/webp'
    } else if (metadata.format === 'gif') {
      // Handle GIFs separately to preserve animation if possible
      outputBuffer = await imageProcessor.gif().toBuffer()
      mimetype = 'image/gif'
    } else {
      // For other formats, convert to JPEG
      outputBuffer = await imageProcessor.jpeg({ quality: options.quality }).toBuffer()
      mimetype = 'image/jpeg'
    }

    return {
      buffer: outputBuffer,
      filename,
      mimetype,
      size: outputBuffer.length
    }
  } catch (error) {
    log.error(`Image Compressing`, {
      context: 'Image Processor',
      error: error as Error
    })

    throw new Error(`An error occurred while compressing the image: ${error} `)
  }
}

// Specialized functions for avatars and banners
export const compressAvatar = async (
  file: Buffer,
  originalFilename: string
): Promise<CompressedImageResult> => {
  return compressImage(file, originalFilename, {
    quality: 85, // Higher quality for avatars
    maxWidth: 500, // Standard size for avatars
    maxHeight: 500,
    crop: true // Crop to square
  })
}

export const compressBanner = async (
  file: Buffer,
  originalFilename: string
): Promise<CompressedImageResult> => {
  return compressImage(file, originalFilename, {
    quality: 80,
    maxWidth: 1500, // Standard width for banners
    maxHeight: 500, // Standard height for banners
    crop: true // Crop to fit banner dimensions
  })
}
