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
            'radial-gradient(ellipse at 70% 50%, rgba(212, 175, 55, 0.06) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Gold accent frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-gold via-gold-dark to-transparent opacity-40" />
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-gold/30 to-transparent" />

              {/* Portrait */}
              <div className="portrait-frame relative w-72 h-80 md:w-80 md:h-96 lg:w-[340px] lg:h-[420px]">
                {profile.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.photoUrl}
                    alt={profile.name || 'Principal Portrait'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-navy-light/50">
                    <div className="text-center text-white/40">
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

              {/* Soft glow behind */}
              <div
                className="absolute -inset-8 rounded-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(212, 175, 55, 0.08) 0%, transparent 70%)',
                }}
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-1 lg:order-2"
          >
            {/* Greeting line */}
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-6"
                style={{
                  background: 'rgba(212, 175, 55, 0.12)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}>
                Hello I'm 
              </span>
            </motion.div>


            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
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
                  background: 'linear-gradient(90deg, #D4AF37, #E5C158, transparent)',
                }}
              />
            </motion.div>

            {/* Designation */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium text-gradient-gold"
            >
              {profile.designation || 'Designation'}
            </motion.p>

            {/* Department */}
            <motion.p
              variants={itemVariants}
              className="mt-3 text-lg text-white/70"
            >
              {profile.department || 'Department'}
            </motion.p>

            {/* Institution */}
            <motion.p
              variants={itemVariants}
              className="mt-1 text-base text-white/50"
            >
              {profile.institution || 'Institution'}
            </motion.p>

            {/* Tagline */}
            {profile.tagline && (
              <motion.p
                variants={itemVariants}
                className="mt-6 text-base text-white/60 max-w-lg mx-auto lg:mx-0 leading-relaxed italic"
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
          className="text-white/40 text-xs tracking-widest uppercase mb-3"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
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
          <ChevronDown size={24} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
