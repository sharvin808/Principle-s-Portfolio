'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { FlaskConical, DollarSign, Calendar, ExternalLink, ChevronDown } from 'lucide-react';
import type { ResearchProject } from '@/lib/types';

interface ResearchProjectSectionProps {
  researchProject: ResearchProject[];
}

export default function ResearchProjectSection({ researchProject }: ResearchProjectSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!researchProject || researchProject.length === 0) return null;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="research-project"
      title="Research & Academic Projects"
      subtitle="Sponsored research projects, institutional grants, and educational initiatives"
      dark
    >
      <div className="space-y-5">
        {researchProject.map((proj, index) => {
          const isOngoing = proj.status?.toLowerCase().includes('ongoing');
          const isExpanded = expandedIndex === index;

          return (
            <ScrollReveal key={index} delay={index * 0.08}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
                onClick={() => toggleExpand(index)}
                style={{
                  background: isExpanded
                    ? 'linear-gradient(135deg, rgba(20,25,40,0.98) 0%, rgba(15,18,30,0.99) 100%)'
                    : 'linear-gradient(135deg, rgba(22,27,34,0.95) 0%, rgba(13,17,23,0.98) 100%)',
                  border: `1px solid ${isExpanded ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  boxShadow: isExpanded
                    ? '0 8px 40px rgba(0,0,0,0.3), 0 0 60px rgba(212,175,55,0.05)'
                    : '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                {/* Gold left accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-500"
                  style={{
                    background: isExpanded
                      ? 'linear-gradient(180deg, #D4AF37 0%, #E5C158 50%, #D4AF37 100%)'
                      : 'linear-gradient(180deg, rgba(212,175,55,0.3) 0%, rgba(212,175,55,0.1) 100%)',
                    boxShadow: isExpanded ? '0 0 12px rgba(212,175,55,0.3)' : 'none',
                  }}
                />

                {/* Decorative corner glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 100% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10 p-6 md:p-8 pl-8 md:pl-10">
                  {/* Top Row: Index + Status + Year */}
                  <div className="flex items-center gap-4 mb-5">
                    {/* Numbered Index Badge */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                      style={{
                        background: 'rgba(212,175,55,0.1)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        color: '#D4AF37',
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap flex-1">
                      {/* Status chip */}
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider"
                        style={{
                          background: isOngoing
                            ? 'rgba(212,175,55,0.12)'
                            : 'rgba(16,185,129,0.12)',
                          color: isOngoing ? '#D4AF37' : '#10B981',
                          border: `1px solid ${isOngoing ? 'rgba(212,175,55,0.2)' : 'rgba(16,185,129,0.2)'}`,
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isOngoing ? '#D4AF37' : '#10B981',
                            boxShadow: `0 0 6px ${isOngoing ? 'rgba(212,175,55,0.5)' : 'rgba(16,185,129,0.5)'}`,
                          }}
                        />
                        {proj.status || 'Completed'}
                      </span>

                      {/* Year */}
                      {proj.year && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-white/35 font-mono">
                          <Calendar size={11} />
                          {proj.year}
                        </span>
                      )}
                    </div>

                    {/* Expand chevron */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown size={18} className="text-white/25 group-hover:text-gold/60 transition-colors" />
                    </motion.div>
                  </div>

                  {/* Title Row */}
                  <div className="flex items-start gap-4">
                    <FlaskConical
                      size={20}
                      className={`flex-shrink-0 mt-1 transition-colors duration-300 ${
                        isExpanded ? 'text-gold' : 'text-white/20 group-hover:text-gold/50'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg md:text-xl font-bold leading-snug transition-colors duration-300"
                        style={{
                          fontFamily: 'var(--font-playfair), Georgia, serif',
                          color: isExpanded ? '#fff' : 'rgba(255,255,255,0.85)',
                        }}
                      >
                        {proj.title}
                      </h3>

                      {/* Funding Agency — always visible */}
                      {proj.fundingAgency && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                          style={{
                            background: 'rgba(212,175,55,0.06)',
                            border: '1px solid rgba(212,175,55,0.12)',
                            color: 'rgba(212,175,55,0.8)',
                          }}
                        >
                          <DollarSign size={13} />
                          {proj.fundingAgency}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Expandable Description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 pl-10 md:pl-10">
                          {/* Divider */}
                          <div className="flex items-center gap-3 mb-5">
                            <div className="h-px flex-grow max-w-[60px]"
                              style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }}
                            />
                            <div className="w-1 h-1 rounded-full bg-gold/30" />
                          </div>

                          {proj.description && (
                            <p className="text-sm md:text-[15px] leading-7 text-white/55 max-w-3xl">
                              {proj.description}
                            </p>
                          )}

                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-gold hover:text-gold-light transition-colors"
                            >
                              View Project Details <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Bottom summary */}
      <div className="mt-10 flex items-center justify-center gap-3 text-xs text-white/25">
        <FlaskConical size={14} className="text-gold/30" />
        <span>{researchProject.length} research projects</span>
        <span className="w-1 h-1 rounded-full bg-white/15" />
        <span>Click to expand details</span>
      </div>
    </SectionWrapper>
  );
}
