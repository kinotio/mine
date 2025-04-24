import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([])

export default clerkMiddleware(async (auth, request) => {
  const url = request.nextUrl.clone()

  const { userId, sessionClaims } = await auth()

  if (userId) {
    const pathname = request.nextUrl.pathname
    const publicPaths = ['/legal', '/sign-in', '/sign-up', '/explore']
    
    if (pathname === '/' || publicPaths.some(path => pathname.startsWith(path))) {
      url.pathname = `/@${sessionClaims?.username}`
      return NextResponse.redirect(url)
    }
  }

  if (isProtectedRoute(request)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)'
  ]
}
