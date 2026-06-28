'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

export const SCROLL_ITEMS = [
  { id: 'international-exposure', label: 'International Exposure' },
];

export const EXTRA_ITEMS = [
  { id: 'publications', label: 'Publications' },
  { id: 'research-project', label: 'Projects' },
  { id: 'consultancy', label: 'Consultancy' },
  { id: 'paper-presentations', label: 'Presentations' },
  { id: 'reviewer', label: 'Reviewer' },
];

export const CONTACT_ITEM = { id: 'contact', label: 'Contact Me' };

interface NavbarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  selectedExtraSection: string | null;
  setSelectedExtraSection: (id: string | null) => void;
}

export default function Navbar({
  activeSection,
  setActiveSection,
  selectedExtraSection,
  setSelectedExtraSection,
}: NavbarProps) {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isExtraActive = EXTRA_ITEMS.some((item) => item.id === activeSection);

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
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for nav header height + padding
      
      // Check if we are at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
      if (isAtBottom) {
        setActiveSection(selectedExtraSection ? selectedExtraSection : 'contact');
        return;
      }

      // Check which section we are in
      const itemsToCheck = selectedExtraSection
        ? EXTRA_ITEMS.filter((item) => item.id === selectedExtraSection)
        : [...SCROLL_ITEMS, CONTACT_ITEM];

      let found = false;
      for (const item of itemsToCheck) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            found = true;
            break;
          }
        }
      }
      
      if (!found) {
        setActiveSection('');
      }
    };

    // Run initially
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedExtraSection, setActiveSection]);

  const scrollTo = (id: string) => {
    const isExtra = EXTRA_ITEMS.some((item) => item.id === id);
    
    if (isExtra) {
      setSelectedExtraSection(id);
    } else {
      setSelectedExtraSection(null);
    }

    setActiveSection(id);
    window.location.hash = id;
    
    // Scroll to the specific section or top
    setTimeout(() => {
      if (id === 'about') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const contentEl = document.getElementById(id);
        if (contentEl) {
          const yOffset = -80;
          const y = contentEl.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }, 150);
    
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
            <div className="flex items-center justify-between h-20">
              {/* Logo / Name */}
              <button
                onClick={() => {
                  setSelectedExtraSection(null);
                  setActiveSection('about');
                  window.location.hash = 'about';
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-1.5 text-2xl md:text-3xl font-bold text-heading cursor-pointer hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                <span className="text-gradient-gold">SMD</span>
              </button>

              {/* Desktop Nav Items */}
              <div className="hidden xl:flex items-center gap-1 xl:gap-2">
                {EXTRA_ITEMS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative px-2 xl:px-4 py-2 text-base xl:text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer xl:whitespace-nowrap ${
                      activeSection === id
                        ? 'text-background'
                        : 'text-foreground hover:bg-gold/5'
                    }`}
                  >
                    {activeSection === id && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gold shadow-md rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}

                {SCROLL_ITEMS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`relative px-2 xl:px-4 py-2 text-base xl:text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer xl:whitespace-nowrap ${
                      activeSection === id && !selectedExtraSection
                        ? 'text-background'
                        : 'text-foreground hover:bg-gold/5'
                    }`}
                  >
                    {activeSection === id && !selectedExtraSection && (
                      <motion.div
                        layoutId="active-pill"
                        className="absolute inset-0 bg-gold shadow-md rounded-lg -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                ))}

                {/* Contact Item */}
                <button
                  onClick={() => scrollTo(CONTACT_ITEM.id)}
                  className={`relative px-2 xl:px-4 py-2 text-base xl:text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer xl:whitespace-nowrap ${
                    activeSection === CONTACT_ITEM.id && !selectedExtraSection
                      ? 'text-background'
                      : 'text-foreground hover:bg-gold/5'
                  }`}
                >
                  {activeSection === CONTACT_ITEM.id && !selectedExtraSection && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-gold shadow-md rounded-lg -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{CONTACT_ITEM.label}</span>
                </button>
              </div>

              {/* Mobile controls */}
              <div className="flex xl:hidden items-center gap-2">
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-foreground cursor-pointer hover:bg-gold/5 transition-colors"
                  aria-label="Toggle menu"
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className="xl:hidden overflow-y-auto max-h-[80vh] pb-4 px-2"
                >
                  <div className="flex flex-col gap-1.5">
                    {EXTRA_ITEMS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`text-left px-4 py-3 rounded-lg text-lg font-semibold transition-all cursor-pointer ${
                          activeSection === id
                            ? 'text-background bg-gold shadow-md'
                            : 'text-foreground hover:bg-gold/10'
                        }`}
                      >
                        {label}
                      </button>
                    ))}

                    {SCROLL_ITEMS.map(({ id, label }) => (
                      <button
                        key={id}
                        onClick={() => scrollTo(id)}
                        className={`text-left px-4 py-3 rounded-lg text-lg font-semibold transition-all cursor-pointer ${
                          activeSection === id && !selectedExtraSection
                            ? 'text-background bg-gold shadow-md'
                            : 'text-foreground hover:bg-gold/10'
                        }`}
                      >
                        {label}
                      </button>
                    ))}

                    <div className="border-t border-border/10 my-1 pt-1.5">
                      <button
                        onClick={() => scrollTo(CONTACT_ITEM.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg text-lg font-semibold transition-all cursor-pointer ${
                          activeSection === CONTACT_ITEM.id && !selectedExtraSection
                            ? 'text-background bg-gold shadow-md'
                            : 'text-foreground hover:bg-gold/10'
                        }`}
                      >
                        {CONTACT_ITEM.label}
                      </button>
                    </div>
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
