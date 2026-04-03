import { useRef, useEffect, useCallback } from 'react';

const PAGE_SIZE = 8;

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  visibleCount: number;
  setVisibleCount: (count: number | ((prev: number) => number)) => void;
  isMobile: boolean;
}

export default function Pagination({
  totalItems,
  currentPage,
  setCurrentPage,
  visibleCount,
  setVisibleCount,
  isMobile,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);
  const hasMore = isMobile && visibleCount < totalItems;
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev: number) => Math.min(prev + PAGE_SIZE, totalItems));
  }, [totalItems, setVisibleCount]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore(); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <>
      {/* Mobile: Infinite scroll sentinel */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-8 md:hidden">
          <div className="h-6 w-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}

      {/* PC: Pagination */}
      {!isMobile && totalPages > 1 && (
        <div className="hidden md:flex items-center justify-center gap-1 py-8">
          <button
            onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-ehaco-border text-muted hover:text-ehaco-text hover:border-accent/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? 'bg-accent text-white shadow-sm'
                  : 'border border-ehaco-border text-muted hover:text-ehaco-text hover:border-accent/30'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p: number) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-ehaco-border text-muted hover:text-ehaco-text hover:border-accent/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}

export { PAGE_SIZE };
