import { Heart } from 'lucide-react';
import type { Profile } from '@/lib/types';

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-oxford-theme border-t py-12 px-4 md:px-8" style={{ borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Name */}
          <div className="text-center md:text-left">
            <h3
              className="text-xl font-semibold text-heading"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {profile.name || 'Academic Portfolio'}
            </h3>
            <p className="text-muted text-sm mt-1">
              {profile.designation}
              {profile.institution ? ` • ${profile.institution}` : ''}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted">
            {[
              { label: 'Home', href: '#about' },
              { label: 'Publications', href: '#publications' },
              { label: 'Projects', href: '#research-project' },
              { label: 'Contact', href: '#contact' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t" style={{ borderColor: 'var(--border-color)' }} />

        {/* Copyright */}
        <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted">
          <p className="text-center">
            © {currentYear} {profile.name || 'Academic Portfolio'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
