import { useRef } from 'react';
import type { Event } from '../data/dummy';
import EventCard from './EventCard';

interface RecommendedCarouselProps {
  events: Event[];
}

function scrollCarousel(container: HTMLDivElement, direction: number) {
  const firstChild = container.querySelector(':scope > *') as HTMLElement | null;
  const cardWidth = firstChild?.offsetWidth || 300;
  const scrollAmount = direction * (cardWidth + 20);

  // Loop: if near the end going right, jump to start; if at start going left, jump to end
  if (direction > 0 && container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
    container.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (direction < 0 && container.scrollLeft <= 10) {
    container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

export default function RecommendedCarousel({ events }: RecommendedCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    if (scrollRef.current) {
      scrollCarousel(scrollRef.current, direction);
    }
  };

  return (
    <div className="mb-10">
      <div className="mb-8">
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-1.5">Recommended</p>
        <h2 className="text-2xl md:text-3xl font-black text-ehaco-text tracking-tight">おすすめのイベント</h2>
      </div>
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => handleScroll(-1)}
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
          {events.map((event) => (
            <div key={event.id} className="w-[240px] sm:w-[280px] md:w-[300px] shrink-0 self-stretch">
              <EventCard event={event} variant="vertical" className="h-full" />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => handleScroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 bg-white shadow-lg ring-1 ring-ehaco-border/50 rounded-xl flex items-center justify-center text-ehaco-text hover:bg-gray-50 transition hidden md:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
