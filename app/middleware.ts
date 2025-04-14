// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of routes that need authentication
const protectedRoutes = ['/', '/add-blog', '/blogs', '/settings'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;
  
  // Check if the current path starts with any of the protected routes
  const isProtected = protectedRoutes.some((route) => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !token) {
    // Redirect to login page with the current path as redirect parameter
    const loginUrl = new URL('/sigin', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next(); // Proceed if authenticated or not protected
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};