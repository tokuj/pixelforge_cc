import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/common/ThemeProvider'

export const metadata: Metadata = {
  title: 'PixelForge - Transform your photos into pixel art',
  description: 'Convert your images into stunning pixel art with customizable settings, presets, and effects.',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'PixelForge',
    description: 'Transform your photos into pixel art masterpieces',
    url: 'https://pixelforge-xxxxx-an.a.run.app',
    siteName: 'PixelForge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelForge',
    description: 'Transform your photos into pixel art masterpieces',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}