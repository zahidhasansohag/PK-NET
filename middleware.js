import { NextResponse } from 'next/server';

export function middleware(request) {
  const authCookie = request.cookies.get('pknet_auth');
  const isLoginPage = request.nextUrl.pathname === '/login';

  if (!authCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// BUG FIX #1: /users, /reports, /routers ছিল না — এখন যোগ করা হয়েছে।
// আগে এই পেজগুলো সম্পূর্ণ unprotected ছিল।
export const config = {
  matcher: ['/', '/login', '/users', '/reports', '/routers'],
};
