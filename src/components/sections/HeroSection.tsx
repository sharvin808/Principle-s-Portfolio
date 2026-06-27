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
      className="text-lg md:text-lg text-[#dad7cd]/70 leading-relaxed text-center lg:text-left"
    >
      {parts.map((part, pIdx) => {
        const isMatch = HIGHLIGHT_WORDS.some(word => 
          part.toLowerCase() === word.toLowerCase()
        );
        if (isMatch) {
          return (
            <span key={pIdx} className="font-bold text-[#dad7cd]">
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
    <section className="relative h-auto min-h-[90vh] py-12 lg:py-40 lg:h-auto 2xl:py-0 2xl:h-[90vh] flex items-center overflow-hidden hero-gradient w-[96%] lg:w-[98%] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[3rem] my-4 md:my-8">
      {/* Particles Background */}
      <Particles />



      {/* Radial light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 50%, rgba(218, 215, 205, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Vertical Design Line */}
      <div 
        className="hidden lg:block absolute top-0 bottom-0 w-[0.40in] bg-[#dad7cd] z-0 pointer-events-none"
        style={{ left: 'calc(6vw + 22vh)' }}
      />

      {/* Horizontal Design Line */}
      <div 
        className="hidden lg:block absolute left-0 right-0 h-[0.40in] bg-[#dad7cd] z-0 pointer-events-none"
        style={{ bottom: '120px' }}
      />
      
      {/* Large Image on Left (Desktop Absolute, Mobile Inline) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex absolute left-[6vw] bottom-0 w-[45vw] h-full items-end justify-start z-10 pointer-events-none"
      >
        <div className="relative w-full h-full flex items-end">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoUrl}
              alt={profile.name || 'Principal Portrait'}
              className="w-full h-full object-contain object-left-bottom pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to right, black 92%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 92%, transparent 100%)'
              }}
            />
          ) : (
            <div className="w-full h-[75vh] flex items-center justify-center bg-[#2F4F4F]/50 rounded-2xl m-8">
              <div className="text-center text-[#dad7cd]/50">
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
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={!isLoading ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-start order-2 lg:order-1 w-full pb-8 md:pb-16 lg:pb-0"
          >
            {/* On mobile: show the image normally in flow */}
            <div className="relative w-full h-[45vh] md:h-[50vh] lg:hidden mt-8 md:mt-12">
              {profile.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.photoUrl}
                  alt={profile.name || 'Principal Portrait'}
                  className="w-full h-full object-contain object-bottom"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#2F4F4F]/50 rounded-2xl">
                  <div className="text-center text-[#dad7cd]/50">
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
            className="text-center lg:text-left order-1 lg:order-2 lg:-ml-12 xl:-ml-20 lg:-mt-16"
          >



            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-[#dad7cd] leading-tight whitespace-normal xl:whitespace-nowrap"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {profile.name || (
                <span className="opacity-40">Principal&apos;s Name</span>
              )}
            </motion.h1>

            {/* Gold divider */}
            <motion.div
              variants={itemVariants}
              className="mt-6 mb-2 mx-auto lg:mx-0"
            >
              <div
                className="h-0.5 w-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #dad7cd, #F7F2E8, transparent)',
                }}
              />
            </motion.div>

            {/* Designation */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[#dad7cd] to-[#F7F2E8] bg-clip-text text-transparent"
            >
              {profile.designation || 'Designation'}
            </motion.p>

            {/* Institution */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-[#dad7cd]/70 leading-tight"
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
                className="mt-6 text-base md:text-lg text-[#dad7cd]/70 whitespace-normal mx-auto lg:mx-0 leading-relaxed italic"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                &ldquo;{profile.tagline}&rdquo;
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Cut-out Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-0 right-0 z-20 flex"
      >
        <div className="relative bg-background rounded-tl-[2rem] md:rounded-tl-[3rem] p-4 md:p-6 pl-6 md:pl-8 pt-6 md:pt-8">
          {/* Top-right inverted corner */}
          <svg className="absolute right-0 top-[-2rem] w-8 h-8 fill-background pointer-events-none" viewBox="0 0 32 32">
            <path d="M 0 32 A 32 32 0 0 0 32 0 L 32 32 Z" />
          </svg>
          {/* Bottom-left inverted corner */}
          <svg className="absolute bottom-0 left-[-2rem] w-8 h-8 fill-background pointer-events-none" viewBox="0 0 32 32">
            <path d="M 0 32 A 32 32 0 0 0 32 0 L 32 32 Z" />
          </svg>

          <button 
            onClick={scrollToContent}
            className="group flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-[#1C422D] border border-border/20 rounded-full text-[#dad7cd] text-sm font-bold tracking-widest uppercase hover:bg-[#2F4F4F] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Scroll to explore
            <div className="bg-[#dad7cd]/10 rounded-full p-1 group-hover:bg-[#dad7cd]/20 transition-colors">
              <ChevronDown size={18} className="animate-bounce text-[#dad7cd]" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
