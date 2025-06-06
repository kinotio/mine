declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string

      // PostgreSQL
      DATABASE_URL: string

      // Clerk
      CLERK_SECRET_KEY: string
      CLERK_WEBHOOK_SECRET: string
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      NEXT_PUBLIC_CLERK_BASE_URL: string
      NEXT_PUBLIC_CLERK_REDIRECT_BASE: string

      // Minio
      MINIO_ACCESS_KEY: string
      MINIO_SECRET_KEY: string
      NEXT_PUBLIC_MINIO_URL: string
      NEXT_PUBLIC_MINIO_ENDPOINT: string
      NEXT_PUBLIC_MINIO_PORT: string
      NEXT_PUBLIC_MINIO_USE_SSL: string

      // Redis
      REDIS_URL: string

      // Resend
      RESEND_API_KEY: string
    }
  }
}

export {}
