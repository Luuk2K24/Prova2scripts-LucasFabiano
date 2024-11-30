import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import 'react-toastify/ReactToastify.min.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'MegaMix',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ToastContainer />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
