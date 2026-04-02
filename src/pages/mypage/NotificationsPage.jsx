import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notifications as notifData } from '../../data/dummy';

const typeColors = {
  event: 'bg-accent', reminder: 'bg-amber-500', recommend: 'bg-purple-500',
  organizer: 'bg-green-500', system: 'bg-gray-400',
};

export default function NotificationsPage() {
  const [readState, setReadState] = useState(() => new Map(notifData.map((n) => [n.id, n.read])));
  const [filter, setFilter] = useState('all');

  const unreadCount = [...readState.values()].filter((v) => !v).length;
  const markAsRead = (id) => setReadState((prev) => { const next = new Map(prev); next.set(id, true); return next; });
  const getNotifLink = (notif) => notif.link || (notif.eventId ? `/event/${notif.eventId}` : null);
  const markAllAsRead = () => setReadState((prev) => { const next = new Map(prev); for (const k of next.keys()) next.set(k, true); return next; });

  const filtered = filter === 'unread' ? notifData.filter((n) => !readState.get(n.id)) : notifData;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">お知らせ</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="text-sm text-accent hover:text-accent-light transition">すべて既読</button>
          )}
          <Link to="/mypage/notification-settings" className="text-sm text-muted hover:text-ehaco-text transition flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.212-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            設定
          </Link>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-6">
        {[{ key: 'all', label: 'すべて' }, { key: 'unread', label: '未読のみ' }].map((t) => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === t.key
                ? 'bg-accent text-white shadow-sm'
                : 'bg-white text-muted ring-1 ring-ehaco-border hover:ring-accent/30 hover:text-accent'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const isRead = readState.get(notif.id);
            const link = getNotifLink(notif);
            const cls = `w-full text-left flex items-start gap-4 p-4 rounded-xl transition hover:shadow-md cursor-pointer ${
              !isRead ? 'bg-accent/5 ring-1 ring-accent/20' : 'bg-white ring-1 ring-ehaco-border/50'
            }`;
            const inner = (<>
              <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2 ${!isRead ? 'bg-accent' : 'bg-transparent'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${typeColors[notif.type] || 'bg-gray-400'}`} />
                  <p className={`text-base leading-snug ${!isRead ? 'font-bold text-ehaco-text' : 'font-medium text-ehaco-text'}`}>
                    {notif.title}
                  </p>
                </div>
                <p className="text-sm text-muted line-clamp-1 mt-0.5">{notif.message}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                <span className="text-xs text-muted">{notif.dateRelative}</span>
                {link && <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>}
              </div>
            </>);
            return link ? (
              <Link key={notif.id} to={link} onClick={() => markAsRead(notif.id)} className={cls}>{inner}</Link>
            ) : (
              <button key={notif.id} onClick={() => markAsRead(notif.id)} className={cls}>{inner}</button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </div>
          <p className="font-bold text-lg text-ehaco-text mb-2">未読のお知らせはありません</p>
          <p className="text-sm text-muted">新しいお知らせが届くとここに表示されます</p>
        </div>
      )}
    </div>
  );
}
