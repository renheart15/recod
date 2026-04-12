'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Speakers', href: '/speaker#speakers' },
  { label: 'Panels', href: '/panel#panels' },
  { label: 'Program', href: '/program#program' },
  { label: 'Evaluation', href: '/notFound' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/6   0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <img 
              src="/images/logo/recod-logo.png" 
              alt="CTU RECOD 2026 Logo" 
              className="h-auto w-[50px]"
            />
            <span className="hidden sm:inline-block font-bold text-foreground">RECOD 2026</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/notFound"
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:shadow-md transition-all duration-200 hover:brightness-110"
            >
              Join Zoom
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#zoom"
              className="px-4 py-2 mt-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-center hover:brightness-110 transition-all duration-200"
            >
              Join Zoom
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
