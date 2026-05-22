import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { username, password, profile } = await req.json();

    const routerUrl = process.env.MIKROTIK_URL; 
    const user = process.env.MIKROTIK_USER;
    const pass = process.env.MIKROTIK_PASS;

    if (!routerUrl || !user || !pass) {
      return NextResponse.json({ success: false, error: 'Environment variables সেট করা নেই!' });
    }

    const basicAuth = Buffer.from(`${user}:${pass}`).toString('base64');

    const response = await fetch(`${routerUrl}/rest/ip/hotspot/user`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: username,
        password: password,
        profile: profile,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ success: false, error: `রাউটার এরর: ${errorData}` });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
