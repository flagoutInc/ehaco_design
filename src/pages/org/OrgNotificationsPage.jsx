import { useState } from 'react';
import { Link } from 'react-router-dom';

const notifications = [
  { id: 1, type: 'applicant', title: '新しい申込がありました', message: '山田 健太さんが「DX推進リーダーのためのデータ活用戦略セミナー」に申し込みました。', time: '10分前', read: false, link: '/org/applicants/1' },
  { id: 2, type: 'applicant', title: '新しい申込がありました', message: '高橋 美咲さんが「DX推進リーダーのためのデータ活用戦略セミナー」に申し込みました。', time: '1時間前', read: false, link: '/org/applicants/2' },
  { id: 3, type: 'event', title: 'イベントが公開されました', message: '「AI×マーケティング実践ワークショップ」が公開されました。', time: '3時間前', read: true, link: '/org/events/2/edit' },
  { id: 4, type: 'survey', title: 'アンケート回答がありました', message: '「参加者満足度アンケート」に新しい回答が5件あります。', time: '昨日', read: true, link: '/org/surveys/1/results' },
  { id: 5, type: 'system', title: '主催者情報を更新してください', message: '紹介文が未入力です。主催者情報を更新すると、参加者からの信頼度が向上します。', time: '3日前', read: true, link: '/org/company' },
];

const typeColors = {
  applicant: 'bg-green-500', event: 'bg-accent', survey: 'bg-purple-500', system: 'bg-gray-400',
};

export default function OrgNotificationsPage() {
  const [readState, setReadState] = useState(() => new Map(notifications.map((n) => [n.id, n.read])));
  const [filter, setFilter] = useState('all');

  const unreadCount = [...readState.values()].filter((v) => !v).length;
  const markAsRead = (id) => setReadState((prev) => { const next = new Map(prev); next.set(id, true); return next; });
  const markAllAsRead = () => setReadState((prev) => { const next = new Map(prev); for (const k of next.keys()) next.set(k, true); return next; });

  const filtered = filter === 'unread' ? notifications.filter((n) => !readState.get(n.id)) : notifications;

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">お知らせ</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="text-sm text-accent hover:text-accent-light transition cursor-pointer">すべて既読</button>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        {[{ key: 'all', label: 'すべて' }, { key: 'unread', label: '未読のみ' }].map((t) => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === t.key ? 'bg-accent text-white shadow-sm' : 'bg-white text-muted ring-1 ring-ehaco-border hover:ring-accent/30 hover:text-accent'
            }`}>{t.label}</button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((notif) => {
            const isRead = readState.get(notif.id);
            return (
              <Link key={notif.id} to={notif.link} onClick={() => markAsRead(notif.id)}
                className={`flex items-start gap-4 p-4 rounded-xl transition hover:shadow-md ${
                  !isRead ? 'bg-accent/5 ring-1 ring-accent/20' : 'bg-white ring-1 ring-ehaco-border/50'
                }`}>
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-2 ${!isRead ? 'bg-accent' : 'bg-transparent'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${typeColors[notif.type] || 'bg-gray-400'}`} />
                    <p className={`text-base leading-snug ${!isRead ? 'font-bold text-ehaco-text' : 'font-medium text-ehaco-text'}`}>{notif.title}</p>
                  </div>
                  <p className="text-sm text-muted line-clamp-1 mt-0.5">{notif.message}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 mt-1">
                  <span className="text-xs text-muted">{notif.time}</span>
                  <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </div>
              </Link>
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
