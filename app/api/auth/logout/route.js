import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  // কুকি ডিলিট করে সেশন শেষ করা
  response.cookies.delete('pknet_auth');
  return response;
}
