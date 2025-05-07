import { minioClient } from '@/server/services/minio/client'
import { getBucketPolicy } from './config'
import type {
  MinioConfig,
  MinioUploadOptions,
  MinioUploadResult
} from '@/server/services/minio/types'

export type { MinioConfig, MinioUploadOptions, MinioUploadResult }

export { minioClient, getBucketPolicy }

const minio = {
  client: minioClient,
  getBucketPolicy
}

export default minio
