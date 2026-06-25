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
      <div className="relative flex flex-col lg:flex-row mt-4">
        {/* Left Side: Biography & Vision */}
        <div className="w-full lg:w-[60%] lg:pr-12 xl:pr-16 z-10 flex flex-col">
          <ScrollReveal delay={0}>
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--color-gold-muted)' }}
              >
                <BookOpen size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3
                className="text-2xl font-semibold text-heading"
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
              <div className="mt-6 pt-6 mb-8" style={{ borderTop: '1px solid var(--border-color)' }}>
                <p className="text-lg text-foreground/70 leading-relaxed">{aboutMe.introduction}</p>
              </div>
            )}
          </ScrollReveal>

          {/* Academic Vision - Placed in flow but extra wide to overlap the image */}
          <ScrollReveal delay={0.2} className="mt-8 lg:mt-12 mb-8 lg:mb-12 relative z-20 w-full lg:w-[140%] xl:w-[130%]">
            <div 
              className="p-6 md:p-8 lg:p-10 shadow-2xl relative group"
              style={{
                background: 'rgba(28, 66, 45, 0.95)', // Deep midnight green
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderLeft: '8px solid var(--color-gold)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Target size={24} style={{ color: 'var(--color-gold)' }} />
                <h3 className="text-2xl font-bold uppercase tracking-widest text-[#dad7cd]">
                  Academic Vision
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-[#dad7cd]/80">
                {aboutMe.vision || (
                  <span className="italic">Vision statement from Google Sheets.</span>
                )}
              </p>
              
              <div 
                className="absolute bottom-0 right-0 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ background: 'var(--color-gold)', color: '#1C422D' }}
              >
                Vision
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Side: Image (Desktop Absolute, Mobile flow) */}
        <div className="w-full lg:w-[40%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 z-0">
          <ScrollReveal delay={0.1} className="h-full">
            <div className="w-full h-full min-h-[400px] lg:min-h-0 overflow-hidden shadow-sm bg-[var(--surface)] lg:rounded-l-2xl">
              {aboutMe.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={aboutMe.imageUrl} 
                  alt="About me" 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/10">
                  <span className="text-muted italic">Image from Google Sheets</span>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
