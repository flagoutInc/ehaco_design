import { useState } from 'react';
import MypageSidebar from '../../components/MypageSidebar';
import EventCard from '../../components/EventCard';
import { events } from '../../data/dummy';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(
    new Set(events.map((e) => e.id))
  );

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const favoriteEvents = events.filter((e) => favorites.has(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <MypageSidebar activePage="favorites" />
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-bold text-ehaco-text">お気に入り</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {favoriteEvents.length}件
            </span>
          </div>

          {/* Grid */}
          {favoriteEvents.length > 0 ? (
            <div className="grid grid-cols-3 gap-4">
              {favoriteEvents.map((event) => (
                <div key={event.id} className="relative">
                  <EventCard event={event} variant="vertical" />
                  {/* Heart overlay */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(event.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform z-10"
                  >
                    <svg
                      className={`w-5 h-5 ${
                        favorites.has(event.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-gray-400'
                      }`}
                      fill={favorites.has(event.id) ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-ehaco-border p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-gray-500">お気に入りのイベントはありません</p>
              <Link
                to="/search"
                className="inline-block mt-4 text-sm text-accent hover:text-accent-light transition"
              >
                イベントを探す →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
