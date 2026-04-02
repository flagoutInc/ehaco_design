import { Link } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import { events, user } from '../../data/dummy';

const followUpdates = [
  { organizer: 'テックファーム株式会社', logo: 'https://ui-avatars.com/api/?name=TI&background=6366f1&color=fff&size=40', event: events[15] || events[0], timeAgo: '2時間前' },
  { organizer: '株式会社ネオキャリア', logo: 'https://ui-avatars.com/api/?name=SC&background=2d5f8a&color=fff&size=40', event: events[16] || events[1], timeAgo: '5時間前' },
  { organizer: 'ファインディ株式会社', logo: 'https://ui-avatars.com/api/?name=AS&background=f59e0b&color=fff&size=40', event: events[17] || events[2], timeAgo: '1日前' },
];

const registeredEvents = events.slice(0, 3);
const recommendedEvents = events.slice(8, 12);

export default function DashboardPage() {
  return (
    <div className="fade-in">
      {/* Stats — top */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
        <Link to="/mypage/events" className="rounded-2xl p-4 md:p-5 bg-accent/10 text-accent hover:shadow-md hover:scale-[1.02] transition-all">
          <p className="text-xs md:text-sm opacity-70 mb-1">参加予定</p>
          <p className="flex items-baseline gap-1"><span className="text-3xl md:text-4xl font-black">{registeredEvents.length}</span><span className="text-xs opacity-60">件</span></p>
        </Link>
        <Link to="/mypage/favorites" className="rounded-2xl p-4 md:p-5 bg-rose-50 text-rose-500 hover:shadow-md hover:scale-[1.02] transition-all">
          <p className="text-xs md:text-sm opacity-70 mb-1">お気に入り</p>
          <p className="flex items-baseline gap-1"><span className="text-3xl md:text-4xl font-black">{user.favoriteCount}</span><span className="text-xs opacity-60">件</span></p>
        </Link>
        <Link to="/mypage/following" className="rounded-2xl p-4 md:p-5 bg-primary/10 text-primary hover:shadow-md hover:scale-[1.02] transition-all">
          <p className="text-xs md:text-sm opacity-70 mb-1">フォロー中</p>
          <p className="flex items-baseline gap-1"><span className="text-3xl md:text-4xl font-black">5</span><span className="text-xs opacity-60">社</span></p>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left: upcoming events */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ehaco-text">参加予定のイベント</h2>
            <Link to="/mypage/events" className="text-sm text-accent hover:text-accent-light font-medium transition">すべて見る →</Link>
          </div>
          <div className="space-y-3">
            {registeredEvents.map((event) => (
              <Link key={event.id} to={`/event/${event.id}`}
                className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-4 flex gap-4 items-center hover:shadow-md transition-all group">
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
            ))}
            {registeredEvents.length === 0 && (
              <div className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-8 text-center">
                <p className="text-muted mb-3">参加予定のイベントはありません</p>
                <Link to="/" className="text-sm font-medium text-accent hover:underline">イベントを探す →</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right: follow updates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ehaco-text">フォロー中の新着</h2>
            <Link to="/mypage/following" className="text-sm text-accent hover:text-accent-light font-medium transition">一覧 →</Link>
          </div>
          <div className="space-y-3">
            {followUpdates.map((item, i) => (
              <Link key={i} to={`/event/${item.event.id}`}
                className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-3.5 block hover:shadow-md transition-all group">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <img src={item.logo} alt={item.organizer} loading="lazy" className="w-7 h-7 rounded-full shrink-0" />
                  <p className="text-xs text-muted truncate flex-1">{item.organizer}</p>
                  <span className="text-xs text-muted shrink-0">{item.timeAgo}</span>
                </div>
                <div className="flex gap-3 items-center">
                  <img src={item.event.image} alt={item.event.title} loading="lazy" className="w-14 h-10 rounded-lg object-cover shrink-0" />
                  <p className="text-sm font-medium text-ehaco-text line-clamp-2 leading-snug group-hover:text-accent transition">{item.event.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ehaco-text">あなたへのおすすめ</h2>
          <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition">もっと見る →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="vertical" />
          ))}
        </div>
      </div>

    </div>
  );
}
