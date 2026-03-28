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
      value: 3,
      unit: '件',
      gradient: 'from-accent to-accent-light',
    },
    {
      label: 'お気に入り',
      value: 8,
      unit: '件',
      gradient: 'from-red-400 to-red-500',
    },
    {
      label: 'フォロー中',
      value: 5,
      unit: '社',
      gradient: 'from-primary to-primary-light',
    },
  ];

  const followingUpdates = [
    {
      organizer: 'テックイノベーション株式会社',
      logo: 'https://ui-avatars.com/api/?name=TI&background=1a3a5c&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[0],
      timeAgo: '2時間前',
    },
    {
      organizer: 'セキュアクラウド株式会社',
      logo: 'https://ui-avatars.com/api/?name=SC&background=2d5f8a&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[1],
      timeAgo: '5時間前',
    },
    {
      organizer: 'マーケテック・ラボ',
      logo: 'https://ui-avatars.com/api/?name=ML&background=00b8d4&color=fff&size=40',
      message: '新しいイベントを公開しました',
      event: events[2],
      timeAgo: '1日前',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        <MypageSidebar activePage="dashboard" />
        <div className="flex-1 min-w-0">
          {/* Welcome Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-light p-6 md:p-8 mb-8">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="relative">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-1">Welcome back</p>
              <h1 className="text-xl md:text-2xl font-black text-white mb-4">
                おかえりなさい、鈴木さん
              </h1>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 bg-white text-primary font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-white/90 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  イベントを探す
                </Link>
                <Link
                  to="/mypage/favorites"
                  className="inline-flex items-center gap-2 bg-white/15 text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-white/25 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  お気に入り
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl bg-gradient-to-br ${stat.gradient} p-5 text-white`}
              >
                <p className="text-sm text-white/80 mb-1">{stat.label}</p>
                <p className="flex items-baseline gap-1">
                  <span className="text-3xl font-black">{stat.value}</span>
                  <span className="text-sm text-white/70">{stat.unit}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Registered Events (recent 3) */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-ehaco-text">申込済みイベント（直近3件）</h2>
              <Link
                to="/mypage/events"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent border border-ehaco-border hover:border-accent rounded-full px-3 py-1 transition-colors"
              >
                すべて見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
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
                      <p className="text-xs text-gray-500 mb-1">{event.date}</p>
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
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent border border-ehaco-border hover:border-accent rounded-full px-3 py-1 transition-colors"
              >
                もっと見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="vertical" />
              ))}
            </div>
          </div>

          {/* Following Organizers Updates - Timeline */}
          <div>
            <h2 className="text-lg font-bold text-ehaco-text mb-4">
              フォロー中の主催者の新着
            </h2>
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-ehaco-border" />

              <div className="space-y-5">
                {followingUpdates.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-accent bg-white" />

                    <div className="bg-white rounded-xl border border-ehaco-border p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.logo}
                            alt={item.organizer}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-sm font-medium text-ehaco-text block sm:inline truncate">
                              {item.organizer}
                            </span>
                            <span className="text-sm text-gray-500 block sm:inline sm:ml-2">
                              {item.message}
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-2">{item.timeAgo}</span>
                      </div>
                      <div className="ml-0 sm:ml-11 bg-ehaco-bg rounded-lg p-3 flex items-center gap-3">
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
                          <p className="text-xs text-gray-500 mt-0.5">{item.event.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
