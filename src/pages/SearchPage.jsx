import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { events, categories, areas } from '../data/dummy';
import EventCard from '../components/EventCard';

const formatOptions = ['すべて', 'オンライン', 'オフライン', 'ハイブリッド'];
const priceOptions = ['すべて', '無料', '有料'];
const sortOptions = ['新着順', '人気順', '締め切り順'];

export default function SearchPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('すべて');
  const [selectedPrice, setSelectedPrice] = useState('すべて');
  const [sortBy, setSortBy] = useState('新着順');
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Lock body scroll when filter overlay is open
  useEffect(() => {
    if (filterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [filterOpen]);

  const [openSections, setOpenSections] = useState({
    category: true,
    area: true,
    format: false,
    price: false,
  });

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
    setSelectedPrice('すべて');
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAreas.length > 0 ||
    selectedFormat !== 'すべて' ||
    selectedPrice !== 'すべて';

  const activeFilterCount =
    selectedCategories.length +
    selectedAreas.length +
    (selectedFormat !== 'すべて' ? 1 : 0) +
    (selectedPrice !== 'すべて' ? 1 : 0);

  const ChevronIcon = ({ open }) => (
    <svg
      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const FilterChip = ({ label, onRemove }) => (
    <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 hover:text-accent/70 transition-colors"
        aria-label={`${label}を削除`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </span>
  );

  const filterContent = (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="bg-white rounded-xl border border-ehaco-border overflow-hidden">
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-ehaco-text hover:bg-gray-50 transition-colors"
        >
          カテゴリ
          <ChevronIcon open={openSections.category} />
        </button>
        {openSections.category && (
          <div className="px-5 pb-4 space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer hover:text-accent transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent"
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Area Filter */}
      <div className="bg-white rounded-xl border border-ehaco-border overflow-hidden">
        <button
          onClick={() => toggleSection('area')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-ehaco-text hover:bg-gray-50 transition-colors"
        >
          エリア
          <ChevronIcon open={openSections.area} />
        </button>
        {openSections.area && (
          <div className="px-5 pb-4 space-y-2">
            {areas.map((area) => (
              <label
                key={area}
                className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer hover:text-accent transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedAreas.includes(area)}
                  onChange={() => toggleArea(area)}
                  className="w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent"
                />
                {area}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Format Filter */}
      <div className="bg-white rounded-xl border border-ehaco-border overflow-hidden">
        <button
          onClick={() => toggleSection('format')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-ehaco-text hover:bg-gray-50 transition-colors"
        >
          開催形式
          <ChevronIcon open={openSections.format} />
        </button>
        {openSections.format && (
          <div className="px-5 pb-4 space-y-2">
            {formatOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer hover:text-accent transition-colors"
              >
                <input
                  type="radio"
                  name="format"
                  checked={selectedFormat === opt}
                  onChange={() => setSelectedFormat(opt)}
                  className="w-4 h-4 border-ehaco-border text-accent focus:ring-accent"
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="bg-white rounded-xl border border-ehaco-border overflow-hidden">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-ehaco-text hover:bg-gray-50 transition-colors"
        >
          参加費
          <ChevronIcon open={openSections.price} />
        </button>
        {openSections.price && (
          <div className="px-5 pb-4 space-y-2">
            {priceOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer hover:text-accent transition-colors"
              >
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === opt}
                  onChange={() => setSelectedPrice(opt)}
                  className="w-4 h-4 border-ehaco-border text-accent focus:ring-accent"
                />
                {opt}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-ehaco-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 md:p-4 bg-white rounded-xl border border-ehaco-border">
            <span className="text-sm text-gray-500 mr-1">絞り込み:</span>
            {selectedCategories.map((cat) => (
              <FilterChip key={cat} label={cat} onRemove={() => toggleCategory(cat)} />
            ))}
            {selectedAreas.map((area) => (
              <FilterChip key={area} label={area} onRemove={() => toggleArea(area)} />
            ))}
            {selectedFormat !== 'すべて' && (
              <FilterChip
                label={selectedFormat}
                onRemove={() => setSelectedFormat('すべて')}
              />
            )}
            {selectedPrice !== 'すべて' && (
              <FilterChip
                label={selectedPrice}
                onRemove={() => setSelectedPrice('すべて')}
              />
            )}
            <button
              onClick={clearAll}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors ml-2 underline"
            >
              すべてクリア
            </button>
          </div>
        )}

        {/* Mobile filter button */}
        <div className="mb-4 md:hidden">
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-ehaco-border rounded-lg text-sm text-ehaco-text hover:bg-gray-50 transition-colors w-full justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            フィルター
            {activeFilterCount > 0 && (
              <span className="bg-accent text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile filter overlay */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-ehaco-bg overflow-y-auto">
              <div className="sticky top-0 flex items-center justify-between bg-white border-b border-ehaco-border px-4 py-3 z-10">
                <h2 className="font-bold text-ehaco-text">フィルター</h2>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-ehaco-text transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                {filterContent}
              </div>
              <div className="sticky bottom-0 bg-white border-t border-ehaco-border p-4 flex gap-3">
                <button
                  onClick={clearAll}
                  className="flex-1 py-2.5 border border-ehaco-border rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
                >
                  クリア
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="flex-1 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light transition"
                >
                  適用する
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2-column layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Left Sidebar (PC only) */}
          <aside className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              {filterContent}
            </div>
          </aside>

          {/* Right Main Area */}
          <main className="flex-1 min-w-0">
            {/* Compact search bar */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center bg-white rounded-xl border border-ehaco-border overflow-hidden">
                <svg className="w-5 h-5 text-gray-400 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="キーワードで絞り込み..."
                  className="flex-1 px-3 py-3 text-sm text-ehaco-text outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Top bar: count + sort */}
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <p className="text-sm text-gray-500">
                <span className="text-2xl font-black text-ehaco-text">{events.length}</span>
                <span className="ml-1">件のイベント</span>
              </p>
              {/* Segment control sort */}
              <div className="hidden md:flex items-center bg-white rounded-lg border border-ehaco-border p-0.5">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className={`px-3 py-1.5 text-sm rounded-md transition ${
                      sortBy === opt
                        ? 'bg-accent text-white font-medium shadow-sm'
                        : 'text-gray-500 hover:text-ehaco-text'
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
                className="md:hidden border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {sortOptions.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Event List - PC: horizontal, Mobile: vertical grid */}
            <div className="hidden md:block space-y-4 mb-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="horizontal" />
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 md:hidden">
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="vertical" />
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold bg-accent text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                3
              </button>
              <span className="w-10 h-10 flex items-center justify-center text-sm text-gray-400">
                ...
              </span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm text-ehaco-text hover:bg-white transition-colors border border-transparent hover:border-ehaco-border">
                10
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-gray-400 hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
