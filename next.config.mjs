/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        pathname: '/**'
      },
      {
        protocol: process.env.MINIO_PROTOCOL || 'https',
        hostname: process.env.MINIO_ENDPOINT || 'your-minio-domain.com',
        port: process.env.MINIO_PORT || '',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig
