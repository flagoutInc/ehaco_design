import { useState } from 'react'
import { Link } from 'react-router-dom'
import { events } from '../data/dummy'
import EventCard from '../components/EventCard'

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  const recommendedEvents = events.slice(0, 4)
  const newEvents = events.filter((e) => e.isNew)
  const deadlineSoonEvents = events.filter((e) => e.isDeadlineSoon)

  const visibleCount = 3
  const maxIndex = Math.max(0, recommendedEvents.length - visibleCount)

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center h-[350px] text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            あなたにぴったりのビジネスイベントが見つかる
          </h1>
          <p className="text-lg text-white/80 mb-8">
            ウェビナー・セミナー情報を一括検索
          </p>
          <div className="w-full max-w-2xl flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="キーワードで検索..."
              className="flex-1 px-6 py-3 text-ehaco-text outline-none bg-transparent"
            />
            <Link
              to={`/search${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
              className="bg-accent hover:bg-accent-light text-white px-6 py-3 flex items-center gap-2 transition-colors"
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
              <span className="font-medium">検索</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 overflow-x-auto">
          <button className="flex items-center gap-1 px-4 py-2 border border-ehaco-border rounded-lg text-sm text-ehaco-text hover:bg-gray-50 transition-colors whitespace-nowrap">
            <span>業界</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center gap-1 px-4 py-2 border border-ehaco-border rounded-lg text-sm text-ehaco-text hover:bg-gray-50 transition-colors whitespace-nowrap">
            <span>エリア</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button className="flex items-center gap-1 px-4 py-2 border border-ehaco-border rounded-lg text-sm text-ehaco-text hover:bg-gray-50 transition-colors whitespace-nowrap">
            <span>日時</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <Link
            to="/search"
            className="ml-auto bg-accent hover:bg-accent-light text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            検索
          </Link>
        </div>
      </section>

      {/* おすすめのイベント Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ehaco-text">おすすめのイベント</h2>
          <Link
            to="/search"
            className="text-accent hover:text-accent-light font-medium transition-colors"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="relative">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-6"
              style={{
                transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)`,
              }}
            >
              {recommendedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})` }}
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* 新着イベント Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ehaco-text">新着イベント</h2>
        </div>
        {newEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newEvents.map((event) => (
              <EventCard key={event.id} event={event} variant="vertical" />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            新着イベントはありません
          </p>
        )}
      </section>

      {/* 締め切り間近 Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-ehaco-text">締め切り間近</h2>
        </div>
        {deadlineSoonEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>
    </div>
  )
}

export default HomePage
