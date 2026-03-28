import { Link } from 'react-router-dom';
import MypageSidebar from '../../components/MypageSidebar';
import EventCard from '../../components/EventCard';
import { events, user } from '../../data/dummy';

export default function DashboardPage() {
  const registeredEvents = events.slice(0, 3);
  const recommendedEvents = events.slice(3, 6);

  const stats = [
    {
      label: '参加予定',
      value: '3件',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'text-accent bg-accent/10',
    },
    {
      label: 'お気に入り',
      value: '8件',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'text-red-500 bg-red-50',
    },
    {
      label: 'フォロー中',
      value: '5社',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: 'text-primary bg-primary/10',
    },
  ];

  const followingUpdates = [
    {
      organizer: 'テックイノベーション株式会社',
      logo: 'https://ui-avatars.com/api/?name=TI&background=1a3a5c&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[0],
    },
    {
      organizer: 'セキュアクラウド株式会社',
      logo: 'https://ui-avatars.com/api/?name=SC&background=2d5f8a&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[1],
    },
    {
      organizer: 'マーケテック・ラボ',
      logo: 'https://ui-avatars.com/api/?name=ML&background=00b8d4&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[2],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        <MypageSidebar activePage="dashboard" />
        <div className="flex-1">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-ehaco-text mb-6">
              おかえりなさい、鈴木さん
            </h1>
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-ehaco-border p-5 flex items-center gap-4"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-ehaco-text">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Registered Events (recent 3) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ehaco-text">申込済みイベント（直近3件）</h2>
              <Link
                to="/mypage/events"
                className="text-sm text-accent hover:text-accent-light transition"
              >
                すべて見る →
              </Link>
            </div>
            <div className="space-y-3">
              {registeredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-ehaco-border overflow-hidden flex hover:shadow-md transition-shadow"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-[120px] h-[90px] object-cover shrink-0"
                  />
                  <div className="flex-1 p-3 flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 mb-1">{event.date}</p>
                      <Link
                        to={`/event/${event.id}`}
                        className="font-semibold text-sm text-ehaco-text hover:text-accent transition line-clamp-1"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                        <span>{event.organizer}</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Events */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ehaco-text">おすすめイベント</h2>
              <Link
                to="/search"
                className="text-sm text-accent hover:text-accent-light transition"
              >
                もっと見る →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {recommendedEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="vertical" />
              ))}
            </div>
          </div>

          {/* Following Organizers Updates */}
          <div>
            <h2 className="text-lg font-bold text-ehaco-text mb-4">
              フォロー中の主催者の新着
            </h2>
            <div className="space-y-3">
              {followingUpdates.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-ehaco-border p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={item.logo}
                      alt={item.organizer}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <span className="text-sm font-medium text-ehaco-text">
                        {item.organizer}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {item.message}
                      </span>
                    </div>
                  </div>
                  <div className="ml-11 bg-ehaco-bg rounded-lg p-3 flex items-center gap-3">
                    <img
                      src={item.event.image}
                      alt={item.event.title}
                      className="w-16 h-12 rounded object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <Link
                        to={`/event/${item.event.id}`}
                        className="text-sm font-medium text-ehaco-text hover:text-accent transition line-clamp-1"
                      >
                        {item.event.title}
                      </Link>
                      <p className="text-xs text-gray-400 mt-0.5">{item.event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
