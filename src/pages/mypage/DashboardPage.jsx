import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MypageSidebar from '../../components/MypageSidebar';
import EventCard from '../../components/EventCard';
import { events } from '../../data/dummy';

export default function DashboardPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const registeredEvents = events.slice(0, 3);
  const favoriteEvents = events.slice(3, 9);
  const followingCount = 5;

  const followUpdates = [
    {
      organizer: 'テックイノベーション株式会社',
      logo: 'https://ui-avatars.com/api/?name=TI&background=0f172a&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[15] || events[0],
      timeAgo: '2時間前',
    },
    {
      organizer: 'セキュアクラウド株式会社',
      logo: 'https://ui-avatars.com/api/?name=SC&background=1e293b&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[16] || events[1],
      timeAgo: '5時間前',
    },
    {
      organizer: 'AIソリューションズ株式会社',
      logo: 'https://ui-avatars.com/api/?name=AS&background=6366f1&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[17] || events[2],
      timeAgo: '1日前',
    },
  ];

  const stats = [
    {
      key: 'events',
      label: '参加予定',
      value: registeredEvents.length,
      unit: '件',
      color: 'bg-accent/10 text-accent',
    },
    {
      key: 'favorites',
      label: 'お気に入り',
      value: favoriteEvents.length,
      unit: '件',
      color: 'bg-rose-50 text-rose-500',
    },
    {
      key: 'following',
      label: 'フォロー中',
      value: followingCount,
      unit: '社',
      color: 'bg-primary/10 text-primary',
    },
  ];

  const navigate = useNavigate();

  const statLinks = {
    events: '/mypage/events',
    favorites: '/mypage/favorites',
    following: null,
  };

  const handleStatClick = (key) => {
    // Mobile: navigate directly
    if (window.innerWidth < 640 && statLinks[key]) {
      navigate(statLinks[key]);
      return;
    }
    // PC: toggle expand
    setExpandedSection((prev) => (prev === key ? null : key));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pb-20 sm:pb-8 fade-in">
      <MypageSidebar activePage="dashboard" />
      <div className="mt-6">

        {/* Stats Cards — clickable */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
          {stats.map((stat) => (
            <button
              key={stat.key}
              onClick={() => handleStatClick(stat.key)}
              className={`relative rounded-2xl p-4 md:p-5 text-left cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all ${stat.color} ${
                expandedSection === stat.key ? 'ring-2 ring-current shadow-md' : ''
              }`}
            >
              <svg className="absolute top-3 right-3 w-4 h-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
              <p className="text-xs md:text-sm opacity-70 mb-1">{stat.label}</p>
              <p className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-black">{stat.value}</span>
                <span className="text-xs opacity-60">{stat.unit}</span>
              </p>
            </button>
          ))}
        </div>

        {/* Expanded Section — 申込済み */}
        {expandedSection === 'events' && (
          <div className="mb-8 animate-[fadeIn_0.2s_ease-out]">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4">申込済みイベント</h2>
            <div className="space-y-5">
              {registeredEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="horizontal" />
              ))}
            </div>
          </div>
        )}

        {/* Expanded Section — お気に入り */}
        {expandedSection === 'favorites' && (
          <div className="mb-8 animate-[fadeIn_0.2s_ease-out]">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4">お気に入り</h2>
            <div className="space-y-5">
              {favoriteEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="horizontal" />
              ))}
            </div>
          </div>
        )}

        {/* Expanded Section — フォロー中 */}
        {expandedSection === 'following' && (
          <div className="mb-8 animate-[fadeIn_0.2s_ease-out]">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4">フォロー中の新着</h2>
            <div className="space-y-5">
              {followUpdates.map((item, i) => (
                <div key={i} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={item.logo} alt={item.organizer} loading="lazy" className="w-8 h-8 rounded-full shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-ehaco-text truncate">{item.organizer}</p>
                        <p className="text-xs text-muted">{item.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted shrink-0 ml-2">{item.timeAgo}</span>
                  </div>
                  <Link
                    to={`/event/${item.event.id}`}
                    className="flex items-center gap-3 bg-ehaco-bg rounded-xl p-3 hover:bg-gray-100 transition"
                  >
                    <img src={item.event.image} alt={item.event.title} loading="lazy" className="w-16 h-12 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ehaco-text line-clamp-1">{item.event.title}</p>
                      <p className="text-xs text-muted mt-0.5">{item.event.dateShort} · {item.event.location}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Default: 次のイベント + 申込済み（expandedがnullの時） */}
        {!expandedSection && (
          <>
            {/* 次のイベント */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4">次のイベント</h2>
              {registeredEvents[0] ? (
                <Link
                  to={`/event/${registeredEvents[0].id}`}
                  className="block bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 md:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex gap-5">
                    <img
                      src={registeredEvents[0].image}
                      alt={registeredEvents[0].title}
                      loading="lazy"
                      className="w-[100px] sm:w-[140px] md:w-[200px] rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <p className="text-sm text-muted mb-1">{registeredEvents[0].date}</p>
                      <h3 className="text-xl md:text-2xl font-bold text-ehaco-text mb-2 line-clamp-2">{registeredEvents[0].title}</h3>
                      <p className="text-sm text-muted">{registeredEvents[0].organizer} · {registeredEvents[0].location}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-8 text-center">
                  <p className="text-muted mb-3">申込済みイベントはありません</p>
                  <Link to="/" className="text-sm font-medium text-accent hover:underline">
                    イベントを探す →
                  </Link>
                </div>
              )}
            </div>

            {/* 申込済み一覧 */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-ehaco-text mb-4">申込済みイベント</h2>
              <div className="space-y-5">
                {registeredEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/event/${event.id}`}
                    className="bg-white rounded-xl border border-ehaco-border overflow-hidden flex hover:shadow-md transition-shadow"
                  >
                    <img src={event.image} alt={event.title} loading="lazy" className="w-[80px] h-[70px] sm:w-[120px] sm:h-[90px] object-cover shrink-0" />
                    <div className="flex-1 p-3 flex items-center">
                      <div className="min-w-0">
                        <p className="text-xs text-muted mb-1">{event.date}</p>
                        <p className="font-semibold text-sm text-ehaco-text line-clamp-1">{event.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted">
                          <span>{event.organizer}</span>
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
