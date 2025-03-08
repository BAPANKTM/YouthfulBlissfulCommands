
export const metadata = {
  title: 'TeleShare',
  description: 'Secure file sharing application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
