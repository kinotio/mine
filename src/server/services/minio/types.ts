export interface MinioConfig {
  endPoint: string
  port: number
  useSSL: boolean
  accessKey: string
  secretKey: string
}

export interface MinioUploadOptions {
  bucket: string
  file: File
  metadata?: Record<string, string>
  cacheControl?: string
}

export interface MinioUploadResult {
  url: string
  name: string
  type: string
  size: number
}
