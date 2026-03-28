import { useState } from 'react';
import { Link } from 'react-router-dom';
import { events, categories, areas } from '../data/dummy';
import EventCard from '../components/EventCard';

const formatOptions = ['すべて', 'オンライン', 'オフライン', 'ハイブリッド'];
const priceOptions = ['すべて', '無料', '有料'];

export default function SearchPage() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedFormat, setSelectedFormat] = useState('すべて');
  const [selectedPrice, setSelectedPrice] = useState('すべて');
  const [sortBy, setSortBy] = useState('新着順');

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

  return (
    <div className="min-h-screen bg-ehaco-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-accent transition-colors">
            ホーム
          </Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-ehaco-text font-medium">イベント一覧</span>
        </nav>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white rounded-xl border border-ehaco-border">
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

        {/* 2-column layout */}
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
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
          </aside>

          {/* Right Main Area */}
          <main className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="text-lg font-bold text-ehaco-text">{events.length}件</span>のイベントが見つかりました
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                <option>新着順</option>
                <option>人気順</option>
                <option>締め切り順</option>
              </select>
            </div>

            {/* Event List */}
            <div className="space-y-4 mb-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="horizontal" />
              ))}
            </div>

            {/* Pagination */}
            <nav className="flex items-center justify-center gap-1">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                &laquo;
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
              <button className="w-10 h-10 flex items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-white hover:text-ehaco-text transition-colors border border-transparent hover:border-ehaco-border">
                &raquo;
              </button>
            </nav>
          </main>
        </div>
      </div>
    </div>
  );
}
