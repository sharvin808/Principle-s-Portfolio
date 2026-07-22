'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);

      // Detect background color under the button position
      const x = window.innerWidth - 100;
      const y = window.innerHeight - 100;

      const element = document.elementFromPoint(x, y);
      if (element) {
        const parentSection = element.closest('section, footer');
        if (parentSection) {
          const isDark =
            parentSection.classList.contains('bg-oxford-theme') ||
            parentSection.classList.contains('hero-gradient') ||
            parentSection.tagName.toLowerCase() === 'footer';
          setIsOverDark(isDark);
        } else {
          setIsOverDark(false);
        }
      }
    };

    // Run initially
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            backgroundColor: isOverDark ? '#FFFFF0' : '#102A4A',
            color: isOverDark ? '#102A4A' : '#FFFFFF',
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer border border-border/10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp size={20} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
