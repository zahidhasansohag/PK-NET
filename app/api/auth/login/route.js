import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password, remember } = await req.json();

    // Vercel Environment Variables থেকে অ্যাডমিন ইউজার-পাসওয়ার্ড নেবে
    // যদি সেট করা না থাকে, তবে ডিফল্ট admin/admin123 কাজ করবে
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'admin123';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const response = NextResponse.json({ success: true, message: 'লগইন সফল হয়েছে!' });
      
      // Remember me সিলেক্ট করলে ৩০ দিন, নাহলে ১ দিনের মেয়াদ
      const maxAge = remember ? 30 * 24 * 60 * 60 : 24 * 60 * 60; 
      
      // সিকিউর কুকি সেট করা
      response.cookies.set({
        name: 'pknet_auth',
        value: 'authenticated', // বাস্তবে এখানে JWT টোকেন ব্যবহার করা যায়
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: maxAge,
        path: '/',
      });
      
      return response;
    }

    return NextResponse.json({ success: false, message: 'ভুল ইউজারনেম বা পাসওয়ার্ড!' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'সার্ভার এরর!' }, { status: 500 });
  }
}
