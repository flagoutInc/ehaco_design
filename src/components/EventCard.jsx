import { Link } from 'react-router-dom';

export default function EventCard({ event, variant = 'vertical' }) {
  if (variant === 'horizontal') {
    return <HorizontalCard event={event} />;
  }
  return <VerticalCard event={event} />;
}

function VerticalCard({ event }) {
  return (
    <Link to={`/event/${event.id}`} className="group block overflow-hidden rounded-xl border border-ehaco-border border-t-4 border-t-accent bg-white shadow-sm transition duration-200 md:hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          {event.isNew && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
              NEW
            </span>
          )}
          {event.isDeadlineSoon && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              締め切り間近
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Category badge */}
        <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {event.category}
        </span>

        {/* Title */}
        <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-ehaco-text group-hover:text-accent transition">
          {event.title}
        </h3>

        {/* Date · Location (1 line) */}
        <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600 truncate">
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate">{event.dateShort} · {event.location}</span>
        </p>

        {/* Bottom: price + remaining + progress bar */}
        <div className="mt-3 flex items-center justify-between border-t border-ehaco-border pt-3">
          <span
            className={`text-sm font-semibold ${
              event.price === '無料' ? 'text-emerald-600' : 'text-ehaco-text'
            }`}
          >
            {event.price}
          </span>
          <span
            className={`text-xs ${
              event.remaining <= 10
                ? 'font-semibold text-red-500'
                : 'text-gray-600'
            }`}
          >
            残り{event.remaining}席
          </span>
        </div>
      </div>
    </Link>
  );
}

function HorizontalCard({ event }) {
  const visibleTags = event.tags.slice(0, 3);
  const extraCount = event.tags.length - 3;

  return (
    <Link to={`/event/${event.id}`} className="group flex overflow-hidden rounded-xl border border-ehaco-border border-l-4 border-l-accent bg-white shadow-sm transition duration-200 hover:shadow-lg">
      {/* Image */}
      <div className="relative w-[120px] shrink-0 overflow-hidden md:w-[200px]">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {/* Badges overlay */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {event.isNew && (
            <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-white">
              NEW
            </span>
          )}
          {event.isDeadlineSoon && (
            <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              締め切り間近
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          {/* Category badge */}
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {event.category}
          </span>

          {/* Title */}
          <h3 className="mt-1.5 line-clamp-2 text-base font-bold text-ehaco-text group-hover:text-accent transition">
            {event.title}
          </h3>

          {/* Date & location */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{event.dateShort}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="h-3.5 w-3.5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>

          {/* Tags (max 3) */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
              >
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                +{extraCount}
              </span>
            )}
          </div>
        </div>

        {/* Bottom: price + remaining + progress */}
        <div>
          <div className="mt-3 flex items-center gap-4">
            <span
              className={`text-sm font-semibold ${
                event.price === '無料' ? 'text-emerald-600' : 'text-ehaco-text'
              }`}
            >
              {event.price}
            </span>
            <span
              className={`text-xs ${
                event.remaining <= 10
                  ? 'font-semibold text-red-500'
                  : 'text-gray-600'
              }`}
            >
              残り{event.remaining}席
            </span>
          </div>
          </div>
      </div>
    </Link>
  );
}
