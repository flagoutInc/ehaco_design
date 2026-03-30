import { Link } from 'react-router-dom';

export default function EventCard({ event, variant = 'vertical' }) {
  if (variant === 'horizontal') {
    return <HorizontalCard event={event} />;
  }
  return <VerticalCard event={event} />;
}

function VerticalCard({ event }) {
  return (
    <Link
      to={`/event/${event.id}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ehaco-border/50 transition duration-300 md:hover:-translate-y-1 hover:shadow-xl hover:ring-accent/20"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {event.isNew && (
            <span className="rounded-lg bg-accent px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              NEW
            </span>
          )}
          {event.isDeadlineSoon && (
            <span className="rounded-lg bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              締め切り間近
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <span className="inline-block rounded-md bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
          {event.category}
        </span>

        <h3 className="mt-2.5 line-clamp-2 text-[15px] font-bold leading-snug text-ehaco-text transition group-hover:text-accent">
          {event.title}
        </h3>

        <p className="mt-2.5 flex items-center gap-1.5 text-sm text-muted truncate">
          <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          <span className="truncate">{event.dateShort} · {event.location}</span>
        </p>

        <div className="mt-4 border-t border-ehaco-border/50 pt-4">
          <span className={`text-xs font-medium ${event.remaining <= 10 ? 'text-red-500' : 'text-muted'}`}>
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
  const formatLabel = event.location.includes('オンライン') ? 'オンライン' : event.location.includes('ハイブリッド') ? 'ハイブリッド' : 'オフライン';
  const formatColor = formatLabel === 'オンライン' ? 'bg-blue-50 text-blue-600' : formatLabel === 'ハイブリッド' ? 'bg-violet-50 text-violet-600' : 'bg-amber-50 text-amber-600';

  return (
    <Link
      to={`/event/${event.id}`}
      className="group flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-ehaco-border/50 transition duration-300 hover:shadow-xl hover:ring-accent/20"
    >
      {/* Image */}
      <div className="relative w-[200px] min-h-[220px] shrink-0 overflow-hidden md:w-[340px] md:min-h-[240px]">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {event.isNew && (
            <span className="rounded-lg bg-accent px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              NEW
            </span>
          )}
          {event.isDeadlineSoon && (
            <span className="rounded-lg bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
              締め切り間近
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4 md:p-5">
        <div>
          {/* Organizer + Format badge */}
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <img src={event.organizerLogo} alt={event.organizer} className="h-5 w-5 rounded-full shrink-0" />
              <span className="text-xs text-muted truncate">{event.organizer}</span>
            </div>
            <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${formatColor}`}>
              {formatLabel}
            </span>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-[15px] font-bold text-ehaco-text transition group-hover:text-accent">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="mt-1 line-clamp-1 text-sm text-muted">{event.description}</p>
          )}

          {/* Date + Location */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>{event.dateShort}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span key={tag} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-muted">+{extraCount}</span>
            )}
          </div>
        </div>

        {/* Remaining */}
        <div className="mt-3">
          <span className={`text-xs font-medium ${event.remaining <= 10 ? 'text-red-500' : 'text-muted'}`}>
            残り{event.remaining}席
          </span>
        </div>
      </div>
    </Link>
  );
}
