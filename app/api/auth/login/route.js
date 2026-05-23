import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password, remember } = await req.json();

    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ success: true, message: 'লগইন সফল হয়েছে!' });

      // remember me → ৩০ দিন, নাহলে → ১ দিন
      const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60;

      response.cookies.set({
        name: 'pknet_auth',
        value: 'authenticated',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: maxAge,
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'সার্ভার এরর!' },
      { status: 500 }
    );
  }
}