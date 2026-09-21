'use client';

import { useState, useMemo } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import Lightbox from '../ui/Lightbox';
import type { GalleryImage } from '@/lib/types';

interface GallerySectionProps {
  gallery: GalleryImage[];
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = [...new Set(gallery.map((img) => img.category).filter(Boolean))];
    return ['All', ...unique];
  }, [gallery]);

  // Filter gallery images
  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return gallery;
    return gallery.filter((img) => img.category === activeCategory);
  }, [gallery, activeCategory]);

  if (!gallery || gallery.length === 0) return null;

  return (
    <SectionWrapper
      id="gallery"
      title="Academic Achievements Gallery"
      //subtitle="Memorable moments, award ceremonies, guest visits, and campus activities"
      theme="oxford"
    
      cutout="top-left"
    >
      {/* Category filters */}
      {categories.length > 1 && (
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </ScrollReveal>
      )}

      {/* Horizontal / Row-first Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((item, index) => (
          <ScrollReveal key={index} delay={index * 0.05} className="h-full">
            <div
              onClick={() => setLightboxIndex(index)}
              className="group relative overflow-hidden rounded-xl cursor-pointer border border-border/10 bg-beige-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
            >
              <div className="overflow-hidden aspect-[4/3] w-full bg-surface-alt">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.caption || 'Gallery Image'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-[10px] uppercase font-bold text-gold tracking-wider mb-1">
                  {item.category}
                </span>
                <p className="text-white text-xs font-medium line-clamp-2 leading-relaxed">
                  {item.title || item.caption}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredImages.map((img) => ({ imageUrl: img.imageUrl, caption: img.caption, title: img.title, description: img.description }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onNext={() => setLightboxIndex((prev) => Math.min(filteredImages.length - 1, prev + 1))}
        onPrev={() => setLightboxIndex((prev) => Math.max(0, prev - 1))}
      />
    </SectionWrapper>
  );
}
