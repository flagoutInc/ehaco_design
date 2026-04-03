import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { events, categories, areas } from '../data/dummy';
import EventCard from '../components/EventCard';
import FilterModal from '../components/FilterModal';
import RecommendedCarousel from '../components/RecommendedCarousel';
import Pagination, { PAGE_SIZE } from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import type { FilterKey, FilterDef, FilterDefWithAccessors } from '../components/FilterModal';

const formatOptions: string[] = ['オンライン', 'オフライン', 'ハイブリッド'];
const sortOptions: string[] = ['新着順', '人気順', '締め切り順'];

const baseFilterDefs: FilterDef[] = [
  { key: 'category', label: 'カテゴリ', type: 'checkbox', options: categories },
  { key: 'area', label: 'エリア', type: 'checkbox', options: areas },
  { key: 'format', label: '開催形式', type: 'radio', options: formatOptions },
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialIndustry = searchParams.getAll('industry');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialIndustry.length > 0 ? initialIndustry : []);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>('すべて');
  const [sortBy, setSortBy] = useState<string>('新着順');
  const [searchQuery, setSearchQuery] = useState<string>(initialQ);
  const [activeModal, setActiveModal] = useState<FilterKey | null>(null);

  // Build FilterDefWithAccessors - eliminates all switch statements
  const filterDefs: FilterDefWithAccessors[] = useMemo(() => {
    const accessorMap: Record<FilterKey, {
      getSelected: () => string[];
      isSelected: (option: string) => boolean;
      toggle: (option: string) => void;
      clear: () => void;
      getCount: () => number;
    }> = {
      category: {
        getSelected: () => selectedCategories,
        isSelected: (option) => selectedCategories.includes(option),
        toggle: (option) => setSelectedCategories((prev) =>
          prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
        ),
        clear: () => setSelectedCategories([]),
        getCount: () => selectedCategories.length,
      },
      area: {
        getSelected: () => selectedAreas,
        isSelected: (option) => selectedAreas.includes(option),
        toggle: (option) => setSelectedAreas((prev) =>
          prev.includes(option) ? prev.filter((a) => a !== option) : [...prev, option]
        ),
        clear: () => setSelectedAreas([]),
        getCount: () => selectedAreas.length,
      },
      format: {
        getSelected: () => selectedFormat !== 'すべて' ? [selectedFormat] : [],
        isSelected: (option) => selectedFormat === option,
        toggle: (option) => setSelectedFormat((prev) => prev === option ? 'すべて' : option),
        clear: () => setSelectedFormat('すべて'),
        getCount: () => selectedFormat !== 'すべて' ? 1 : 0,
      },
    };

    return baseFilterDefs.map((def) => ({ ...def, ...accessorMap[def.key] }));
  }, [selectedCategories, selectedAreas, selectedFormat]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedAreas([]);
    setSelectedFormat('すべて');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAreas.length > 0 ||
    selectedFormat !== 'すべて';

  // Collect all active filter chips for display
  const activeFilterChips: { key: FilterKey; value: string; toggle: (option: string) => void }[] = filterDefs.flatMap((f) =>
    f.getSelected().map((value) => ({ key: f.key, value, toggle: f.toggle }))
  );

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
  const isIdle = !searchQuery && !hasActiveFilters;
  const recommendedEvents = events.slice(0, 8);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Filter events based on search query and selected filters
  const filteredEvents = events.filter((event) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const searchable = [event.title, event.organizer, event.category, event.description, ...(event.tags || [])].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }
    if (selectedCategories.length > 0) {
      const eventCats = [event.category, ...(event.tags || [])];
      if (!selectedCategories.some((c) => eventCats.includes(c))) return false;
    }
    if (selectedAreas.length > 0) {
      if (!selectedAreas.some((a) => (event.location || '').includes(a) || (event.area || '') === a)) return false;
    }
    if (selectedFormat !== 'すべて') {
      const loc = (event.location || '').toLowerCase();
      if (selectedFormat === 'オンライン' && !loc.includes('オンライン')) return false;
      if (selectedFormat === 'オフライン' && loc.includes('オンライン')) return false;
      if (selectedFormat === 'ハイブリッド' && !loc.includes('ハイブリッド')) return false;
    }
    return true;
  });

  // Sort
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === '人気順') return (a.remaining / a.capacity) - (b.remaining / b.capacity);
    if (sortBy === '締め切り順') return a.isDeadlineSoon === b.isDeadlineSoon ? 0 : a.isDeadlineSoon ? -1 : 1;
    return 0;
  });

  // PC: pagination, Mobile: infinite scroll
  const visibleEvents = isMobile
    ? sortedEvents.slice(0, visibleCount)
    : sortedEvents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset when filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedAreas, selectedFormat, sortBy]);

  // Find the active modal definition
  const activeModalDef = filterDefs.find((f) => f.key === activeModal);

  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      {/* ─── Search Bar ─── */}
      <div className="bg-white border-b border-ehaco-border">
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
          <div className="text-center mb-5">
            <span className="text-3xl md:text-4xl font-black tracking-tight inline-block"><span className="text-[#4FC3F7]">e</span>haco<span className="text-[#4DB6AC]">!</span></span>
            <p className="text-base md:text-lg text-muted mt-2">時代を先どる、次の一手が見つかる</p>
            <p className="text-sm text-muted/60 mt-0.5">AI活用・DX推進・組織づくりのイベント検索</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center flex-1 bg-ehaco-bg rounded-xl border border-ehaco-border px-4 md:px-5 gap-3">
              <svg className="h-5 w-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="DX推進、AI活用、セキュリティ..."
                className="flex-1 py-3 text-sm md:text-base text-ehaco-text outline-none bg-transparent placeholder:text-muted/50"
              />
            </div>
            <button className="btn-gradient text-sm font-semibold px-6 py-3 rounded-xl shrink-0">
              検索
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* ─── Filter Chips Row ─── */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {filterDefs.map((f) => {
            const count = f.getCount();
            return (
              <button
                key={f.key}
                onClick={() => setActiveModal(f.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  count > 0
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-white border-ehaco-border text-ehaco-text hover:border-accent/30 hover:text-accent'
                }`}
              >
                {f.label}
                {count > 0 && (
                  <span className="bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
                <svg className="w-3.5 h-3.5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            );
          })}

          {/* Category quick links */}
          {isIdle && (
            <>
              <span className="w-px h-5 bg-ehaco-border mx-1" />
              {['DX推進', 'AI活用', 'セキュリティ', 'マーケティング', '人事・HR'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.includes(cat) ? prev : [...prev, cat]
                    );
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-muted bg-white border border-ehaco-border hover:border-accent/30 hover:text-accent transition-colors"
                >
                  {cat}
                </button>
              ))}
            </>
          )}
        </div>

        {/* ─── Active Filter Chips ─── */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {activeFilterChips.map((chip) => (
              <span
                key={`${chip.key}-${chip.value}`}
                className="inline-flex items-center gap-1 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full"
              >
                {chip.value}
                <button
                  onClick={() => chip.toggle(chip.value)}
                  className="ml-0.5 hover:text-accent/70 transition-colors"
                  aria-label={`${chip.value}を削除`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
            <button
              onClick={clearAll}
              className="text-sm text-muted hover:text-red-500 transition-colors ml-1 underline"
            >
              すべてクリア
            </button>
          </div>
        )}

        {/* ─── Idle State: おすすめ ─── */}
        {isIdle && <RecommendedCarousel events={recommendedEvents} />}

        {/* ─── イベント一覧（常に表示） ─── */}
        {isIdle && (
          <div className="border-t border-ehaco-border pt-10 mb-8">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">All Events</p>
            <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">すべてのイベント</h2>
          </div>
        )}

        {/* Results Top Bar: Count + Sort */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
              <p className="text-sm text-muted">
                <span className="text-2xl font-black text-ehaco-text">{sortedEvents.length}</span>
                <span className="ml-1">件のイベント</span>
              </p>
              {/* PC: segment control */}
              <div className="hidden md:flex items-center bg-white rounded-xl border border-ehaco-border p-0.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`px-3.5 py-1.5 text-sm rounded-lg transition ${
                      sortBy === opt
                        ? 'bg-accent text-white font-medium shadow-sm'
                        : 'text-muted hover:text-ehaco-text'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {/* Mobile: native select */}
              <select
                value={sortBy}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}
                className="md:hidden border border-ehaco-border rounded-xl px-3 py-2 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Event List: Horizontal cards */}
            {visibleEvents.length > 0 ? (
              <div className="space-y-6 mb-8">
                {visibleEvents.map((event) => (
                  <EventCard key={event.id} event={event} variant="horizontal" />
                ))}
              </div>
            ) : (
              <div className="mb-8">
                <EmptyState
                  icon={<svg className="w-8 h-8 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>}
                  title="該当するイベントがありません"
                  subtitle="条件を変更して再検索してください"
                />
              </div>
            )}

            <Pagination
              totalItems={sortedEvents.length}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              visibleCount={visibleCount}
              setVisibleCount={setVisibleCount}
              isMobile={isMobile}
            />
      </div>

      {/* ─── Filter Modal ─── */}
      {activeModal && activeModalDef && (
        <FilterModal
          filterDef={activeModalDef}
          filteredCount={filteredEvents.length}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
