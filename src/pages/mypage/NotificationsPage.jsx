import { useState } from 'react';
import { Link } from 'react-router-dom';
import MypageSidebar from '../../components/MypageSidebar';
import { notifications as notifData } from '../../data/dummy';

const typeConfig = {
  event: {
    color: 'bg-accent text-white',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  reminder: {
    color: 'bg-amber-500 text-white',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  recommend: {
    color: 'bg-purple-500 text-white',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
  organizer: {
    color: 'bg-green-500 text-white',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  system: {
    color: 'bg-gray-400 text-white',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
};

const GROUP_ORDER = ['今日', '昨日', '今週', 'それ以前'];

function getDateGroup(dateRelative) {
  if (dateRelative.includes('時間前') || dateRelative.includes('分前')) return '今日';
  if (dateRelative.includes('昨日')) return '昨日';
  const dayMatch = dateRelative.match(/(\d+)日前/);
  if (dayMatch && parseInt(dayMatch[1], 10) <= 7) return '今週';
  return 'それ以前';
}

function groupNotifications(notifications) {
  const groups = new Map();
  for (const group of GROUP_ORDER) {
    groups.set(group, []);
  }
  for (const notif of notifications) {
    const group = getDateGroup(notif.dateRelative);
    groups.get(group).push(notif);
  }
  // Return only non-empty groups in order
  return GROUP_ORDER
    .filter((g) => groups.get(g).length > 0)
    .map((g) => ({ label: g, items: groups.get(g) }));
}

const filterTabs = ['すべて', '未読のみ'];

export default function NotificationsPage() {
  const [readState, setReadState] = useState(
    () => new Map(notifData.map((n) => [n.id, n.read]))
  );
  const [activeFilter, setActiveFilter] = useState('すべて');

  const unreadCount = [...readState.values()].filter((v) => !v).length;

  const markAsRead = (id) => {
    setReadState((prev) => {
      const next = new Map(prev);
      next.set(id, true);
      return next;
    });
  };

  const markAllAsRead = () => {
    setReadState((prev) => {
      const next = new Map(prev);
      for (const key of next.keys()) {
        next.set(key, true);
      }
      return next;
    });
  };

  const filteredNotifications =
    activeFilter === '未読のみ'
      ? notifData.filter((n) => !readState.get(n.id))
      : notifData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 pb-20 sm:pb-8 fade-in">
      <MypageSidebar activePage="notifications" />
      <div className="mt-6">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">お知らせ</h1>
                <div className="mt-2 h-1.5 w-16 bg-accent rounded-full" />
              </div>
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}件未読
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={markAllAsRead}
                className="text-xs md:text-sm text-accent hover:text-accent-light transition"
              >
                すべて既読にする
              </button>
              <Link
                to="/mypage/settings"
                className="text-xs md:text-sm text-gray-500 hover:text-ehaco-text transition flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                通知設定
              </Link>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-6 border-b border-ehaco-border mb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`pb-3 text-base font-medium transition relative ${
                  activeFilter === tab
                    ? 'text-accent'
                    : 'text-gray-500 hover:text-ehaco-text'
                }`}
              >
                {tab}
                {activeFilter === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Notification list — flat card style */}
          {filteredNotifications.length > 0 ? (
            <div>
                  {filteredNotifications.map((notif) => {
                    const isRead = readState.get(notif.id);
                    const config = typeConfig[notif.type] || typeConfig.system;

                    return (
                      <button
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`w-full text-left flex items-start gap-4 p-5 mb-4 rounded-2xl ring-1 transition hover:shadow-md ${
                          !isRead
                            ? 'ring-accent/20 bg-accent/5'
                            : 'ring-ehaco-border/50 bg-white'
                        }`}
                      >
                        {/* Type color dot & icon */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${config.color}`}
                        >
                          {config.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-base ${
                              !isRead
                                ? 'font-bold text-ehaco-text'
                                : 'font-medium text-ehaco-text'
                            }`}
                          >
                            {notif.title}
                          </p>
                          <p className="text-sm text-muted mt-0.5 line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            {notif.dateRelative}
                          </p>
                        </div>

                        {/* Unread dot */}
                        {!isRead && (
                          <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-2" />
                        )}
                      </button>
                    );
                  })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 sm:p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <p className="font-bold text-ehaco-text mb-1">未読のお知らせはありません</p>
              <p className="text-sm text-muted">新しいお知らせが届くとここに表示されます</p>
            </div>
          )}
      </div>
    </div>
  );
}
