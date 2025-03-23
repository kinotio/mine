import { S3ClientConfig, CORSConfiguration } from '@aws-sdk/client-s3'

export const corsRules: CORSConfiguration = {
  CORSRules: [
    {
      AllowedOrigins: process.env.R2_ALLOWED_ORIGINS?.split(',') || ['*'],
      AllowedMethods: ['GET'],
      AllowedHeaders: ['*'],
      ExposeHeaders: ['ETag', 'Content-Type', 'Content-Length'],
      MaxAgeSeconds: 3000
    }
  ]
}

export const config: S3ClientConfig = {
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || ''
  }
}

export const bucket = process.env.R2_BUCKET
export const project = 'mine'
export const subFolders = {
  avatars: 'avatars',
  banners: 'banners',
  images: 'images'
}
