'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Building2, Calendar, ChevronRight, Handshake } from 'lucide-react';
import type { Consultancy } from '@/lib/types';

interface ConsultancySectionProps {
  consultancy: Consultancy[];
}

export default function ConsultancySection({ consultancy }: ConsultancySectionProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  if (!consultancy || consultancy.length === 0) return null;

  return (
    <SectionWrapper
      id="consultancy"
      title="Consultancy"
      subtitle="Professional consulting and advisory roles"
      dark
    >
      {/* Vertical Timeline Layout */}
      <div className="relative">
        {/* Vertical connecting line */}
        <div
          className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.25) 5%, rgba(212,175,55,0.25) 95%, transparent 100%)',
          }}
        />

        <div className="space-y-6">
          {consultancy.map((item, index) => {
            const isOngoing = item.status?.toLowerCase().includes('ongoing');
            const isActive = activeCard === index;

            return (
              <ScrollReveal key={index} delay={index * 0.08}>
                <div className="relative flex items-start gap-5 md:gap-8">
                  {/* Timeline node */}
                  <div className="relative z-10 flex-shrink-0 mt-7">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive
                          ? '0 0 20px rgba(212,175,55,0.4), 0 0 40px rgba(212,175,55,0.15)'
                          : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.35 }}
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors duration-400 ${
                        isActive
                          ? 'bg-gold/15 border-gold/50'
                          : 'bg-surface border-white/8 hover:border-gold/20'
                      }`}
                      style={{
                        border: `1.5px solid ${isActive ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      {isOngoing ? (
                        <div className="relative">
                          <Handshake size={20} className={`transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/30'}`} />
                          {/* Active pulse ring */}
                          <span
                            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                            style={{
                              background: '#D4AF37',
                              boxShadow: '0 0 8px rgba(212,175,55,0.6)',
                              animation: 'pulse 2s infinite',
                            }}
                          />
                        </div>
                      ) : (
                        <Handshake size={20} className={`transition-colors duration-300 ${isActive ? 'text-gold' : 'text-white/30'}`} />
                      )}
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div
                    className="flex-1 group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500"
                    onClick={() => setActiveCard(isActive ? null : index)}
                    onMouseEnter={() => !isActive && setActiveCard(index)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(20,25,40,0.98) 0%, rgba(15,18,30,0.99) 100%)'
                        : 'linear-gradient(135deg, rgba(22,27,34,0.8) 0%, rgba(13,17,23,0.9) 100%)',
                      border: `1px solid ${isActive ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.05)'}`,
                      boxShadow: isActive
                        ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,55,0.08)'
                        : '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    <div className="p-6 md:p-8">
                      {/* Top meta row */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          {/* Status */}
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                            style={{
                              background: isOngoing ? 'rgba(212,175,55,0.1)' : 'rgba(16,185,129,0.1)',
                              color: isOngoing ? '#D4AF37' : '#10B981',
                              border: `1px solid ${isOngoing ? 'rgba(212,175,55,0.18)' : 'rgba(16,185,129,0.18)'}`,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: isOngoing ? '#D4AF37' : '#10B981',
                                boxShadow: `0 0 6px ${isOngoing ? 'rgba(212,175,55,0.5)' : 'rgba(16,185,129,0.5)'}`,
                              }}
                            />
                            {item.status || 'Completed'}
                          </span>

                          {/* Year badge */}
                          {item.year && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-white/35 font-mono">
                              <Calendar size={11} />
                              {item.year}
                            </span>
                          )}
                        </div>

                        {/* Expand indicator */}
                        <motion.div
                          animate={{ rotate: isActive ? 90 : 0, scale: isActive ? 1.1 : 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronRight size={16} className="text-white/15 group-hover:text-gold/50 transition-colors" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <h3
                        className="text-lg md:text-xl font-bold leading-snug mb-3 transition-colors duration-300"
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          color: isActive ? '#fff' : 'rgba(255,255,255,0.85)',
                        }}
                      >
                        {item.title}
                      </h3>

                      {/* Organization pill */}
                      {item.organization && (
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: 'rgba(212,175,55,0.06)',
                            border: '1px solid rgba(212,175,55,0.1)',
                            color: 'rgba(212,175,55,0.75)',
                          }}
                        >
                          <Building2 size={13} />
                          {item.organization}
                        </div>
                      )}

                      {/* Expandable Description */}
                      <AnimatePresence>
                        {isActive && item.description && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <div className="pt-5">
                              {/* Divider */}
                              <div className="flex items-center gap-3 mb-4">
                                <div
                                  className="h-px flex-grow max-w-[50px]"
                                  style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.35), transparent)' }}
                                />
                                <div className="w-1 h-1 rounded-full bg-gold/25" />
                              </div>

                              <p className="text-sm md:text-[15px] leading-7 text-white/50 max-w-3xl">
                                {item.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Bottom summary */}
      <div className="mt-10 flex items-center justify-center gap-3 text-xs text-white/25">
        <Handshake size={14} className="text-gold/30" />
        <span>{consultancy.length} consultancy roles</span>
        <span className="w-1 h-1 rounded-full bg-white/15" />
        <span>Hover or click to explore</span>
      </div>
    </SectionWrapper>
  );
}
