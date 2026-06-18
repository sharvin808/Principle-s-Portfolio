'use client';

import { motion, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Particles from '../ui/Particles';
import type { Profile } from '@/lib/types';

interface HeroSectionProps {
  profile: Profile;
}

export default function HeroSection({ profile }: HeroSectionProps) {
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
            'radial-gradient(ellipse at 70% 50%, rgba(240, 231, 213, 0.08) 0%, transparent 60%)',
        }}
      />

      {/* Vertical Design Line */}
      <div 
        className="hidden lg:block absolute top-0 bottom-0 w-[0.50in] bg-[#F0E7D5] z-0 pointer-events-none"
        style={{ left: 'calc(6vw + 22vh)' }}
      />

      {/* Horizontal Design Line */}
      <div 
        className="hidden lg:block absolute left-0 right-0 h-[0.50in] bg-[#F0E7D5] z-0 pointer-events-none"
        style={{ bottom: '140px' }}
      />

      {/* Large Image on Left (Desktop Absolute, Mobile Inline) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
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
              <div className="text-center text-[#F0E7D5]/50">
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
            animate={{ opacity: 1, x: 0 }}
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
                  <div className="text-center text-[#F0E7D5]/50">
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
            animate="visible"
            className="text-center lg:text-left order-1 lg:order-2"
          >



            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#F0E7D5] leading-tight"
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
                  background: 'linear-gradient(90deg, #F0E7D5, #F7F2E8, transparent)',
                }}
              />
            </motion.div>

            {/* Designation */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium bg-gradient-to-r from-[#F0E7D5] to-[#F7F2E8] bg-clip-text text-transparent"
            >
              {profile.designation || 'Designation'}
            </motion.p>

            {/* Department */}
            <motion.p
              variants={itemVariants}
              className="mt-3 text-lg text-[#F0E7D5]/75"
            >
              {profile.department || 'Department'}
            </motion.p>

            {/* Institution */}
            <motion.p
              variants={itemVariants}
              className="mt-1 text-base text-[#F0E7D5]/60"
            >
              {profile.institution || 'Institution'}
            </motion.p>

            {/* Tagline */}
            {profile.tagline && (
              <motion.p
                variants={itemVariants}
                className="mt-6 text-base text-[#F0E7D5]/70 max-w-lg mx-auto lg:mx-0 leading-relaxed italic"
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
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center cursor-pointer"
        onClick={scrollToContent}
      >
        <motion.p
          className="text-[#F0E7D5] text-xs font-semibold tracking-widest uppercase mb-3"
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
          <ChevronDown size={24} className="text-[#F0E7D5]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
