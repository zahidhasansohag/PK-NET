import { Hind_Siliguri } from 'next/font/google';
import './globals.css';

// Hind Siliguri ফন্ট ইমপোর্ট ও কনফিগারেশন
const hindSiliguri = Hind_Siliguri({ 
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'PK-NET Premium',
  description: 'Advanced Mikrotik Hotspot Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={hindSiliguri.className}>
      <body className="bg-slate-50 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
