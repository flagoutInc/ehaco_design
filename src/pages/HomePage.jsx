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
      <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">{enLabel}</p>
      <h2 className="text-2xl md:text-3xl font-black text-ehaco-text">{title}</h2>
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

  // Close filter dropdown on outside click
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

  // Reset carousel index when visibleCount changes
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
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center py-20 md:py-28 text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-white mb-3 md:mb-4">
            あなたにぴったりの<br className="hidden sm:inline" />ビジネスイベントが見つかる
          </h1>
          <p className="text-sm md:text-lg text-white/80 mb-6 md:mb-8">
            ウェビナー・セミナー情報を一括検索
          </p>

          {/* Search + Filters */}
          <div className="w-full max-w-2xl" ref={filterRef}>
            {/* Search bar */}
            <div className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="キーワードで検索..."
                className="flex-1 px-5 md:px-7 py-4 text-sm md:text-base text-ehaco-text outline-none bg-transparent"
              />
              <Link
                to={buildSearchUrl()}
                className="bg-accent hover:bg-accent-light text-white px-5 md:px-7 py-4 flex items-center gap-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="font-medium hidden sm:inline">検索</span>
              </Link>
            </div>

            {/* Filter chips */}
            <div className="flex items-center justify-center gap-2 md:gap-3 mt-4 flex-wrap">
              {Object.entries(filterOptions).map(([key, { label, items, selected, toggle }]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenFilter(openFilter === key ? null : key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                      openFilter === key || selected.length > 0
                        ? 'bg-white text-accent shadow-sm'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <span>{label}</span>
                    {selected.length > 0 && (
                      <span className="bg-accent text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none">
                        {selected.length}
                      </span>
                    )}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 bg-white rounded-xl border border-ehaco-border shadow-lg py-2 z-40">
                      {items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2.5 px-4 py-2 text-sm text-ehaco-text hover:bg-gray-50 cursor-pointer transition-colors"
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
                  className="text-xs text-white bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full transition-colors whitespace-nowrap"
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
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader enLabel="Recommended" title="おすすめのイベント" />
            <Link
              to="/search"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent border border-ehaco-border hover:border-accent rounded-full px-3 py-1 transition-colors"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="relative">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              disabled={carouselIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-md rounded-full flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div className="overflow-hidden mx-2 md:mx-0">
              <div
                className="flex transition-transform duration-300 ease-in-out gap-4 md:gap-6"
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

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={carouselIndex >= maxIndex}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 z-10 w-10 h-10 md:w-12 md:h-12 bg-white shadow-md rounded-full flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCarouselIndex(i)}
                className={`rounded-full transition-all ${
                  i === carouselIndex
                    ? 'w-6 h-2 bg-accent'
                    : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`スライド ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 新着イベント Section */}
      <section className="bg-section-tint">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader enLabel="New Arrivals" title="新着イベント" />
            <Link
              to="/search?sort=new"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent border border-ehaco-border hover:border-accent rounded-full px-3 py-1 transition-colors"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          {newEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {newEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="vertical" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              新着イベントはありません
            </p>
          )}
        </div>
      </section>

      {/* 締め切り間近 Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <SectionHeader enLabel="Closing Soon" title="締め切り間近" />
            <Link
              to="/search?sort=deadline"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent border border-ehaco-border hover:border-accent rounded-full px-3 py-1 transition-colors"
            >
              すべて見る
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          {deadlineSoonEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {deadlineSoonEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} variant="vertical" />
                  {/* Remaining Count Badge */}
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    残り{event.remaining}席
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              締め切り間近のイベントはありません
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
