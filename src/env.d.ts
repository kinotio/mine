declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      NEXT_PUBLIC_CLERK_BASE_URL: string
      NEXT_PUBLIC_CLERK_REDIRECT_BASE: string
      NEXT_PUBLIC_BASE_URL: string
      NEXT_PUBLIC_MINIO_URL: string
      NEXT_PUBLIC_MINIO_ENDPOINT: string
      NEXT_PUBLIC_MINIO_PORT: string

      DATABASE_URL: string
      CLERK_SECRET_KEY: string
      CLERK_WEBHOOK_SECRET: string
      MINIO_ACCESS_KEY: string
      MINIO_SECRET_KEY: string
      REDIS_URL: string
      RESEND_API_KEY: string
    }
  }
}

export {}
