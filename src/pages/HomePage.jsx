import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { events, categories, areas } from '../data/dummy'
import EventCard from '../components/EventCard'

function useVisibleCount() {
  const getCount = () => {
    if (typeof window === 'undefined') return 3
    if (window.innerWidth < 640) return 1
    if (window.innerWidth < 1024) return 2
    return 3
  }
  const [count, setCount] = useState(getCount)
  useEffect(() => {
    const handler = () => setCount(getCount())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return count
}

function SectionHeader({ enLabel, title, className = '' }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">{enLabel}</p>
      <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">{title}</h2>
    </div>
  )
}

function HomePage() {
  const visibleCount = useVisibleCount()
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const [openFilter, setOpenFilter] = useState(null)
  const filterRef = useRef(null)

  const [selectedIndustry, setSelectedIndustry] = useState([])
  const [selectedArea, setSelectedArea] = useState([])
  const [selectedDate, setSelectedDate] = useState([])

  const recommendedEvents = events.slice(0, 4)
  const newEvents = events.filter((e) => e.isNew)
  const deadlineSoonEvents = events.filter((e) => e.isDeadlineSoon)

  useEffect(() => {
    function handleClickOutside(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilter(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleItem = (setter) => (item) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const filterOptions = {
    industry: { label: '業界', items: categories, selected: selectedIndustry, toggle: toggleItem(setSelectedIndustry) },
    area: { label: 'エリア', items: areas, selected: selectedArea, toggle: toggleItem(setSelectedArea) },
    date: { label: '日時', items: ['今日', '今週', '今月', '来月以降'], selected: selectedDate, toggle: toggleItem(setSelectedDate) },
  }

  const totalSelected = selectedIndustry.length + selectedArea.length + selectedDate.length

  const buildSearchUrl = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    selectedIndustry.forEach((v) => params.append('industry', v))
    selectedArea.forEach((v) => params.append('area', v))
    selectedDate.forEach((v) => params.append('date', v))
    const qs = params.toString()
    return `/search${qs ? `?${qs}` : ''}`
  }

  const clearFilters = () => {
    setSelectedIndustry([])
    setSelectedArea([])
    setSelectedDate([])
  }

  const maxIndex = Math.max(0, recommendedEvents.length - visibleCount)

  useEffect(() => {
    setCarouselIndex((prev) => Math.min(prev, maxIndex))
  }, [maxIndex])

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary">
        {/* Background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light/80 to-accent/20" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-16 sm:py-24 md:py-36 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-white/80">ビジネスイベントプラットフォーム</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black leading-[1.15] text-white mb-4 md:mb-5 tracking-tight">
            あなたにぴったりの<br className="hidden sm:inline" />イベントが見つかる
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-white/60 mb-10 md:mb-12 max-w-lg">
            ウェビナー・セミナー情報を一括検索
          </p>

          {/* Search + Filters */}
          <div className="w-full max-w-2xl" ref={filterRef}>
            {/* Search bar — glass style */}
            <div className="flex items-center bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 ring-1 ring-white/20 overflow-hidden">
              <div className="flex items-center flex-1 px-5 md:px-6 gap-3">
                <svg className="h-5 w-5 text-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="キーワードで検索..."
                  className="flex-1 py-4 text-sm md:text-base text-ehaco-text outline-none bg-transparent placeholder:text-muted/50"
                />
              </div>
              <Link
                to={buildSearchUrl()}
                className="bg-accent hover:bg-accent-light text-white px-6 md:px-8 py-4 font-semibold text-sm transition-colors"
              >
                検索
              </Link>
            </div>

            {/* Filter chips */}
            <div className="flex items-center justify-center gap-2 md:gap-3 mt-5 flex-wrap">
              {Object.entries(filterOptions).map(([key, { label, items, selected, toggle }]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenFilter(openFilter === key ? null : key)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      openFilter === key || selected.length > 0
                        ? 'bg-white text-accent shadow-lg shadow-black/5'
                        : 'bg-white/15 text-white/80 hover:bg-white/25 backdrop-blur-sm'
                    }`}
                  >
                    <span>{label}</span>
                    {selected.length > 0 && (
                      <span className="bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center leading-none">
                        {selected.length}
                      </span>
                    )}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${openFilter === key ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFilter === key && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 bg-white rounded-2xl border border-ehaco-border shadow-2xl py-2 z-40">
                      {items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ehaco-text hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selected.includes(item)}
                            onChange={() => toggle(item)}
                            className="w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent"
                          />
                          {item}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {totalSelected > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium text-white/70 bg-white/15 hover:bg-white/25 px-3 py-2 rounded-xl transition-colors backdrop-blur-sm"
                >
                  クリア
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* おすすめのイベント Carousel */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-24">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <SectionHeader enLabel="Recommended" title="おすすめのイベント" />
            <Link
              to="/search"
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-muted hover:text-accent rounded-xl px-4 py-2 transition-colors hover:bg-accent/5"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            <button
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 z-10 w-10 h-10 md:w-11 md:h-11 bg-white shadow-lg shadow-black/5 ring-1 ring-ehaco-border/50 rounded-xl flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="overflow-hidden mx-2 md:mx-0">
              <div
                className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
                style={{
                  transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)`,
                }}
              >
                {recommendedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex-shrink-0"
                    style={{ width: `calc((100% - ${(visibleCount - 1) * (visibleCount > 1 ? 24 : 16)}px) / ${visibleCount})` }}
                  >
                    <EventCard event={event} variant="vertical" />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={carouselIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 z-10 w-10 h-10 md:w-11 md:h-11 bg-white shadow-lg shadow-black/5 ring-1 ring-ehaco-border/50 rounded-xl flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === carouselIndex
                    ? 'w-8 h-2 bg-accent'
                    : 'w-2 h-2 bg-ehaco-border hover:bg-muted'
                }`}
                aria-label={`スライド ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 新着イベント Section */}
      <section className="bg-section-tint">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-24">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <SectionHeader enLabel="New Arrivals" title="新着イベント" />
            <Link
              to="/search?sort=new"
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-muted hover:text-accent rounded-xl px-4 py-2 transition-colors hover:bg-accent/5"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          {newEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {newEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="vertical" />
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-12">新着イベントはありません</p>
          )}
        </div>
      </section>

      {/* 締め切り間近 Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:py-16 md:py-24">
          <div className="flex items-end justify-between mb-6 sm:mb-10">
            <SectionHeader enLabel="Closing Soon" title="締め切り間近" />
            <Link
              to="/search?sort=deadline"
              className="inline-flex items-center gap-1.5 text-sm md:text-base font-medium text-muted hover:text-accent rounded-xl px-4 py-2 transition-colors hover:bg-accent/5"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          {deadlineSoonEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {deadlineSoonEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} variant="vertical" />
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md flex items-center gap-1.5">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    残り{event.remaining}席
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-12">締め切り間近のイベントはありません</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
