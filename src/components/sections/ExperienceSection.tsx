'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import SectionWrapper from '../ui/SectionWrapper';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import type { Experience } from '@/lib/types';

interface ExperienceSectionProps {
  experience: Experience[];
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const [lineLeft, setLineLeft] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const [progressLeft, setProgressLeft] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
  const [stylesInitialized, setStylesInitialized] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-100px" });
  const [isPaused, setIsPaused] = useState(false);

  const total = experience.length;

  // Auto-play effect: slide to the next card periodically ONLY when in view
  useEffect(() => {
    if (total <= 1 || !isInView || isPaused) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % total;
        setDirection(next > prev ? 1 : -1);
        return next;
      });
    }, 4000); // 4 seconds interval

    return () => clearInterval(timer);
  }, [activeIndex, total, isInView, isPaused]);

  const goTo = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const goPrev = useCallback(() => {
    if (activeIndex > 0) {
      setDirection(-1);
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex]);

  const goNext = useCallback(() => {
    if (activeIndex < total - 1) {
      setDirection(1);
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, total]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? 8 : -8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.92,
      rotateY: dir > 0 ? -8 : 8,
    }),
  };

  const updateTimelineStyles = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const buttons = container.querySelectorAll('.timeline-node-btn');
    if (buttons.length === 0) return;

    const getCenter = (element: HTMLElement) => {
      return element.offsetLeft + element.clientWidth / 2;
    };

    const firstCenter = getCenter(buttons[0] as HTMLElement);
    const activeCenter = getCenter(buttons[activeIndex] as HTMLElement);
    const lastCenter = getCenter(buttons[buttons.length - 1] as HTMLElement);

    setLineLeft(firstCenter);
    setLineWidth(lastCenter - firstCenter);
    setProgressLeft(firstCenter);
    setProgressWidth(activeCenter - firstCenter);
    setStylesInitialized(true);
  }, [activeIndex]);

  // Measure timeline coordinates on render changes and window resize
  useEffect(() => {
    const handle = requestAnimationFrame(updateTimelineStyles);
    return () => cancelAnimationFrame(handle);
  }, [updateTimelineStyles]);

  useEffect(() => {
    window.addEventListener('resize', updateTimelineStyles);
    return () => window.removeEventListener('resize', updateTimelineStyles);
  }, [updateTimelineStyles]);

  // Center active node inside the scroll container
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const buttons = container.querySelectorAll('.timeline-node-btn');
    const activeBtn = buttons[activeIndex] as HTMLElement;
    if (activeBtn) {
      const containerWidth = container.clientWidth;
      const btnLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      
      const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  if (!experience.length) return null;

  const activeExp = experience[activeIndex];

  return (
    <SectionWrapper
      id="experience"
      title="Experience"
      subtitle="Professional journey and leadership roles in academia"
      theme="oxford"
      cutout="top-right"
    >
      <div className="mt-8 md:mt-12">

        {/* ── Horizontal Timeline Strip ── */}
        <div className="relative mb-12 select-none">
          {/* Scrollable Container */}
          <div 
            ref={containerRef}
            className="overflow-x-auto scrollbar-none py-2"
          >
            {/* Inner Flex Wrapper */}
            <div className="relative flex items-start justify-between min-w-max gap-8 md:gap-14 px-12 pt-4 pb-2 min-h-[110px]">
              {/* Connecting line */}
              <div 
                className="absolute top-[36px] md:top-[40px] h-px -translate-y-1/2 transition-opacity duration-300"
                style={{ 
                  left: `${lineLeft}px`,
                  width: `${lineWidth}px`,
                  opacity: stylesInitialized ? 1 : 0,
                  background: 'linear-gradient(90deg, transparent 0%, var(--color-gold-muted) 10%, var(--color-gold-muted) 90%, transparent 100%)' 
                }}
              />
              {/* Progress fill */}
              <motion.div 
                className="absolute top-[36px] md:top-[40px] h-0.5 -translate-y-1/2 rounded-full"
                animate={{
                  left: progressLeft,
                  width: progressWidth,
                  opacity: stylesInitialized ? 1 : 0,
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                style={{
                  background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light))',
                  boxShadow: '0 0 10px var(--color-gold-muted)',
                }}
              />

              {experience.map((exp, index) => {
                const isActive = index === activeIndex;
                const isPast = index < activeIndex;
                return (
                  <button
                    key={index}
                    onClick={() => goTo(index)}
                    className="timeline-node-btn relative group flex flex-col items-center cursor-pointer z-10 flex-shrink-0 w-24 md:w-32"
                  >
                    {/* Node */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 0.8,
                        boxShadow: isActive
                          ? '0 0 20px var(--color-gold-muted), 0 0 40px var(--color-gold-muted)'
                          : '0 0 0px transparent',
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                        isActive
                          ? 'border-gold bg-gold/20'
                          : isPast
                          ? 'border-gold/60 bg-gold/10'
                          : 'border-border bg-surface-alt hover:border-gold/40 hover:bg-gold/5'
                      }`}
                    >
                      <Briefcase
                        size={16}
                        className={`transition-colors duration-300 ${
                          isActive ? 'text-gold' : isPast ? 'text-gold/60' : 'text-muted group-hover:text-gold/50'
                        }`}
                      />
                    </motion.div>

                    {/* Label */}
                    <div className={`mt-3 text-center w-full transition-all duration-300 px-1 ${
                      isActive ? 'opacity-100' : 'opacity-40 group-hover:opacity-75'
                    }`}>
                      <p className="text-xs md:text-sm font-semibold text-gold leading-tight truncate">
                        {exp.role}
                      </p>
                      <p className="text-[10px] md:text-xs text-muted mt-0.5">
                        {exp.startYear}{exp.endYear ? `–${exp.endYear}` : ''}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Smooth side fade overlays to show that the strip is scrollable */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
        </div>

        {/* ── Main Carousel Card ── */}
        <div 
          className="relative" 
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className={`absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              activeIndex === 0
                ? 'opacity-20 pointer-events-none'
                : 'bg-[#dad7cd] border border-border hover:bg-gold/10 hover:border-gold/30 hover:shadow-[0_0_15px_var(--color-gold-muted)]'
            }`}
          >
            <ChevronLeft size={20} className="text-[#1C422D]" />
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex === total - 1}
            className={`absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              activeIndex === total - 1
                ? 'opacity-20 pointer-events-none'
                : 'bg-[#dad7cd] border border-border hover:bg-gold/10 hover:border-gold/30 hover:shadow-[0_0_15px_var(--color-gold-muted)]'
            }`}
          >
            <ChevronRight size={20} className="text-[#1C422D]" />
          </button>

          {/* Card container */}
          <div className="overflow-hidden mx-6 md:mx-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden bg-beige-card border border-border"
              >
                {/* Card Background */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none" />
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 100% 0%, var(--color-gold-muted) 0%, transparent 70%)',
                  }}
                />
                <div className="absolute bottom-0 left-0 w-60 h-60 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at 0% 100%, var(--color-gold-muted) 0%, transparent 70%)',
                  }}
                />

                <div className="relative z-10 p-8 md:p-12 lg:p-14">
                  {/* Top row: Counter + metadata badges */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    {/* Step counter */}
                    <div className="flex items-center gap-3">
                      <span className="text-4xl md:text-5xl font-bold text-gold/20"
                        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                      >
                        {String(activeIndex + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-muted font-medium">/ {String(total).padStart(2, '0')}</span>
                    </div>
 
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-gold-muted text-gold border border-gold/20">
                        <Calendar size={13} />
                        <span>{activeExp.startYear}{activeExp.endYear ? ` — ${activeExp.endYear}` : ' — Present'}</span>
                      </div>
                      {activeExp.institution && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-foreground/60 bg-surface-alt border border-border"
                        >
                          <MapPin size={13} className="text-gold/50" />
                          <span>{activeExp.institution}</span>
                        </div>
                      )}
                    </div>
                  </div>
 
                  {/* Role title */}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 text-heading"
                    style={{
                      fontFamily: 'var(--font-playfair), Georgia, serif',
                    }}
                  >
                    {activeExp.role}
                  </h3>
 
                  {/* Gold divider */}
                  <div className="mt-6 mb-8 flex items-center gap-3">
                    <div className="h-px flex-grow max-w-[80px]"
                      style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
                  </div>
 
                  {/* Description */}
                  <div className="max-w-3xl">
                    {activeExp.description ? (
                      <div className="space-y-4">
                        {activeExp.description.split('\n').filter(Boolean).map((para, i) => (
                          <motion.p
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                            className="text-lg md:text-xl leading-7 md:leading-8 text-foreground/75"
                          >
                            {para}
                          </motion.p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted italic text-lg">No detailed description available.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom dot indicators (mobile-friendly) ── */}
        <div className="flex items-center justify-center gap-2 mt-8 md:hidden">
          {experience.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? 'w-6 h-2 bg-gold'
                  : 'w-2 h-2 bg-foreground/20 hover:bg-foreground/45'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
