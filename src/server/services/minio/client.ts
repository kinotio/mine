import * as Minio from 'minio'

export const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
  port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY
})
