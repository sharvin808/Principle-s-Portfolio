'use client';

import { useState } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { FlaskConical, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import type { ResearchProject } from '@/lib/types';

interface ResearchProjectSectionProps {
  researchProject: ResearchProject[];
}

export default function ResearchProjectSection({ researchProject }: ResearchProjectSectionProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!researchProject || researchProject.length === 0) return null;

  const ongoingCount = researchProject.filter(
    (p) => p.status?.toLowerCase().includes('ongoing')
  ).length;
  const completedCount = researchProject.length - ongoingCount;

  return (
    <SectionWrapper
      id="research-project"
      title="Research & Academic Projects"
      subtitle="Sponsored research projects, institutional grants, and educational initiatives"
      theme="oxford"
    
      cutout="top-left"
      headerContent={
        <div className="flex flex-wrap items-center justify-end gap-4 md:gap-6">
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: '#dad7cd',
              border: '1px solid rgba(28, 66, 45, 0.15)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <FlaskConical size={18} style={{ color: '#1C422D' }} />
            <div>
              <div
                className="text-2xl font-bold"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#1C422D' }}
              >
                {researchProject.length}
              </div>
              <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                Total Projects
              </div>
            </div>
          </div>
          {ongoingCount > 0 && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: '#dad7cd',
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
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#1C422D' }}
                >
                  {ongoingCount}
                </div>
                <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                  Ongoing
                </div>
              </div>
            </div>
          )}
          {completedCount > 0 && (
            <div
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{
                background: '#dad7cd',
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
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif', color: '#1C422D' }}
                >
                  {completedCount}
                </div>
                <div className="text-xs uppercase tracking-widest font-medium" style={{ color: '#4b5563' }}>
                  Completed
                </div>
              </div>
            </div>
          )}
        </div>
      }
    >

      {/* Bento Grid */}
      <div className="bento-grid">
        {researchProject.map((proj, index) => {
          const isOngoing = proj.status?.toLowerCase().includes('ongoing');
          const isHovered = hoveredIndex === index;

          return (
            <ScrollReveal key={index} delay={index * 0.06} className="h-full">
              <div
                className="bento-card h-full flex flex-col min-h-[350px]"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gold accent strip */}
                <div className="bento-accent" />

                {/* Watermark number */}
                <span
                  className="bento-watermark"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Card content */}
                <div className="relative z-[5] p-6 md:p-8 flex-1 flex flex-col">
                  {/* Status pill — top right */}
                  <div className="flex items-center justify-between mb-4">
                    {proj.year && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted font-mono">
                        <Calendar size={11} />
                        {proj.year}
                      </span>
                    )}
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
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: isOngoing ? 'var(--color-gold)' : 'var(--color-success)',
                          boxShadow: isOngoing
                            ? '0 0 6px var(--color-gold-muted)'
                            : '0 0 6px var(--color-success-muted)',
                          ...(isOngoing ? { animation: 'pulse 2s infinite' } : {}),
                        }}
                      />
                      {proj.status || 'Completed'}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl md:text-2xl font-bold leading-snug text-heading mb-3"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                    }}
                  >
                    {proj.title}
                  </h3>

                  {/* Funding agency */}
                  {proj.fundingAgency && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium self-start"
                      style={{
                        background: 'var(--color-gold-muted)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--color-gold)',
                      }}
                    >
                      <DollarSign size={13} />
                      {proj.fundingAgency}
                    </div>
                  )}

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Link (always visible) */}
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold transition-colors"
                      style={{ color: 'var(--color-gold)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Hover overlay for description */}
                {proj.description && (
                  <div className="bento-overlay">
                    <div
                      className="flex items-center gap-2 mb-2"
                    >
                      <div
                        className="h-px flex-grow max-w-[40px]"
                        style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }}
                      />
                      <span className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--color-gold)' }}>
                        Details
                      </span>
                    </div>
                    <p className="text-lg leading-relaxed text-foreground/75">
                      {proj.description}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
