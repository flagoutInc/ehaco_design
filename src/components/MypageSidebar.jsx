import { Link } from 'react-router-dom';

const allNavItems = [
  { key: 'dashboard', label: 'ダッシュボード', to: '/mypage/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4', mobile: true },
  { key: 'events', label: '申込済みイベント', to: '/mypage/events', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5', mobile: false },
  { key: 'favorites', label: 'お気に入り', to: '/mypage/favorites', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', mobile: true },
  { key: 'following', label: 'フォロー中', to: '/mypage/following', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z', mobile: false },
  { key: 'account', label: 'アカウント', to: '/mypage/account', icon: 'M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z', mobile: true },
  { key: 'profile', label: 'プロフィール設定', to: '/mypage/profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z', mobile: false },
  { key: 'notification-settings', label: 'お知らせ設定', to: '/mypage/notification-settings', icon: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0', mobile: true },
  { key: 'help', label: 'ヘルプページ', to: null, href: 'https://support.ehaco.net/', icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z', mobile: false },
];

const mobileItems = allNavItems.filter((i) => i.mobile);

export default function MypageSidebar({ activePage }) {
  return (
    <>
      {/* PC: horizontal tabs */}
      <div className="relative border-b border-ehaco-border hidden sm:block">
        <div className="overflow-x-auto scrollbar-hide">
          <nav className="flex min-w-max">
            {allNavItems.map((item) => {
              const isActive = activePage === item.key;
              const cls = `shrink-0 px-5 py-3.5 text-sm font-medium transition-colors relative ${
                isActive ? 'font-semibold text-accent border-b border-accent' : 'text-muted hover:text-ehaco-text'
              }`;
              const inner = (
                <>
                  {item.label}
                  {item.href && <svg className="w-3 h-3 inline-block ml-1 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>}
                </>
              );
              return item.href ? (
                <a key={item.key} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
              ) : (
                <Link key={item.key} to={item.to} className={cls}>{inner}</Link>
              );
            })}
          </nav>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-ehaco-bg to-transparent md:hidden" />
      </div>

      {/* Mobile: fixed bottom nav (3 items) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ehaco-border pb-[env(safe-area-inset-bottom)] sm:hidden">
        <div className="flex items-center justify-around">
          {mobileItems.map((item) => {
            const isActive = activePage === item.key;
            return (
              <Link key={item.key} to={item.to}
                className={`flex flex-col items-center gap-1 py-2 px-3 min-w-0 transition-colors ${isActive ? 'text-accent' : 'text-muted'}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                <span className="text-xs font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
