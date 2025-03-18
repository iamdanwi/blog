import { Inter as FontSans } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import "./globals.css"
import Navigation from "./components/Navigation";
import { AuthProvider } from "./contexts/AuthContext";
import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  metadataBase: new URL('https://techinsights.com'),
  title: {
    default: 'TechInsights - Expert Tech Blog',
    template: '%s | TechInsights'
  },
  description: 'In-depth articles and tutorials on Computer Science, Cybersecurity, and IT Infrastructure.',
  keywords: ['tech blog', 'computer science', 'cybersecurity', 'IT infrastructure', 'programming', 'software development'],
  authors: [{ name: 'TechInsights Team' }],
  creator: 'TechInsights',
  publisher: 'TechInsights',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://techinsights.com',
    siteName: 'TechInsights',
    title: 'TechInsights - Expert Tech Blog',
    description: 'In-depth articles and tutorials on Computer Science, Cybersecurity, and IT Infrastructure.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechInsights'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechInsights - Expert Tech Blog',
    description: 'In-depth articles and tutorials on Computer Science, Cybersecurity, and IT Infrastructure.',
    images: ['/images/og-image.jpg'],
    creator: '@techinsights'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <div className="flex-grow">
                <main className="max-w-screen-xl mx-auto px-4 py-8">
                  {children}
                </main>
              </div>
              <footer className="bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-screen-xl mx-auto px-4 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-2 space-y-4">
                      <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                        TechInsights
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md">
                        Exploring the intersection of Computer Science, Cybersecurity, and IT through in-depth articles and analysis.
                      </p>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                          <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Categories</h3>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <Link href="/posts/computer-science" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            Computer Science
                          </Link>
                        </li>
                        <li>
                          <Link href="/posts/cybersecurity" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            Cybersecurity
                          </Link>
                        </li>
                        <li>
                          <Link href="/posts/it" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            IT & Infrastructure
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Company</h3>
                      <ul className="space-y-3 text-sm">
                        <li>
                          <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            About
                          </a>
                        </li>
                        <li>
                          <a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            Contact
                          </a>
                        </li>
                        <li>
                          <a href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            Privacy Policy
                          </a>
                        </li>
                        <li>
                          <a href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                            Terms of Service
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                      <p>© {new Date().getFullYear()} TechInsights. All rights reserved.</p>
                      <p className="mt-2">
                        Built with{' '}
                        <a
                          href="https://nextjs.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          Next.js
                        </a>
                        {' '}and{' '}
                        <a
                          href="https://tailwindcss.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          Tailwind CSS
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
