'use client';

import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import { BookOpen, Lightbulb, Target } from 'lucide-react';
import type { AboutMe } from '@/lib/types';

interface AboutMeSectionProps {
  aboutMe: AboutMe;
}

export default function AboutMeSection({ aboutMe }: AboutMeSectionProps) {
  return (
    <SectionWrapper
      id="about"
      title="About"
      subtitle="Dedicated to Excellence in Education & Research"
      theme="oxford"
      cutout="top-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Biography Card */}
        <ScrollReveal className="lg:col-span-2" delay={0}>
          <div className="card-premium h-full">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-gold-muted)' }}
              >
                <BookOpen size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3
                className="text-xl font-semibold text-heading"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Biography
              </h3>
            </div>
            <div className="text-lg text-foreground/80 leading-relaxed space-y-4">
              {aboutMe.biography ? (
                aboutMe.biography.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))
              ) : (
                <p className="text-muted italic">Biography will be loaded from Google Sheets.</p>
              )}
            </div>

            {/* Introduction */}
            {aboutMe.introduction && (
              <div className="mt-6 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-lg text-foreground/70 leading-relaxed">{aboutMe.introduction}</p>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* Academic Vision */}
          <ScrollReveal delay={0.15}>
            <div className="card-premium">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--color-gold-muted)' }}
                >
                  <Target size={20} style={{ color: 'var(--color-gold)' }} />
                </div>
                <h3
                  className="text-lg font-semibold text-heading"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  Academic Vision
                </h3>
              </div>
              <p className="text-lg text-foreground/70 leading-relaxed">
                {aboutMe.vision || (
                  <span className="text-muted italic">Vision statement from Google Sheets.</span>
                )}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
