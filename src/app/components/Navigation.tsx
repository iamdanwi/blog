"use client";
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from 'react';

const Navigation = () => {
  const { user, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="group">
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400">
                TechInsights
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              {[
                { href: '/posts/computer-science', label: 'Computer Science' },
                { href: '/posts/cybersecurity', label: 'Cybersecurity' },
                { href: '/posts/it', label: 'IT' },
                { href: '/about', label: 'About' }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="text-sm"
                  asChild
                >
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => signInWithGoogle()}
                >
                  Log in
                </Button>
                <Button
                  className="text-sm bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 dark:text-gray-900 hover:opacity-90"
                  onClick={() => signInWithGoogle()}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-gray-400"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
          <div className="px-4 py-2 space-y-1">
            {[
              { href: '/posts/computer-science', label: 'Computer Science' },
              { href: '/posts/cybersecurity', label: 'Cybersecurity' },
              { href: '/posts/it', label: 'IT' },
              { href: '/about', label: 'About' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      signInWithGoogle();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full mt-2 px-4 py-2 text-sm text-white bg-black dark:bg-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 