'use client';

import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { Users } from 'lucide-react';
import type { PhDScholar } from '@/lib/types';

interface PhDScholarsSectionProps {
  phdScholars: PhDScholar[];
}

export default function PhDScholarsSection({ phdScholars }: PhDScholarsSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!phdScholars || phdScholars.length === 0) return null;

  const ongoingCount = phdScholars.filter(
    (s) => s.status?.toLowerCase().includes('ongoing')
  ).length;
  const awardedCount = phdScholars.length - ongoingCount;

  return (
    <SectionWrapper
      id="phd-scholars"
      title="PhD Supervision"
      subtitle="Mentorship and academic supervision of doctoral research"
      theme="oxford"
      cutout="top-left"
      headerContent={
        <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6">
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: '#DFE8D9',
              border: '1px solid rgba(28, 66, 45, 0.15)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Users size={18} style={{ color: '#244B3A' }} />
            <div>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#244B3A' }}
              >
                {phdScholars.length}
              </div>
              <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                Total Scholars
              </div>
            </div>
          </div>
          {ongoingCount > 0 && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: '#DFE8D9',
                border: '1px solid rgba(28, 66, 45, 0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{
                    background: '#22c55e',
                    boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)',
                  }}
                ></span>
              </div>
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#244B3A' }}
                >
                  {ongoingCount}
                </div>
                <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                  Ongoing
                </div>
              </div>
            </div>
          )}
          {awardedCount > 0 && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: '#DFE8D9',
                border: '1px solid rgba(28, 66, 45, 0.15)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: 'var(--color-success)' }}
              />
              <div>
                <div
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#244B3A' }}
                >
                  {awardedCount}
                </div>
                <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                  Awarded
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >
      {/* Bento Grid */}
      <div className="bento-grid">
        {phdScholars.map((scholar, index) => {
          const isOngoing = scholar.status?.toLowerCase().includes('ongoing');
          
          return (
            <ScrollReveal key={index} delay={index * 0.06} className="h-full">
              <div
                className="bento-card h-full flex flex-col"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gold accent strip */}
                <div className="bento-accent" />

                {/* Watermark number / ID */}
                <span
                  className="bento-watermark"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Card content */}
                <div className="relative z-[5] p-6 md:p-8 flex-1 flex flex-col">
                  {/* Status pill — top right */}
                  <div className="flex items-center justify-end mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: isOngoing
                          ? 'var(--color-gold-muted)'
                          : 'var(--color-success-muted)',
                        color: isOngoing ? 'var(--color-gold)' : 'var(--color-success)',
                        border: `1px solid ${isOngoing ? 'rgba(212, 201, 179, 0.2)' : 'var(--color-success-muted)'}`,
                      }}
                    >
                      {isOngoing ? (
                        <div className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#22c55e]" style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)' }}></span>
                        </div>
                      ) : (
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{
                            background: 'var(--color-success)',
                            boxShadow: '0 0 6px var(--color-success-muted)',
                          }}
                        />
                      )}
                      {scholar.status || 'Awarded'}
                    </span>
                  </div>

                  {/* Title (Scholar Name) */}
                  <h3
                    className="text-xl md:text-2xl font-bold leading-snug text-heading mb-3"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                    }}
                  >
                    {scholar.name}
                  </h3>

                  {/* Topic as subtle info block instead of full description since it's the title in the UI */}
                  <div className="mt-2 text-sm md:text-base leading-relaxed text-foreground/80 flex-1">
                    <div className="font-semibold text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--color-gold)' }}>Research Topic</div>
                    {scholar.topic}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
