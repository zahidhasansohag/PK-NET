import './globals.css'

export const metadata = {
  title: 'Mikrotik Hotspot Pro',
  description: 'Modern Hotspot Voucher Generator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  )
}