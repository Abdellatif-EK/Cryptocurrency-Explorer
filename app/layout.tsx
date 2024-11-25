import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CoinProvider } from '@/lib/CoinContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Market Explorer',
  description: 'Explore cryptocurrency market data and trends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CoinProvider>
          <div className="min-h-screen flex flex-col">
            <header className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md">
              <nav className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold">Crypto Explorer</Link>
                  <ul className="flex space-x-4">
                    <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
                    <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
                  </ul>
                </div>
              </nav>
            </header>
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-gray-800 text-white py-4">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; 2023 Crypto Explorer. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </CoinProvider>
      </body>
    </html>
  )
}

