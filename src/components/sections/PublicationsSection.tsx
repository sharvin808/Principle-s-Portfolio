'use client';

import { useState, useMemo } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import ScrollReveal from '../ui/ScrollReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import { Search, ExternalLink, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Publication } from '@/lib/types';

interface PublicationsSectionProps {
  publications: Publication[];
}

const ITEMS_PER_PAGE = 10;

export default function PublicationsSection({ publications }: PublicationsSectionProps) {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique years and types
  const years = useMemo(() => {
    const unique = [...new Set(publications.map((p) => p.year).filter(Boolean))].sort(
      (a, b) => Number(b) - Number(a)
    );
    return ['All', ...unique];
  }, [publications]);

  const types = useMemo(() => {
    const unique = [...new Set(publications.map((p) => p.type).filter(Boolean))];
    return ['All', ...unique];
  }, [publications]);

  // Filter publications
  const filtered = useMemo(() => {
    return publications.filter((pub) => {
      const matchesSearch =
        !search ||
        pub.title?.toLowerCase().includes(search.toLowerCase()) ||
        pub.authors?.toLowerCase().includes(search.toLowerCase()) ||
        pub.journal?.toLowerCase().includes(search.toLowerCase());

      const matchesYear = yearFilter === 'All' || pub.year === yearFilter;
      const matchesType = typeFilter === 'All' || pub.type === typeFilter;

      return matchesSearch && matchesYear && matchesType;
    });
  }, [publications, search, yearFilter, typeFilter]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (setter: (v: string) => void) => (value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <SectionWrapper
      id="publications"
      title="Publications"
      subtitle="Scopus/WoS Indexed Journals"
      theme="oxford"
    
      cutout="top-left"
      headerContent={
        <div className="flex flex-wrap items-center justify-end gap-12 md:gap-20">
          <AnimatedCounter
            target={publications.length}
            label="Total Publications"
          />
          <AnimatedCounter
            target={new Set(publications.map((p) => p.year)).size}
            label="Active Years"
            suffix=""
          />
          <AnimatedCounter
            target={new Set(publications.map((p) => p.journal).filter(Boolean)).size}
            label="Unique Journals"
            suffix=""
          />
        </div>
      }
    >

      {/* Search and Filters */}
      <ScrollReveal className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="text"
              placeholder="Search publications by title, author, or journal..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          {/* Year Filter */}
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <select
              value={yearFilter}
              onChange={(e) => handleFilterChange(setYearFilter)(e.target.value)}
              className="search-input pl-9 pr-8 cursor-pointer appearance-none min-w-[140px]"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === 'All' ? 'All Years' : y}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          {types.length > 1 && (
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
              <select
                value={typeFilter}
                onChange={(e) => handleFilterChange(setTypeFilter)(e.target.value)}
                className="search-input pl-9 pr-8 cursor-pointer appearance-none min-w-[160px]"
              >
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Types' : t}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="text-lg text-muted mt-3">
          Showing {paginated.length} of {filtered.length} publications
        </p>
      </ScrollReveal>

      {/* Publication Cards */}
      <div className="space-y-4">
        {paginated.map((pub, index) => (
          <ScrollReveal key={index} delay={index * 0.05}>
            <div className="card-premium group">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Year badge */}
                <div className="flex-shrink-0">
                  <span
                    className="inline-block px-3 py-1 rounded-lg text-sm font-semibold"
                    style={{
                      background: 'var(--color-gold-muted)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    {pub.year}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-heading leading-snug">
                    {pub.title}
                  </h4>
                  <p className="text-lg text-foreground/70 mt-1.5">
                    {pub.authors}
                  </p>
                  <p className="text-lg text-muted mt-1 italic">
                    {pub.journal}
                  </p>

                  {/* Tags row */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {pub.type && (
                      <span className="text-sm px-2.5 py-0.5 rounded-full font-medium"
                        style={{
                          background: 'var(--surface-alt)',
                          color: 'var(--muted)',
                        }}>
                        {pub.type}
                      </span>
                    )}
                    {pub.doi && (
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="doi-badge"
                      >
                        DOI: {pub.doi}
                      </a>
                    )}
                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-gold hover:underline"
                      >
                        View Paper <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {paginated.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted text-lg">No publications found matching your criteria.</p>
            <button
              onClick={() => {
                setSearch('');
                setYearFilter('All');
                setTypeFilter('All');
                setCurrentPage(1);
              }}
              className="mt-4 text-gold hover:underline text-sm cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 7) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(page - currentPage) <= 1) return true;
              return false;
            })
            .map((page, i, arr) => (
              <span key={page} className="flex items-center gap-2">
                {i > 0 && arr[i - 1] !== page - 1 && (
                  <span className="text-muted text-sm px-1">…</span>
                )}
                <button
                  onClick={() => setCurrentPage(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              </span>
            ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
