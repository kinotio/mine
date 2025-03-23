import { S3ClientConfig, CORSConfiguration } from '@aws-sdk/client-s3'

export const corsRules: CORSConfiguration = {
  CORSRules: [
    {
      AllowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
      AllowedMethods: ['GET', 'POST', 'HEAD'],
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

// Get bucket policy for public read access
export const getBucketPolicy = (bucket: string) => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: { AWS: '*' },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucket}/*`]
      }
    ]
  }
}

export const bucket = process.env.R2_BUCKET
