import { useState } from 'react';
import { Link } from 'react-router-dom';
import { events } from '../../data/dummy';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(new Set(events.slice(0, 8).map((e) => e.id)));

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const favoriteEvents = events.filter((e) => favorites.has(e.id));

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">お気に入り</h1>
          <span className="text-sm text-muted bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">{favoriteEvents.length}件</span>
        </div>
        <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition hidden sm:block">イベントを探す →</Link>
      </div>

      {favoriteEvents.length > 0 ? (
        <div className="space-y-3">
          {favoriteEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl ring-1 ring-ehaco-border/50 overflow-hidden hover:shadow-md transition-all group relative">
              <Link to={`/event/${event.id}`} className="flex gap-4 p-4 items-center">
                <img src={event.image} alt={event.title} loading="lazy" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-ehaco-text line-clamp-2 leading-snug group-hover:text-accent transition">{event.title}</p>
                  <p className="text-xs text-muted mt-1">{event.dateShort} · {event.location}</p>
                </div>
              </Link>
              <button onClick={() => toggleFavorite(event.id)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10">
                <svg className={`w-5 h-5 ${favorites.has(event.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
                  fill={favorites.has(event.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="font-bold text-lg text-ehaco-text mb-2">お気に入りはありません</p>
          <p className="text-sm text-muted mb-5">イベント詳細ページからお気に入りに追加できます</p>
          <Link to="/" className="btn-gradient font-medium text-sm px-6 py-2.5 rounded-xl transition active:scale-[0.97]">イベントを探す</Link>
        </div>
      )}
    </div>
  );
}
