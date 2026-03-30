import { useState, useEffect, useRef } from 'react';
import { events, categories, areas } from '../data/dummy';
import EventCard from '../components/EventCard';

const formatOptions = ['オンライン', 'オフライン', 'ハイブリッド'];
const sortOptions = ['新着順', '人気順', '締め切り順'];

const filterDefs = [
  { key: 'category', label: 'カテゴリ', type: 'checkbox', options: categories },
  { key: 'area', label: 'エリア', type: 'checkbox', options: areas },
  { key: 'format', label: '開催形式', type: 'radio', options: formatOptions },
];

export default function SearchPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('すべて');
  const [sortBy, setSortBy] = useState('新着順');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState(null); // 'category' | 'area' | 'format' | null

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModal]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedAreas([]);
    setSelectedFormat('すべて');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAreas.length > 0 ||
    selectedFormat !== 'すべて';

  // Get count per filter key
  const getFilterCount = (key) => {
    switch (key) {
      case 'category': return selectedCategories.length;
      case 'area': return selectedAreas.length;
      case 'format': return selectedFormat !== 'すべて' ? 1 : 0;
      default: return 0;
    }
  };

  // Get selected values for a filter key
  const getSelectedValues = (key) => {
    switch (key) {
      case 'category': return selectedCategories;
      case 'area': return selectedAreas;
      case 'format': return selectedFormat !== 'すべて' ? [selectedFormat] : [];
      default: return [];
    }
  };

  // Check if an option is selected
  const isSelected = (key, option) => {
    switch (key) {
      case 'category': return selectedCategories.includes(option);
      case 'area': return selectedAreas.includes(option);
      case 'format': return selectedFormat === option;
      default: return false;
    }
  };

  // Toggle an option
  const toggleOption = (key, option) => {
    switch (key) {
      case 'category': toggleCategory(option); break;
      case 'area': toggleArea(option); break;
      case 'format': setSelectedFormat((prev) => prev === option ? 'すべて' : option); break;
    }
  };

  // Remove a specific filter value
  const removeFilter = (key, value) => {
    switch (key) {
      case 'category': toggleCategory(value); break;
      case 'area': toggleArea(value); break;
      case 'format': setSelectedFormat('すべて'); break;
    }
  };

  // Collect all active filter chips for display
  const activeFilterChips = [
    ...selectedCategories.map((v) => ({ key: 'category', value: v })),
    ...selectedAreas.map((v) => ({ key: 'area', value: v })),
    ...(selectedFormat !== 'すべて' ? [{ key: 'format', value: selectedFormat }] : []),
  ];

  const isIdle = !searchQuery && !hasActiveFilters;
  const recommendedEvents = events.slice(0, 8);
  const scrollRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.querySelector(':scope > *')?.offsetWidth || 300;
    const scrollAmount = direction * (cardWidth + 20);

    // Loop: if near the end going right, jump to start; if at start going left, jump to end
    if (direction > 0 && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction < 0 && container.scrollLeft <= 10) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Find the active modal definition
  const activeModalDef = filterDefs.find((f) => f.key === activeModal);

  return (
    <div className="min-h-screen bg-ehaco-bg">
      {/* ─── Search Bar ─── */}
      <div className="bg-white border-b border-ehaco-border">
        <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
          <div className="text-center mb-6">
            <h1 className="text-lg md:text-2xl font-extrabold text-ehaco-text tracking-tight mb-3">
              そのビジネス課題、ここで解決につながるヒントが見つかる。
            </h1>
            <p className="text-xs md:text-sm text-muted mb-4">デジタル・テクノロジー分野のウェビナー・イベントを探すなら</p>
            <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-10 md:h-14 mx-auto object-contain" />
          </div>
          <div className="flex items-center bg-ehaco-bg rounded-xl ring-1 ring-ehaco-border overflow-hidden">
            <div className="flex items-center flex-1 px-4 md:px-5 gap-3">
              <svg className="h-5 w-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="DX推進、AI活用、セキュリティ..."
                className="flex-1 py-3 text-sm md:text-base text-ehaco-text outline-none bg-transparent placeholder:text-muted/50"
              />
            </div>
            <button className="bg-accent hover:bg-accent-light text-white text-sm font-semibold px-6 py-3 transition-colors">
              検索
            </button>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">

        {/* ─── Filter Chips Row ─── */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {filterDefs.map((f) => {
            const count = getFilterCount(f.key);
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
                  <span className="bg-accent text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
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
                  onClick={() => removeFilter(chip.key, chip.value)}
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
        {isIdle && (
          <div className="mb-10">
            <div className="mb-6">
              <p className="text-[11px] font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">Recommended</p>
              <h2 className="text-xl md:text-2xl font-extrabold text-ehaco-text tracking-tight">おすすめのイベント</h2>
            </div>
            <div className="relative">
              {/* Left arrow */}
              <button
                onClick={() => scrollCarousel(-1)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 bg-white shadow-lg ring-1 ring-ehaco-border/50 rounded-xl flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition hidden md:flex"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Scrollable container */}
              <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
              >
                {recommendedEvents.map((event) => (
                  <div key={event.id} className="w-[280px] md:w-[300px] shrink-0">
                    <EventCard event={event} variant="vertical" />
                  </div>
                ))}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => scrollCarousel(1)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 bg-white shadow-lg ring-1 ring-ehaco-border/50 rounded-xl flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition hidden md:flex"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ─── イベント一覧（常に表示） ─── */}
        {isIdle && (
          <div className="border-t border-ehaco-border pt-10 mb-6">
            <p className="text-[11px] font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">All Events</p>
            <h2 className="text-xl md:text-2xl font-extrabold text-ehaco-text tracking-tight">すべてのイベント</h2>
          </div>
        )}

        {/* Results Top Bar: Count + Sort */}
        <div className="flex items-center justify-between mb-5 md:mb-6">
              <p className="text-sm text-muted">
                <span className="text-2xl font-extrabold text-ehaco-text">{events.length}</span>
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
                onChange={(e) => setSortBy(e.target.value)}
                className="md:hidden border border-ehaco-border rounded-xl px-3 py-2 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Event List: Horizontal cards */}
            <div className="space-y-6 mb-8">
              {events.slice(0, 15).map((event) => (
                <EventCard key={event.id} event={event} variant="horizontal" />
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-1 pb-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold bg-accent text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                3
              </button>
              <span className="w-10 h-10 flex items-center justify-center text-sm text-muted">
                ...
              </span>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                10
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-muted hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
      </div>

      {/* ─── Filter Modal ─── */}
      {activeModal && activeModalDef && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          />

          {/* Modal panel: full-screen on mobile, centered on desktop */}
          <div className="relative w-full h-full md:h-auto md:max-h-[80vh] md:max-w-lg md:mx-4 bg-white md:rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-ehaco-border shrink-0">
              <h2 className="text-lg font-extrabold text-ehaco-text">{activeModalDef.label}</h2>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-muted hover:text-ehaco-text transition-colors rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Options */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-1">
                {activeModalDef.options.map((option) => {
                  const checked = isSelected(activeModal, option);
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors ${
                        checked ? 'bg-accent/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type={activeModalDef.type === 'radio' ? 'radio' : 'checkbox'}
                        name={activeModal}
                        checked={checked}
                        onChange={() => toggleOption(activeModal, option)}
                        className="w-4.5 h-4.5 rounded border-ehaco-border text-accent focus:ring-accent"
                      />
                      <span className={`text-sm ${checked ? 'font-semibold text-accent' : 'text-ehaco-text'}`}>
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 px-5 py-4 border-t border-ehaco-border shrink-0">
              <button
                onClick={() => {
                  // Clear this filter group
                  switch (activeModal) {
                    case 'category': setSelectedCategories([]); break;
                    case 'area': setSelectedAreas([]); break;
                    case 'format': setSelectedFormat('すべて'); break;
                  }
                }}
                className="flex-1 py-2.5 border border-ehaco-border rounded-xl text-sm text-muted hover:bg-gray-50 transition font-medium"
              >
                クリア
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-light transition"
              >
                適用する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
