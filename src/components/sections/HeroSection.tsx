'use client';

import { motion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Particles from '../ui/Particles';
import { useLoading } from '../ui/LoadingContext';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
  profile: Profile;
}

const HIGHLIGHT_WORDS = [
  "executive director",
  "Honorary Professor",
  "Honorary (Principal Fellow)",
  "Vice President",
  "Director"
];

function renderLine(line: string, idx: number, itemVariants: Variants) {
  const sortedWords = [...HIGHLIGHT_WORDS].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sortedWords.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|')})`, 'gi');
  const parts = line.split(regex);

  return (
    <motion.div
      key={idx}
      variants={itemVariants}
      className="text-sm md:text-base text-[#fcefd2]/70 leading-relaxed text-center lg:text-left"
    >
      {parts.map((part, pIdx) => {
        const isMatch = HIGHLIGHT_WORDS.some(word => 
          part.toLowerCase() === word.toLowerCase()
        );
        if (isMatch) {
          return (
            <span key={pIdx} className="font-bold text-[#fcefd2]">
              {part}
            </span>
          );
        }
        return <span key={pIdx}>{part}</span>;
      })}
    </motion.div>
  );
}

function renderHonorsText(text: string, itemVariants: Variants) {
  if (!text) return null;

  // Split by newlines first to respect existing line breaks
  const initialLines = text.split(/[\r\n]+/).map(l => l.trim()).filter(Boolean);
  const finalLines: string[] = [];

  const sortedWords = [...HIGHLIGHT_WORDS].sort((a, b) => b.length - a.length);

  initialLines.forEach(line => {
    const lowerLine = line.toLowerCase();
    const covered = new Array(line.length).fill(false);
    const splitPoints: number[] = [];

    // Find all matches for each keyword
    sortedWords.forEach(word => {
      const lowerWord = word.toLowerCase();
      let startIdx = 0;
      while ((startIdx = lowerLine.indexOf(lowerWord, startIdx)) !== -1) {
        const endIdx = startIdx + lowerWord.length;
        
        // Check if any character in this match is already covered
        let isCovered = false;
        for (let i = startIdx; i < endIdx; i++) {
          if (covered[i]) {
            isCovered = true;
            break;
          }
        }

        if (!isCovered) {
          // Mark characters as covered
          for (let i = startIdx; i < endIdx; i++) {
            covered[i] = true;
          }
          // Record the split point
          splitPoints.push(startIdx);
        }
        
        startIdx += 1;
      }
    });

    // Sort split points ascending
    splitPoints.sort((a, b) => a - b);

    // If no split points, add the whole line
    if (splitPoints.length === 0) {
      finalLines.push(line);
      return;
    }

    // Split line by the split points
    let currentStart = 0;
    for (let i = 0; i < splitPoints.length; i++) {
      const splitPoint = splitPoints[i];
      if (splitPoint > currentStart) {
        const precedingSegment = line.substring(currentStart, splitPoint).trim();
        const cleaned = precedingSegment.replace(/[,;\s]+$/, '');
        if (cleaned) {
          finalLines.push(cleaned);
        }
      }
      currentStart = splitPoint;
    }
    
    // Add the final segment
    if (currentStart < line.length) {
      const remainingSegment = line.substring(currentStart).trim();
      const cleaned = remainingSegment.replace(/[,;\s]+$/, '');
      if (cleaned) {
        finalLines.push(cleaned);
      }
    }
  });

  return (
    <div className="mt-3.5 flex flex-col gap-1.5">
      {finalLines.map((line, idx) => renderLine(line, idx, itemVariants))}
    </div>
  );
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const isLoading = useLoading();

  const scrollToContent = () => {
    // Scroll past the Hero section (which is 100vh tall)
    window.scrollTo({
      top: window.innerHeight - 80, // account for navbar
      behavior: 'smooth'
    });
  };

  // Staggered text animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="relative h-screen flex items-center overflow-hidden hero-gradient">
      {/* Particles Background */}
      <Particles />

      {/* Radial light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(252, 239, 210, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Vertical Design Line */}
      <div 
        className="hidden lg:block absolute top-0 bottom-0 w-[0.50in] bg-[#fcefd2] z-0 pointer-events-none"
        style={{ left: 'calc(6vw + 22vh)' }}
      />

      {/* Horizontal Design Line */}
      <div 
        className="hidden lg:block absolute left-0 right-0 h-[0.50in] bg-[#fcefd2] z-0 pointer-events-none"
        style={{ bottom: '120px' }}
      />

      {/* Large Image on Left (Desktop Absolute, Mobile Inline) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex absolute left-[6vw] bottom-0 w-[45vw] h-[92vh] items-end justify-start z-10 pointer-events-none"
      >
        <div className="relative w-full h-full flex items-end">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoUrl}
              alt={profile.name || 'Principal Portrait'}
              className="w-full h-full object-contain object-left-bottom pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to right, black 80%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 98%)'
              }}
            />
          ) : (
            <div className="w-full h-[75vh] flex items-center justify-center bg-[#212842]/50 rounded-2xl m-8">
              <div className="text-center text-[#fcefd2]/50">
                <div
                  className="text-8xl mb-4"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {(profile.name || 'P').charAt(0)}
                </div>
                <p className="text-sm">Portrait Placeholder</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-start order-2 lg:order-1 w-full"
          >
            {/* On mobile: show the image normally in flow */}
            <div className="relative w-full h-[50vh] md:h-[60vh] lg:hidden">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt={profile.name || 'Principal Portrait'}
                  className="w-full h-full object-contain object-bottom"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#212842]/50 rounded-2xl">
                  <div className="text-center text-[#fcefd2]/50">
                    <div
                      className="text-6xl mb-2"
                      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                    >
                      {(profile.name || 'P').charAt(0)}
                    </div>
                    <p className="text-xs">Portrait</p>
                  </div>
                </div>
              )}
            </div>

            {/* On desktop: just an empty spacer to keep grid alignment */}
            <div className="hidden lg:block w-full h-[75vh]" />
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={!isLoading ? "visible" : "hidden"}
            className="text-center lg:text-left order-1 lg:order-2"
          >



            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-[#fcefd2] leading-tight whitespace-nowrap"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {profile.name || (
                <span className="opacity-40">Principal&apos;s Name</span>
              )}
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              variants={itemVariants}
              className="mt-6 mb-6 mx-auto lg:mx-0"
            >
              <div
                className="h-0.5 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #fcefd2, #F7F2E8, transparent)',
                }}
              />
            </motion.div>

            {/* Designation */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[#fcefd2] to-[#F7F2E8] bg-clip-text text-transparent"
            >
              {profile.designation || 'Designation'}
            </motion.p>

            {/* Institution */}
            <motion.p
              variants={itemVariants}
              className="mt-2 text-base md:text-lg text-[#fcefd2]/70"
            >
              {profile.institution || 'Institution'}
            </motion.p>

            {/* Other Honors */}
            {profile.otherHonors && (
              <div className="w-full">
                {renderHonorsText(profile.otherHonors, itemVariants)}
              </div>
            )}

            {/* Tagline */}
            {profile.tagline && (
              <motion.p
                variants={itemVariants}
                className="mt-6 text-base text-[#fcefd2]/70 max-w-lg mx-auto lg:mx-0 leading-relaxed italic"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                &ldquo;{profile.tagline}&rdquo;
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        onClick={scrollToContent}
      >
        <motion.p
          className="text-[#fcefd2] text-xs font-semibold tracking-widest uppercase mb-3"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to explore
        </motion.p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown size={24} className="text-[#fcefd2]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
