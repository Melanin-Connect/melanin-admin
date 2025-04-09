// // app/middleware.ts
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// // List of routes that need authentication
// const protectedRoutes = ['/]'];

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get('token')?.value;

//   const { pathname } = request.nextUrl;
//   const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

//   if (isProtected && !token) {
//     const loginUrl = new URL('/login', request.url);
//     loginUrl.searchParams.set('redirect', pathname); // Preserve intended path
//     return NextResponse.redirect(loginUrl);
//   }

//   return NextResponse.next(); // Proceed if authenticated or not protected
// }

// // Only run middleware on these paths
// export const config = {
//   matcher: ['//:path*'],
// };
