'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Qualification' },
  { id: 'experience', label: 'Experience' },
  { id: 'research-project', label: 'Projects' },
  { id: 'consultancy', label: 'Consultancy' },
  { id: 'publications', label: 'Publications' },
  { id: 'awards-achievements', label: 'Awards' },
  { id: 'paper-presentations', label: 'Presentations' },
  { id: 'research-interests', label: 'Interests' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'international-exposure', label: 'Intl Exposure' },
  { id: 'reviewer', label: 'Reviewer' },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle } = useTheme();

  // Show navbar only after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      // Navbar only visible if scrolled past hero (85% of viewport height)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    
    // Check initially
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveSection(hash);
      } else {
        // If no hash, check if we're past hero section
        if (window.scrollY > window.innerHeight * 0.5) {
          setActiveSection('about');
        } else {
          setActiveSection('');
        }
      }
    };

    const handleScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash && window.scrollY > window.innerHeight * 0.5) {
        setActiveSection('about');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    window.location.hash = id;
    setActiveSection(id);
    
    // Scroll to the specific section to make sure it's visible below the Hero
    setTimeout(() => {
      const contentEl = document.getElementById(id);
      if (contentEl) {
        const yOffset = -80;
        const y = contentEl.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
    
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-0 left-0 right-0 z-50 glass"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo / Name */}
              <button
                onClick={() => {
                  window.location.hash = 'about';
                  setActiveSection('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-lg font-semibold text-heading cursor-pointer hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                <span className="text-gradient-gold">Portfolio</span>
              </button>

              {/* Desktop Nav Items */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                      activeSection === id
                        ? 'text-gold'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {label}
                    {activeSection === id && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full"
                        style={{ background: 'var(--color-gold)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}

                {/* Theme toggle */}
                <button
                  onClick={toggle}
                  className="ml-3 w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              {/* Mobile controls */}
              <div className="flex md:hidden items-center gap-2">
                <button
                  onClick={toggle}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 cursor-pointer"
                  aria-label="Toggle dark mode"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden pb-4"
                >
                  <div className="flex flex-col gap-1">
                    {NAV_ITEMS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          activeSection === id
                            ? 'text-gold bg-gold-muted'
                            : 'text-foreground/70 hover:text-foreground hover:bg-surface-alt'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
