'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Handshake, ChevronDown, Building2, Calendar } from 'lucide-react';
import type { Consultancy } from '@/lib/types';

interface ConsultancySectionProps {
  consultancy: Consultancy[];
}

export default function ConsultancySection({ consultancy }: ConsultancySectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!consultancy || consultancy.length === 0) return null;

  const ongoingCount = consultancy.filter(
    (c) => c.status?.toLowerCase().includes('ongoing')
  ).length;

  return (
    <SectionWrapper
      id="consultancy"
      title="Consultancy"
      subtitle="Professional consulting and advisory roles"
      theme="oxford"
    
      cutout="top-left"
    >
      {/* Summary bar */}
      <ScrollReveal>
        <div
          className="flex flex-wrap items-center gap-6 mb-8 p-4 rounded-2xl"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex items-center gap-2">
            <Handshake size={16} style={{ color: 'var(--color-gold)' }} />
            <span className="text-base font-semibold text-heading">
              {consultancy.length} Roles
            </span>
          </div>
          {ongoingCount > 0 && (
            <>
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: 'var(--border-color)' }}
              />
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: 'var(--color-gold)',
                    boxShadow: '0 0 6px var(--color-gold-muted)',
                    animation: 'pulse 2s infinite',
                  }}
                />
                <span className="text-lg text-muted">
                  {ongoingCount} Ongoing
                </span>
              </div>
            </>
          )}
        </div>
      </ScrollReveal>

      {/* Ledger */}
      <ScrollReveal>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border-color)',
          }}
        >
          {/* Table Header */}
          <div className="ledger-header">
            <span>Role / Title</span>
            <span>Organization</span>
            <span>Year</span>
            <span>Status</span>
          </div>

          {/* Table Rows */}
          {consultancy.map((item, index) => {
            const isOngoing = item.status?.toLowerCase().includes('ongoing');
            const isExpanded = expandedIndex === index;

            return (
              <div key={index}>
                {/* Data Row */}
                <div
                  className="ledger-row group"
                  onClick={() =>
                    setExpandedIndex(isExpanded ? null : index)
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setExpandedIndex(isExpanded ? null : index);
                    }
                  }}
                >
                  {/* Role */}
                  <div className="min-w-0">
                    <h3
                      className="text-lg md:text-lg font-bold text-heading leading-snug truncate"
                      style={{
                        fontFamily: 'var(--font-playfair), Georgia, serif',
                      }}
                      title={item.title}
                    >
                      {item.title}
                    </h3>
                    {/* Mobile-only: org + year */}
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 md:hidden">
                      {item.organization && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted">
                          <Building2 size={11} />
                          {item.organization}
                        </span>
                      )}
                      {item.year && (
                        <span className="inline-flex items-center gap-1 text-sm text-muted font-mono">
                          <Calendar size={11} />
                          {item.year}
                        </span>
                      )}
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-semibold"
                        style={{
                          color: isOngoing ? 'var(--color-gold)' : 'var(--muted)',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: isOngoing ? 'var(--color-gold)' : 'var(--muted)',
                            ...(isOngoing ? { animation: 'pulse 2s infinite' } : {}),
                          }}
                        />
                        {item.status || 'Completed'}
                      </span>
                    </div>
                  </div>

                  {/* Organization (desktop) */}
                  <div className="hidden md:flex items-center gap-2 min-w-0">
                    <Building2
                      size={14}
                      className="flex-shrink-0"
                      style={{ color: 'var(--muted)' }}
                    />
                    <span className="text-lg text-foreground/80 truncate">
                      {item.organization || '—'}
                    </span>
                  </div>

                  {/* Year (desktop) */}
                  <div className="hidden md:block">
                    <span className="text-lg text-muted font-mono">
                      {item.year || '—'}
                    </span>
                  </div>

                  {/* Status (desktop) */}
                  <div className="hidden md:flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: isOngoing ? 'var(--color-gold)' : 'var(--muted)',
                          boxShadow: isOngoing
                            ? '0 0 6px var(--color-gold-muted)'
                            : '0 0 6px rgba(33,40,66,0.4)',
                          ...(isOngoing ? { animation: 'pulse 2s infinite' } : {}),
                        }}
                      />
                      <span
                        style={{
                          color: isOngoing ? 'var(--color-gold)' : 'var(--muted)',
                        }}
                      >
                        {item.status || 'Completed'}
                      </span>
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="ml-2"
                    >
                      <ChevronDown
                        size={14}
                        className="text-muted/40 group-hover:text-foreground/60 transition-colors"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Expand Row */}
                <AnimatePresence>
                  {isExpanded && item.description && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="ledger-expand-row"
                    >
                      <div className="py-4 md:pl-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="h-px w-10"
                            style={{
                              background:
                                'linear-gradient(90deg, var(--color-gold), transparent)',
                            }}
                          />
                          <span
                            className="text-xs uppercase tracking-widest font-semibold"
                            style={{ color: 'var(--color-gold)' }}
                          >
                            Description
                          </span>
                        </div>
                        <p className="text-lg leading-7 text-foreground/75 max-w-3xl">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Footer hint */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted">
        <ChevronDown size={12} className="opacity-40" />
        <span>Click any row to expand details</span>
      </div>
    </SectionWrapper>
  );
}
