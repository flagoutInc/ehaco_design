import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

interface EventListItemProps {
  event: {
    id: number;
    image: string;
    title: string;
    dateShort: string;
    location: string;
    organizer?: string;
  };
  action?: ReactNode;
}

export default function EventListItem({ event, action }: EventListItemProps) {
  return (
    <div className="bg-white rounded-xl ring-1 ring-ehaco-border/50 overflow-hidden hover:shadow-md transition-all group relative">
      <Link to={`/event/${event.id}`} className="flex gap-4 p-4 items-center">
        <img src={event.image} alt={event.title} loading="lazy"
          className="w-16 h-16 md:w-20 md:h-16 rounded-lg object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base text-ehaco-text line-clamp-1 group-hover:text-accent transition">{event.title}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1 text-sm text-muted">
            <span>{event.dateShort}</span>
            <span>{event.location}</span>
          </div>
        </div>
        <svg className="w-5 h-5 text-muted group-hover:text-accent transition shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
      {action}
    </div>
  );
}
