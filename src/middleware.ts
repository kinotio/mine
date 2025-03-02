import { NextResponse } from 'next/server'

export function middleware(request: Request) {
  const { pathname } = new URL(request.url)

  if (pathname === '/api/hello') {
    return NextResponse.json({ message: 'Hello, Next.js!' })
  }

  return NextResponse.next()
}
