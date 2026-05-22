import { NextResponse } from 'next/server';

export function middleware(request) {
  // কুকি থেকে ইউজারের সেশন চেক করা
  const authCookie = request.cookies.get('pknet_auth');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // যদি লগইন না থাকে এবং লগইন পেজে না থাকে, তবে লগইনে রিডাইরেক্ট করো
  if (!authCookie && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // যদি লগইন করা থাকে এবং আবার লগইন পেজে যেতে চায়, তবে ড্যাশবোর্ডে পাঠাও
  if (authCookie && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// কোন কোন পেজে এই সিকিউরিটি কাজ করবে
export const config = {
  matcher: ['/', '/login'],
};
